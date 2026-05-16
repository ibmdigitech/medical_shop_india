import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, Plus, Minus, ArrowLeft, MessageCircle, 
  CreditCard, ShieldCheck, ShoppingBag, Truck,
  ChevronRight, Lock, Trash, Zap, ArrowRight,
  Sparkles, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [checkoutData, setCheckoutData] = useState({ name: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'upi'
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!checkoutData.name || !checkoutData.phone) {
      alert('Please enter your name and phone number to place the order.');
      return;
    }

    setIsOrdering(true);
    // Simulate API call
    setTimeout(() => {
      setOrderSuccess(true);
      clearCart();
      setIsOrdering(false);
    }, 1500);
  };

  const generateWhatsAppLink = () => {
    const phone = "919037507643";
    let message = "Hello! I'd like to order the following from Amster Med Care:\n\n";
    cartItems.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Total: ₹${cartTotal}*`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center px-4 bg-white dark:bg-dark">
        <Helmet>
          <title>Order Successful | Amster Med Care</title>
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          className="text-center space-y-10 bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 p-16 rounded-[60px] max-w-xl shadow-2xl"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
            <div className="w-32 h-32 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-10 group-hover:rotate-12 transition-transform">
               <ShieldCheck size={64} />
            </div>
          </div>
          <div className="space-y-4">
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white italic">Order Received!</h1>
             <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed">Our pharmacist will contact you within <b className="text-primary">15 minutes</b> to confirm your delivery details.</p>
          </div>
          <Link to="/medicines" onClick={() => setOrderSuccess(false)} className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm">
            Continue Shopping <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center px-4 bg-white dark:bg-dark">
        <Helmet>
          <title>Your Cart | Amster Med Care</title>
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-10"
        >
          <div className="w-40 h-40 rounded-[48px] bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto border border-slate-100 dark:border-white/5 relative">
            <ShoppingBag size={80} className="text-slate-200 dark:text-white/10" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white dark:bg-dark-card rounded-3xl shadow-xl flex items-center justify-center text-primary border border-slate-100 dark:border-white/5">
               <Sparkles size={32} />
            </div>
          </div>
          <div className="space-y-4">
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">Your Cart is <br/><span className="text-primary italic">Waiting</span></h1>
             <p className="text-slate-500 dark:text-gray-400 max-w-sm mx-auto text-lg">Browse our premium healthcare selection and fill it with health!</p>
          </div>
          <Link to="/medicines" className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm">
            Start Shopping <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-32 bg-white dark:bg-dark">
      <Helmet>
        <title>{`Shopping Cart (${cartItems.length}) | Amster Med Care Premium`}</title>
      </Helmet>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
           <div className="flex items-center gap-6">
              <Link to="/medicines" className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                <ArrowLeft size={24} />
              </Link>
              <div>
                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white italic">Your Cart</h1>
                 <p className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase mt-2">{cartItems.length} curated items selected</p>
              </div>
           </div>
           
           <button 
             onClick={clearCart}
             className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 dark:bg-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"
           >
             <Trash size={14} /> Empty Cart
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  className="group relative p-8 bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row items-center gap-10"
                >
                  <div className="w-32 h-32 rounded-[32px] bg-slate-50 dark:bg-white/5 overflow-hidden shrink-0 border border-slate-100 dark:border-white/5 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                       <div>
                          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.category}</p>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                       </div>
                       <button 
                         onClick={() => removeFromCart(item.id)}
                         className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all self-center sm:self-start"
                       >
                         <Trash2 size={24} />
                       </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6">
                       <div className="flex flex-col">
                          <span className="text-slate-900 dark:text-white font-black text-3xl tracking-tighter">₹{item.price}</span>
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Per Unit</span>
                       </div>
                       
                       <div className="flex items-center gap-5 bg-slate-50 dark:bg-white/5 rounded-3xl p-2 border border-slate-100 dark:border-white/10">
                         <button 
                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
                           className="w-10 h-10 rounded-2xl bg-white dark:bg-dark-card shadow-lg flex items-center justify-center text-slate-500 hover:text-primary transition-all active:scale-90"
                         >
                           <Minus size={18} />
                         </button>
                         <span className="text-slate-900 dark:text-white font-black text-xl w-8 text-center">{item.quantity}</span>
                         <button 
                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
                           className="w-10 h-10 rounded-2xl bg-white dark:bg-dark-card shadow-lg flex items-center justify-center text-slate-500 hover:text-primary transition-all active:scale-90"
                         >
                           <Plus size={18} />
                         </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
             <div className="sticky top-40 bg-slate-900 rounded-[60px] p-10 md:p-12 shadow-2xl text-white relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                   <h2 className="text-3xl font-black mb-10 italic">Order Summary</h2>
                   
                   <div className="space-y-6 mb-12">
                      <div className="flex justify-between text-slate-400 font-black text-xs uppercase tracking-widest">
                         <span>Subtotal</span>
                         <span className="text-white">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 font-black text-xs uppercase tracking-widest">
                         <span>Delivery Fee</span>
                         <span className="text-primary-light">FREE</span>
                      </div>
                      <div className="flex justify-between text-slate-400 font-black text-xs uppercase tracking-widest">
                         <span>Tax (GST)</span>
                         <span className="text-white">Included</span>
                      </div>
                      
                      <div className="pt-8 border-t border-white/10 flex items-end justify-between">
                         <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                            <p className="text-5xl font-black text-primary-light tracking-tighter">₹{cartTotal}</p>
                         </div>
                         <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                            <Truck size={16} className="text-primary-light" />
                            <span className="text-[10px] font-black uppercase tracking-widest">60 Min Express</span>
                         </div>
                      </div>
                   </div>

                   {/* Form Details */}
                   <div className="space-y-4 mb-8">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={checkoutData.name} 
                        onChange={e => setCheckoutData({...checkoutData, name: e.target.value})} 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-black placeholder-slate-500 focus:outline-none focus:border-primary transition-all" 
                      />
                      <input 
                        type="tel" 
                        placeholder="Mobile Number" 
                        value={checkoutData.phone} 
                        onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})} 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-black placeholder-slate-500 focus:outline-none focus:border-primary transition-all" 
                      />
                   </div>

                   {/* Payment Method Selection */}
                   <div className="mb-8">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Select Payment Method</p>
                      <div className="grid grid-cols-2 gap-4">
                         <button 
                           onClick={() => setPaymentMethod('cod')}
                           className={`py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                             paymentMethod === 'cod' 
                               ? 'bg-primary border-primary text-white' 
                               : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                           }`}
                         >
                            <Truck size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">COD</span>
                         </button>
                         <button 
                           onClick={() => setPaymentMethod('upi')}
                           className={`py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                             paymentMethod === 'upi' 
                               ? 'bg-primary border-primary text-white' 
                               : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                           }`}
                         >
                            <Zap size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">UPI / QR</span>
                         </button>
                      </div>
                   </div>

                   {/* QR Code Display for UPI */}
                   <AnimatePresence>
                      {paymentMethod === 'upi' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-8 overflow-hidden"
                        >
                           <div className="bg-white p-6 rounded-3xl flex flex-col items-center gap-4 border border-white/20">
                              <div className="w-40 h-40 bg-slate-100 rounded-2xl flex items-center justify-center border-4 border-slate-50 relative group overflow-hidden">
                                 {/* Mock QR Code Pattern */}
                                 <div className="grid grid-cols-4 gap-2 opacity-80">
                                    {[...Array(16)].map((_, i) => (
                                       <div key={i} className={`w-6 h-6 ${i % 3 === 0 ? 'bg-slate-900' : 'bg-slate-300'} rounded-sm`} />
                                    ))}
                                 </div>
                                 <div className="absolute inset-0 flex items-center justify-center bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Zap className="text-primary animate-pulse" size={40} />
                                 </div>
                              </div>
                              <div className="text-center">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">UPI ID</p>
                                 <p className="text-slate-900 font-black text-sm">amstermedcare@okaxis</p>
                              </div>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>

                   <button 
                     onClick={handleCheckout} 
                     disabled={isOrdering}
                     className="w-full py-6 bg-primary text-white font-black text-lg rounded-3xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                   >
                     {isOrdering ? 'Confirming...' : paymentMethod === 'cod' ? 'Place Order (COD)' : 'Confirm Payment & Order'}
                     <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                   </button>

                   <div className="mt-8 flex flex-col gap-4">
                      <a href={generateWhatsAppLink()} className="flex items-center justify-center gap-3 py-4 bg-[#25D366]/10 text-[#25D366] font-black rounded-2xl border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all">
                        <MessageCircle size={20} /> Order on WhatsApp
                      </a>
                   </div>

                   <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-2 gap-6">
                      <div className="flex flex-col items-center gap-2">
                         <Lock size={20} className="text-slate-500" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Secure Checkout</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <Heart size={20} className="text-slate-500" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Quality Guarantee</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
