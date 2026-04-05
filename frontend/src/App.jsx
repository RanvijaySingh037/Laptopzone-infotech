import React, { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Static Components
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const Order = lazy(() => import('./pages/Order'))
const Product = lazy(() => import("./pages/Product"))
const Verify = lazy(() => import('./pages/Verify'))
const Profile = lazy(() => import('./pages/Profile'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const FAQ = lazy(() => import('./pages/FAQ'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'))
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'))
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'))
const CustomerSupport = lazy(() => import('./pages/CustomerSupport'))

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Toast Container with custom styling */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-lg shadow-lg"
      />
      
      {/* Navigation */}
      <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm'>
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Navbar />
        </div>
      </div>
      
      {/* Search Bar */}
      <SearchBar />
      
      {/* Main Content */}
      <main className='min-h-screen'>
        <ScrollToTopOnRoute />
        <Suspense fallback={
          <div className='flex items-center justify-center min-h-[60vh]'>
             <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
          </div>
        }>
          <Routes>
            <Route path='/' element={<div className='w-full'><Home/></div>} />
            <Route path='/collection' element={<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'><Collection/></div>} />
            <Route path='/about' element={<div className='w-full'><About/></div>} />
            <Route path='/contact' element={<div className='w-full'><Contact/></div>} />
            <Route path='/product/:productId' element={<div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'><Product/></div>} />
            <Route path='/cart' element={<div className='w-full'><Cart/></div>} />
            <Route path='/login' element={<div className='w-full'><Login/></div>} />
            <Route path='/place-Order' element={<div className='w-full'><PlaceOrder/></div>} />
            <Route path='/Orders' element={<div className='w-full'><Order/></div>} />
            <Route path="/order" element={<div className='w-full'><Order /></div>} />
            <Route path="/verify" element={<div className='w-full'><Verify /></div>} />
            <Route path='/wishlist' element={<div className='w-full'><Wishlist/></div>} />
            <Route path="/profile" element={<div className='w-full'><Profile /></div>} />
            
            {/* Support & Policy Routes */}
            <Route path="/faq" element={<div className='w-full'><FAQ /></div>} />
            <Route path="/privacy-policy" element={<div className='w-full'><PrivacyPolicy /></div>} />
            <Route path="/terms" element={<div className='w-full'><TermsConditions /></div>} />
            <Route path="/refund-policy" element={<div className='w-full'><RefundPolicy /></div>} />
            <Route path="/shipping-policy" element={<div className='w-full'><ShippingPolicy /></div>} />
            <Route path="/cancellation-policy" element={<div className='w-full'><CancellationPolicy /></div>} />
            <Route path="/support" element={<div className='w-full'><CustomerSupport /></div>} />
          </Routes>
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer/>
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}

// Scroll to top on route change component
const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Scroll to top component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl hover:bg-blue-700 hover:shadow-blue-200 transform hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

export default App

