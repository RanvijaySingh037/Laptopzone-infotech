import React, { useState, useEffect } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = ({ token }) => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardStats = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/order/admin-stats', {}, { headers: { token } });
            if (response.data.success) {
                setStats(response.data.stats);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardStats();
    }, [token]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const statCards = [
        { label: 'Total Inventory', value: stats?.totalProducts || 0, icon: '💻', color: 'blue', link: '/list' },
        { label: 'Orders Fulfilled', value: stats?.totalOrders || 0, icon: '📦', color: 'indigo', link: '/orders' },
        { label: 'Gros Revenue', value: `${currency}${stats?.totalRevenue?.toLocaleString() || 0}`, icon: '💰', color: 'green', link: '/orders' },
        { label: 'Low Stock Alerts', value: stats?.lowStockCount || 0, icon: '⚠️', color: 'red', link: '/list', highlight: stats?.lowStockCount > 0 },
        { label: 'Featured Systems', value: stats?.featuredCount || 0, icon: '⭐', color: 'purple', link: '/list' }
    ];

    return (
        <div className="p-6 space-y-10 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Command Center</h1>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Real-time System Intelligence
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchDashboardStats} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    <button onClick={() => navigate('/add')} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl active:scale-95">
                        Deploy New Hardware
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                {statCards.map((card, i) => (
                    <Link 
                        to={card.link} 
                        key={i} 
                        className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group ${card.highlight ? 'ring-2 ring-red-500 border-transparent bg-red-50/10' : ''}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-2xl opacity-80 group-hover:scale-125 transition-transform duration-300">{card.icon}</span>
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${card.highlight ? 'text-red-500' : 'text-slate-400'}`}>{card.label}</p>
                        <h3 className={`text-2xl font-black tracking-tighter ${card.highlight ? 'text-red-600' : 'text-slate-800'}`}>{card.value}</h3>
                    </Link>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-base font-black text-slate-800 uppercase tracking-tighter italic">Recent Acquisitions</h3>
                        <Link to="/orders" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All Logs</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Transaction ID</th>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {stats?.recentOrders?.length > 0 ? (
                                    stats.recentOrders.map((order, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate('/orders')}>
                                            <td className="px-6 py-4 font-mono text-[10px] text-slate-400">#{order._id.slice(-8).toUpperCase()}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">{order.address?.firstName} {order.address?.lastName}</p>
                                                <p className="text-[9px] text-slate-400">{order.address?.city}</p>
                                            </td>
                                            <td className="px-6 py-4 font-black text-slate-900 text-xs">{currency}{order.amount.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">{new Date(order.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">No Recent Acquisitions Detected</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Reports / System Pulse */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-200/20 relative overflow-hidden group">
                        <div className="relative z-10 space-y-6">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">System Capacity</p>
                            <h4 className="text-2xl font-black tracking-tighter uppercase italic leading-none">Optimal Performance Detected</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>Inventory Health</span>
                                    <span>{stats?.lowStockCount === 0 ? '100% Stable' : 'Action Required'}</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-1000 ${stats?.lowStockCount === 0 ? 'bg-green-500 w-full' : 'bg-yellow-500 w-3/4'}`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.14-.57.14-.23 0-.41-.05-.57-.14l-7.9-4.44c-.31-.17-.53-.5-.53-.88v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.14.57-.14.23 0 .41.05.57.14l7.9 4.44c.31.17.53.5.53.88v9z" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/30">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tighter italic mb-6">Inventory Breakdown</h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Featured Hardware</p>
                                </div>
                                <p className="text-xs font-black text-slate-900">{stats?.featuredCount}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Stock Depletion Alerts</p>
                                </div>
                                <p className="text-xs font-black text-red-600">{stats?.lowStockCount}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Pending Shipments</p>
                                </div>
                                <p className="text-xs font-black text-slate-900">{stats?.recentOrders?.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            ` }} />
        </div>
    );
};

export default Dashboard;
