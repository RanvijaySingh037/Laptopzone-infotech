import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {

  const currency = "₹";
  const delivery_fee = 40;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/add", { itemId }, { headers: { token } });
        toast.success("Added to cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }

  // Toggle product in wishlist
  const toggleWishlist = async (itemId) => {
    let wishlistData = structuredClone(wishlistItems);
    
    if (wishlistData[itemId]) {
        delete wishlistData[itemId];
    } else {
        wishlistData[itemId] = true;
    }
    
    setWishlistItems(wishlistData);

    if (token) {
      try {
        const response = await axios.post(backendUrl + "/api/wishlist/toggle", { itemId }, { headers: { token } });
        if (response.data.success) {
            toast.success(response.data.message, { icon: response.data.action === 'added' ? '❤️' : '💔' });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
        toast.info("Saved to local session. Login to sync hardware.");
    }
  }

  // Get total number of items in the cart
  const getCartItems = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return Object.keys(wishlistItems).length;
  };

  // Get total cart price
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      let product = products.find((p) => p._id === itemId);
      if (!product || qty <= 0) return total;
      return total + product.price * qty;
    }, 0);
  };

  // Update quantity
  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get products data from backend
  const getProductsData = async () => {
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        axios.get(backendUrl + "/api/product/list"),
        axios.get(backendUrl + "/api/category/list"),
        axios.get(backendUrl + "/api/brand/list")
      ]);

      if (prodRes.data.success) {
        setProducts(prodRes.data.products);
      }
      if (catRes.data.success) {
        setCategories(catRes.data.categories);
      }
      if (brandRes.data.success) {
        setBrands(brandRes.data.brands);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  
  
// Get user cart data
const getUserCart = async (token) => {
try {
  const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
  if (response.data.success) {
    setCartItems(response.data.cartData);
  } else {
    toast.error(response.data.message);
  }
} catch (error) {
  console.log(error);
}
}

// Get user wishlist data
const getUserWishlist = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/wishlist/get", {}, { headers: { token } });
      if (response.data.success) {
        setWishlistItems(response.data.wishlistData);
      }
    } catch (error) {
      console.log(error);
    }
}

  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      const savedToken = localStorage.getItem('token');
      setToken(savedToken);
      getUserCart(savedToken);
      getUserWishlist(savedToken);
    }

  }, []);

  return (
    <ShopContext.Provider
      value={{
        products, categories, brands, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        wishlistItems, toggleWishlist, getWishlistCount,
        getCartItems, getCartAmount,
        updateQuantity, navigate, backendUrl, token, setToken
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};