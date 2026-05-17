import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Eye, Download, CheckCircle2, 
  Clock, Truck, XCircle, MoreVertical, Printer, MapPin, 
  Phone, User, CreditCard, ChevronRight, ShoppingBag, Percent, Receipt
} from 'lucide-react';
import { getTaxProfile } from '../../services/taxProfiles';

const initialOrders = [
  { 
    id: 'ORD-9024', 
    customerName: 'Rahul Krishnan', 
    phone: '+971 50 123 4567',
    email: 'rahul.k@example.ae',
    address: 'Apartment 1402, Marina Heights, Dubai Marina, Dubai',
    date: '2026-05-17', 
    subtotal: 120.00,
    vat: 6.00,
    discount: 10.00,
    total: 116.00, 
    status: 'Processing', 
    paymentMethod: 'Online Visa Card',
    paymentStatus: 'Paid',
    items: [
      { name: 'Panadol Advance 500mg', qty: 2, price: 12.00, total: 24.00 },
      { name: 'Solgar Vitamin C 1000mg', qty: 1, price: 75.00, total: 75.00 },
      { name: 'N95 Respirator Masks (3M)', qty: 1, price: 21.00, total: 21.00 }
    ],
    rxReference: 'RX-5021',
    deliveryAgent: 'Unassigned'
  },
  { 
    id: 'ORD-9023', 
    customerName: 'Aisha Mohammed', 
    phone: '+971 56 987 6543',
    email: 'aisha.m@example.ae',
    address: 'Villa 45, Al Khawaneej 2, Dubai',
    date: '2026-05-17', 
    subtotal: 450.00,
    vat: 22.50,
    discount: 0.00,
    total: 472.50, 
    status: 'Pending', 
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    items: [
      { name: 'Omron M3 Blood Pressure Monitor', qty: 1, price: 295.00, total: 295.00 },
      { name: 'Solgar Vitamin C 1000mg', qty: 2, price: 75.00, total: 150.00 }
    ],
    rxReference: null,
    deliveryAgent: 'Unassigned'
  },
  { 
    id: 'ORD-9022', 
    customerName: 'John Doe', 
    phone: '+971 52 333 4444',
    email: 'john.doe@example.ae',
    address: 'Floor 22, Gate Towers, Al Reem Island, Abu Dhabi',
    date: '2026-05-16', 
    subtotal: 2950.00,
    vat: 147.50,
    discount: 150.00,
    total: 2947.50, 
    status: 'Delivered', 
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    items: [
      { name: 'Prescription Inhaler Symbicort', qty: 5, price: 180.00, total: 900.00 },
      { name: 'Wheelchair Premium Lite', qty: 1, price: 2050.00, total: 2050.00 }
    ],
    rxReference: 'RX-5017',
    deliveryAgent: 'Ramesh V'
  },
  { 
    id: 'ORD-9021', 
    customerName: 'Sneha Patel', 
    phone: '+971 55 456 7890',
    email: 'sneha.p@example.ae',
    address: 'Building 4B, Al Zahra, Sharjah',
    date: '2026-05-15', 
    subtotal: 90.00,
    vat: 4.50,
    discount: 10.00,
    total: 84.50, 
    status: 'Cancelled', 
    paymentMethod: 'Online MasterCard',
    paymentStatus: 'Refunded',
    items: [
      { name: 'Panadol Advance 500mg', qty: 3, price: 12.00, total: 36.00 },
      { name: 'N95 Respirator Masks (3M)', qty: 2, price: 27.00, total: 54.00 }
    ],
    rxReference: null,
    deliveryAgent: 'Unassigned'
  },
  { 
    id: 'ORD-9020', 
    customerName: 'Hamdan Al Maktoum', 
    phone: '+971 50 777 8888',
    email: 'hamdan@example.ae',
    address: 'Palace Road, Jumeirah 1, Dubai',
    date: '2026-05-15', 
    subtotal: 210.00,
    vat: 10.50,
    discount: 20.00,
    total: 200.50, 
    status: 'Out for Delivery', 
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    items: [
      { name: 'Solgar Vitamin C 1000mg', qty: 2, price: 75.00, total: 150.00 },
      { name: 'N95 Respirator Masks (3M)', qty: 2, price: 30.00, total: 60.00 }
    ],
    rxReference: 'RX-5018',
    deliveryAgent: 'Suresh Kumar'
  }
];

export default function AdminOrders() {
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currency, setCurrency] = useState('AED');
  const [taxRegion, setTaxRegion] = useState('United Arab Emirates');
  const [taxRate, setTaxRate] = useState('5');
  const [taxRegistrationNumber, setTaxRegistrationNumber] = useState('100348572900003');
  const [storeAddress, setStoreAddress] = useState('Office Suite 4B, Health Heights, Downtown Dubai, Dubai, UAE');
  
  // Selected Order for Details View Drawer
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const activeTaxProfile = getTaxProfile(taxRegion);
  const taxName = activeTaxProfile.taxName;
  const taxRegistrationLabel = activeTaxProfile.registrationLabel;

  useEffect(() => {
    const savedRegion = localStorage.getItem('erpTaxRegion') || 'United Arab Emirates';
    const savedProfile = getTaxProfile(savedRegion);
    setCurrency(localStorage.getItem('erpCurrency') || savedProfile.currency);
    setTaxRegion(savedRegion);
    setTaxRate(localStorage.getItem('erpVatRate') || savedProfile.defaultTaxRate);
    setTaxRegistrationNumber(localStorage.getItem('erpTaxRegistrationNumber') || savedProfile.sampleRegistration);
    setStoreAddress(localStorage.getItem('erpStoreAddress') || savedProfile.address);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400';
      case 'Cancelled': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle2 size={12} />;
      case 'Processing': return <Clock size={12} />;
      case 'Pending': return <Clock size={12} />;
      case 'Out for Delivery': return <Truck size={12} />;
      case 'Cancelled': return <XCircle size={12} />;
      default: return null;
    }
  };

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = ordersList.map(ord => {
      if (ord.id === orderId) {
        let updatedPayStatus = ord.paymentStatus;
        if (newStatus === 'Delivered' && ord.paymentMethod.includes('COD')) {
          updatedPayStatus = 'Paid';
        }
        return { ...ord, status: newStatus, paymentStatus: updatedPayStatus };
      }
      return ord;
    });
    setOrdersList(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus, paymentStatus: newStatus === 'Delivered' && selectedOrder.paymentMethod.includes('COD') ? 'Paid' : selectedOrder.paymentStatus });
    }
  };

  const handleAssignAgent = (orderId, agentName) => {
    const updated = ordersList.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, deliveryAgent: agentName };
      }
      return ord;
    });
    setOrdersList(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, deliveryAgent: agentName });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredOrders = ordersList.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Orders Workflow</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1 font-bold">Track customer order dispatch stages and UAE Tax compliant invoices.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <Download size={18} /> Export Orders CSV
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
        <div className="flex-1 relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Patient Name, Mobile..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold"
          >
            <option value="all">All Order Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="out for delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Order ID</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Patient / Customer</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Total Amount</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Payment Ledger</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-black text-primary">{order.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight">{order.customerName}</p>
                    <p className="text-xs text-slate-400">{order.phone}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400 font-bold">{order.date}</td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">{currency} {order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`text-xs font-black uppercase tracking-wider ${
                      order.paymentStatus === 'Paid' ? 'text-emerald-500' :
                      order.paymentStatus === 'Refunded' ? 'text-rose-500' : 'text-amber-500'
                    }`}>
                      {order.paymentStatus}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{order.paymentMethod}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleOpenDetails(order)}
                      className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white font-black text-xs rounded-lg transition-all flex items-center gap-1 ml-auto"
                    >
                      <Eye size={12} /> View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Drawer Panel for Invoice Details & Order Actions */}
      <AnimatePresence>
        {isDrawerOpen && selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-2xl bg-white dark:bg-dark-card border-l border-slate-200 dark:border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-xs font-black uppercase text-primary tracking-widest">Order Workspace</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">Transaction {selectedOrder.id}</h3>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500"
                >
                  Close
                </button>
              </div>

              {/* Drawer Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 1. Workflow Status Manager */}
                <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-100 dark:border-white/5 space-y-3">
                  <h4 className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-widest">Update Dispatch Stage</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <select 
                      value={selectedOrder.status}
                      onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                      className="px-4 py-2.5 bg-white dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl font-bold text-sm text-slate-700 dark:text-white outline-none"
                    >
                      <option value="Pending">Pending Review</option>
                      <option value="Processing">Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <select
                      value={selectedOrder.deliveryAgent}
                      onChange={(e) => handleAssignAgent(selectedOrder.id, e.target.value)}
                      className="px-4 py-2.5 bg-white dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl font-bold text-sm text-slate-700 dark:text-white outline-none"
                    >
                      <option value="Unassigned">Assign Courier...</option>
                      <option value="Suresh Kumar">Suresh Kumar (Rider 1)</option>
                      <option value="Ramesh V">Ramesh V (Rider 2)</option>
                      <option value="Careem Express">Careem Express Fleet</option>
                    </select>
                  </div>
                </div>

                {/* 2. Regional tax compliant invoice sheet */}
                <div id="invoice-sheet" className="p-6 border border-slate-200 dark:border-white/10 rounded-[24px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white space-y-6 relative shadow-lg">
                  {/* Decorative Watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 dark:text-white/5 font-black text-6xl tracking-widest select-none pointer-events-none uppercase -rotate-12">
                    Amster Care
                  </div>

                  {/* Header Row */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-black text-primary">AMSTER MED CARE PHARMACY LLC</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                        {storeAddress}<br />
                        {taxRegistrationLabel}: {taxRegistrationNumber} ({taxRate}% {taxName} Reg)
                      </p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-black text-slate-700 dark:text-slate-300">TAX INVOICE</h3>
                      <p className="text-xs text-slate-500 font-mono mt-1 font-bold">INV-{selectedOrder.id}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Date: {selectedOrder.date}</p>
                    </div>
                  </div>

                  {/* Patient & Billing Block */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 dark:border-white/5 py-4 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">BILLED TO</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedOrder.customerName}</p>
                      <p className="text-slate-500 flex items-center gap-1 mt-0.5"><Phone size={10} /> {selectedOrder.phone}</p>
                      <p className="text-slate-500 mt-0.5">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">SHIPPING LOCATION</p>
                      <p className="text-slate-600 dark:text-gray-300 leading-tight font-bold">
                        <MapPin size={10} className="inline text-rose-500 mr-0.5" />
                        {selectedOrder.address}
                      </p>
                    </div>
                  </div>

                  {/* Itemized Grid */}
                  <div className="space-y-3">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Itemized Line Details</p>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-white/5 text-slate-500 font-black">
                          <th className="py-2">Description</th>
                          <th className="py-2 text-center">Qty</th>
                          <th className="py-2 text-right">RSP ({currency})</th>
                          <th className="py-2 text-right">Total ({currency})</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-bold">
                        {selectedOrder.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2 text-slate-900 dark:text-white">{item.name}</td>
                            <td className="py-2 text-center text-slate-600 dark:text-gray-400">{item.qty}</td>
                            <td className="py-2 text-right text-slate-600 dark:text-gray-400">{item.price.toFixed(2)}</td>
                            <td className="py-2 text-right text-slate-900 dark:text-white">{(item.qty * item.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Financial Calculations Sheet */}
                  <div className="border-t border-slate-100 dark:border-white/5 pt-4 text-xs flex justify-end">
                    <div className="w-64 space-y-2 text-slate-600 dark:text-gray-300 font-bold">
                      <div className="flex justify-between">
                        <span>Subtotal Excl. {taxName}:</span>
                        <span className="text-slate-900 dark:text-white">{currency} {selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      {selectedOrder.discount > 0 && (
                        <div className="flex justify-between text-rose-500">
                          <span>Discount Deduction:</span>
                          <span>- {currency} {selectedOrder.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>{activeTaxProfile.country} {taxName} Collected ({taxRate}%):</span>
                        <span className="text-slate-900 dark:text-white">{currency} {selectedOrder.vat.toFixed(2)}</span>
                      </div>
                      {activeTaxProfile.splitTax?.enabled && (
                        <div className="flex justify-between text-slate-500">
                          <span>{activeTaxProfile.splitTax.labels.join(' / ')} Split:</span>
                          <span>{taxRate / 2}% + {taxRate / 2}%</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-slate-200 dark:border-white/10 pt-2 font-black text-sm text-slate-900 dark:text-white">
                        <span>Total Invoice (Net):</span>
                        <span className="text-primary">{currency} {selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Footer regulatory */}
                  <div className="border-t border-dashed border-slate-200 dark:border-white/10 pt-4 text-[9px] text-slate-400 font-bold text-center space-y-1">
                    <p>{activeTaxProfile.invoiceFooter}</p>
                    <p>Prescription drugs checked and sealed by licensed pharmacist staff. Thank you for choosing Amster.</p>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between shrink-0">
                <button 
                  onClick={() => {
                    alert('Simulated: Tax Invoice saved as PDF.');
                  }}
                  className="px-5 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <Download size={16} /> Save PDF
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                >
                  <Printer size={16} /> Print Tax Invoice
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
