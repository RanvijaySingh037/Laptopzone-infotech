import { createContext, useEffect, useState, useMemo, useCallback } from "react";
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
  const addToCart = useCallback(async (itemId) => {
    setCartItems(prev => {
      let cartData = structuredClone(prev);
      if (cartData[itemId]) {
        cartData[itemId] += 1;
      } else {
        cartData[itemId] = 1;
      }
      return cartData;
    });

    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/add", { itemId }, { headers: { token } });
        toast.success("Added to cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }, [token, backendUrl]);

  // Toggle product in wishlist
  const toggleWishlist = useCallback(async (itemId) => {
    setWishlistItems(prev => {
      let wishlistData = structuredClone(prev);
      if (wishlistData[itemId]) {
          delete wishlistData[itemId];
      } else {
          wishlistData[itemId] = true;
      }
      return wishlistData;
    });

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
  }, [token, backendUrl]);

  // Get total number of items in the cart
  const getCartItems = useCallback(() => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  }, [cartItems]);

  // Get wishlist count
  const getWishlistCount = useCallback(() => {
    return Object.keys(wishlistItems).length;
  }, [wishlistItems]);

  // Get total cart price
  const getCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      let product = products.find((p) => p._id === itemId);
      if (!product || qty <= 0) return total;
      return total + product.price * qty;
    }, 0);
  }, [cartItems, products]);

  // Update quantity
  const updateQuantity = useCallback(async (itemId, quantity) => {
    setCartItems(prev => {
      let cartData = structuredClone(prev);
      cartData[itemId] = quantity;
      return cartData;
    });

    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }, [token, backendUrl]);

  // Get products data from backend
  const getProductsData = useCallback(async (isMounted) => {
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        axios.get(backendUrl + "/api/product/list"),
        axios.get(backendUrl + "/api/category/list"),
        axios.get(backendUrl + "/api/brand/list")
      ]);

      if (!isMounted) return;

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
      if (isMounted) toast.error(error.message);
    }
  }, [backendUrl]);
  
  
// Get user cart data
const getUserCart = useCallback(async (token, isMounted) => {
  try {
    const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
    if (isMounted && response.data.success) {
      setCartItems(response.data.cartData);
    } else if (isMounted) {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}, [backendUrl]);

// Get user wishlist data
const getUserWishlist = useCallback(async (token, isMounted) => {
    try {
      const response = await axios.post(backendUrl + "/api/wishlist/get", {}, { headers: { token } });
      if (isMounted && response.data.success) {
        setWishlistItems(response.data.wishlistData);
      }
    } catch (error) {
      console.log(error);
    }
}, [backendUrl]);

  useEffect(() => {
    let isMounted = true;
    getProductsData(isMounted);
    return () => { isMounted = false; };
  }, [getProductsData])

  useEffect(() => {
    let isMounted = true;
    if (!token && localStorage.getItem('token')) {
      const savedToken = localStorage.getItem('token');
      setToken(savedToken);
      getUserCart(savedToken, isMounted);
      getUserWishlist(savedToken, isMounted);
    }
    return () => { isMounted = false; };
  }, [token, getUserCart, getUserWishlist]);

  const contextValue = useMemo(() => ({
    products, categories, brands, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart, setCartItems,
    wishlistItems, toggleWishlist, getWishlistCount,
    getCartItems, getCartAmount,
    updateQuantity, navigate, backendUrl, token, setToken
  }), [
    products, categories, brands, currency, delivery_fee,
    search, showSearch, cartItems, addToCart,
    wishlistItems, toggleWishlist, getWishlistCount,
    getCartItems, getCartAmount,
    updateQuantity, navigate, backendUrl, token
  ]);

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};