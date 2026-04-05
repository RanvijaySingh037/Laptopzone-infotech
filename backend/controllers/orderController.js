import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import razorpay from "razorpay";
import crypto from "crypto";
import { sendOrderEmail, sendInvoiceEmail } from "../config/emailservice.js";
import { generateInvoice } from "../config/invoiceGenerator.js";

// global variables
const deliveryCharge = 10;
const currency = "inr";
// Gateways initialization
const razorepayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})


// Placing Order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save();

    // Send Email
    const user = await userModel.findById(userId);
    if (user?.email) {
      await sendOrderEmail(user.email, items, amount);
    }

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully", });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}


// Placing Order using Razorpay method

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save();

    const options = {
      amount: Math.round(amount * 100),
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    }

    await razorepayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error })

      }
      res.json({ success: true, order })

    })

  } catch (error) {

    console.log(error);
    res.json({ success: false, message: error.message });

  }
}


// Verify Order using Razorpay method

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Fetch order to get the receipt ID (which is our Mongo order ID)
      const orderInfo = await razorepayInstance.orders.fetch(razorpay_order_id);
      
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // Get user email and order data
      const user = await userModel.findById(userId);
      const order = await orderModel.findById(orderInfo.receipt);

      if (user?.email) {
        await sendOrderEmail(user.email, order.items, order.amount);
      }

      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Verification Failed: Invalid Signature" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// All order data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Admin Stats for Dashboard
const getAdminStats = async (req, res) => {
  try {
    const [totalProducts, totalOrders, orders, lowStockProducts, featuredProducts] = await Promise.all([
      productModel.countDocuments({}),
      orderModel.countDocuments({}),
      orderModel.find({}).sort({ date: -1 }),
      productModel.countDocuments({ stock: { $lte: 5 } }),
      productModel.countDocuments({ featured: true })
    ]);

    const totalRevenue = orders
      .filter(order => order.payment === true)
      .reduce((total, order) => total + order.amount, 0);

    const recentOrders = orders.slice(0, 10).map(order => ({
      _id: order._id,
      amount: order.amount,
      status: order.status,
      date: order.date,
      payment: order.payment,
      address: order.address
    }));

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
        lowStockCount: lowStockProducts,
        featuredCount: featuredProducts,
        recentOrders
      }
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}



// User Order Data for Frontend
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Step 1: Update the order status
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    // Step 2: Check if status is "Delivered"
    if (status === "Delivered") {
      // Populate user for email
      const user = await userModel.findById(updatedOrder.userId);
      if (!user?.email) {
        return res.json({ success: false, message: "User email not found" });
      }

      // Add user details to order (for invoice)
      updatedOrder.user = { email: user.email };

      // Step 3: Generate invoice PDF
      const invoiceBuffer = await generateInvoice(updatedOrder);

      // Step 4: Send Invoice Email
      await sendInvoiceEmail(user.email, invoiceBuffer);
    }

    res.json({ success: true, message: "Status Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export { verifyRazorpay, placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, getAdminStats }