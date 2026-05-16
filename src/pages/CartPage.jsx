import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, Plus, Minus, ArrowLeft, MessageCircle, 
  CreditCard, ShieldCheck, ShoppingBag 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [checkoutData, setCheckoutData] = useState({ name: '', phone: '' });
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!checkoutData.name || !checkoutData.phone) {
      alert('Please enter your name and phone number to place the order.');
      return;
    }

    setIsOrdering(true);
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: checkoutData.name,
          phone: checkoutData.phone,
          total_amount: cartTotal,
          items: cartItems.map(item => ({ id: item.id, name: item.name, qty: item.quantity, price: item.price }))
        })
      });

      if (response.ok) {
        setOrderSuccess(true);
        clearCart();
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Is the backend running?');
    }
    setIsOrdering(false);
  };

  const generateWhatsAppLink = () => {
    const phone = "919037507643"; // Amster Med Care WhatsApp
    let message = "Hello! I'd like to order the following medicines from Amster Med Care:\n\n";
    cartItems.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) - ? ${item.price * item.quantity}\n`;
    });
    message += `\n*Total Amount: ? ${cartTotal}*`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generateUPILink = () => {
    const upiId = "yourname@upi"; // Placeholder
    const name = "Amster Med Care";
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${cartTotal}&cu=INR&tn=Medicine Order`;
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 bg-dark">
        <Helmet>
          <title>Order Successful | Amster Med Care</title>
        </Helmet>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 bg-white/5 p-10 rounded-3xl border border-white/10 max-w-md">
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto text-green-400">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-3xl font-bold text-white">Order Placed Successfully!</h1>
          <p className="text-gray-400 text-sm">Thank you, {checkoutData.name}. Our pharmacist will contact you shortly at {checkoutData.phone} to confirm the delivery.</p>
          <Link to="/medicines" onClick={() => setOrderSuccess(false)} className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <Helmet>
          <title>Your Cart | Amster Med Care</title>
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto">
            <ShoppingBag size={48} className="text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">Your cart is empty</h1>
          <p className="text-gray-400 max-w-xs mx-auto">Looks like you haven't added any medicines yet. Browse our categories to find what you need.</p>
          <Link 
            to="/medicines" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark">
      <Helmet>
        <title>{`Shopping Cart (${cartItems.length}) | Amster Med Care`}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/medicines" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={item.id}
                className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white/10 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-gray-400 text-xs">{item.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-primary-light font-bold">₹ {item.price}</span>
                      <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
            
            <button 
              onClick={clearCart}
              className="text-gray-500 hover:text-red-400 text-sm flex items-center gap-2 transition-colors ml-auto"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>₹ {cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Delivery</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-black text-primary-light">₹ {cartTotal}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-3 p-4 bg-black/20 rounded-xl border border-white/5 mb-4">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Delivery Details</p>
                  <input type="text" placeholder="Full Name" value={checkoutData.name} onChange={e => setCheckoutData({...checkoutData, name: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                  <input type="tel" placeholder="Phone Number" value={checkoutData.phone} onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                  <button onClick={handleCheckout} disabled={isOrdering} className="w-full mt-2 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50">
                    {isOrdering ? 'Processing...' : 'Place Order Now (COD)'}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="h-[1px] bg-white/10 flex-1"></div>
                  <span className="text-xs text-gray-500 font-bold uppercase">OR</span>
                  <div className="h-[1px] bg-white/10 flex-1"></div>
                </div>

                {/* WhatsApp Ordering Button */}
                <a 
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/30 transition-all active:scale-95"
                >
                  <MessageCircle size={20} />
                  Order via WhatsApp
                </a>

                <div className="pt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-1"><ShieldCheck size={12} /> Secure</div>
                  <div className="flex items-center gap-1">Fast Delivery</div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
