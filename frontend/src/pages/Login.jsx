import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHander = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully!');
        }else{
          toast.error(response.data.message);
        }
      }else{
        const response = await axios.post(backendUrl + '/api/user/login', {email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  },[token])

  return (
    <div className="bg-slate-50 min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-10 border border-blue-50 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-4xl font-black text-slate-800 mb-3 tracking-tighter uppercase italic">
              {currentState}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-[3px] w-8 bg-blue-700 rounded-full"></div>
                <div className="h-[3px] w-2 bg-slate-300 rounded-full"></div>
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-loose">
              {currentState === 'Login' ? 'Access your account' : 'Create your new account'}
            </p>
          </div>

          <form onSubmit={onSubmitHander} className="space-y-6">
            {currentState === 'Sign Up' && (
              <div className="animate-fade-in group">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Full Name</label>
                <input  
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-transparent transition-all duration-300 font-bold text-slate-800 placeholder-slate-300"
                  placeholder="ENTER YOUR NAME"
                  required
                />
              </div>
            )}
            
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-transparent transition-all duration-300 font-bold text-slate-800 placeholder-slate-300"
                placeholder="ENTER YOUR EMAIL"
                required
              />
            </div>
            
            <div className="group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-transparent transition-all duration-300 font-bold text-slate-800 placeholder-slate-300"
                placeholder="ENTER YOUR PASSWORD"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <button type="button" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                {currentState === 'Login' ? 'Create Account' : 'Already have account?'}
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mb-6"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PLEASE WAIT...
                </>
              ) : (
                <>
                  {currentState === 'Login' ? 'SIGN IN' : 'SIGN UP'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              By {currentState === 'Login' ? 'signing in' : 'creating an account'}, you agree to our 
              <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">Terms of Service</a> and 
              <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
