import React from 'react';
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
        <title>Shopping Cart ({cartItems.length}) | Amster Med Care</title>
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

                {/* UPI Payment Button */}
                <a 
                  href={generateUPILink()}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black font-bold rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all active:scale-95"
                >
                  <CreditCard size={20} />
                  Pay via UPI
                </a>

                <div className="pt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-1"><ShieldCheck size={12} /> Secure</div>
                  <div className="flex items-center gap-1">Fast Delivery</div>
                </div>
              </div>

              {/* QR Code Placeholder for Desktop */}
              <div className="mt-8 p-4 bg-white rounded-2xl flex flex-col items-center gap-3">
                <p className="text-[10px] text-black font-bold uppercase tracking-wider">Scan to Pay (UPI)</p>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(generateUPILink())}`} 
                  alt="UPI QR Code"
                  className="w-32 h-32"
                />
                <p className="text-[9px] text-gray-500 text-center leading-tight">Supported Apps: <br/> GPay, PhonePe, Paytm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
