import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, 
  Download, Upload, CheckCircle2, XCircle, AlertTriangle,
  QrCode, ScanLine
} from 'lucide-react';

const products = [
  { id: 'PRD001', name: 'Paracetamol 500mg', category: 'Medicine', stock: 1250, price: 45, status: 'In Stock' },
  { id: 'PRD002', name: 'Vitamin C Complex', category: 'Supplement', stock: 430, price: 120, status: 'In Stock' },
  { id: 'PRD003', name: 'Digital Thermometer', category: 'Equipment', stock: 15, price: 450, status: 'Low Stock' },
  { id: 'PRD004', name: 'Cough Syrup 100ml', category: 'Medicine', stock: 0, price: 85, status: 'Out of Stock' },
  { id: 'PRD005', name: 'N95 Face Masks (Pack of 5)', category: 'Safety', stock: 850, price: 250, status: 'In Stock' },
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [barcode, setBarcode] = useState('');
  const [scanTarget, setScanTarget] = useState('search');
  const videoRef = useRef(null);

  useEffect(() => {
    let timeout;
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Simulate finding a barcode after 3 seconds
        timeout = setTimeout(() => {
          setIsScannerOpen(false);
          if (scanTarget === 'search') {
            setSearchTerm('PRD001'); // Auto-fill search with scanned code
          } else {
            setBarcode('8901030948572'); // Fill form with realistic UPC
          }
        }, 3000);
      } catch (err) {
        console.error("Error accessing camera:", err);
        // Fallback simulation if camera is blocked/unavailable
        timeout = setTimeout(() => {
          setIsScannerOpen(false);
          if (scanTarget === 'search') {
            setSearchTerm('PRD001');
          } else {
            setBarcode('8901030948572');
          }
        }, 2500);
      }
    };

    if (isScannerOpen) {
      startCamera();
    }

    return () => {
      clearTimeout(timeout);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScannerOpen]);

  const finalAmount = price && discount ? (parseFloat(price) - (parseFloat(price) * parseFloat(discount) / 100)).toFixed(2) : price;

  const handleEdit = (product) => {
    setEditingProduct(product);
    setPrice(product.price);
    setDiscount('');
    setBarcode(product.id || '');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setPrice('');
    setDiscount('');
    setBarcode('');
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Products Management</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage your pharmacy inventory and catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/20 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Upload size={18} /> Import
          </button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl transition-all flex items-center gap-2">
            <Download size={18} /> Export
          </button>
          <button 
            onClick={handleAdd}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 relative w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by product name, SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
            />
          </div>
          <button 
            onClick={() => {
              setScanTarget('search');
              setIsScannerOpen(true);
            }}
            className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-600 dark:text-gray-400 rounded-xl transition-colors border border-slate-200 dark:border-white/10"
            title="Scan Barcode / QR Code"
          >
            <QrCode size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold">
            <option value="all">All Categories</option>
            <option value="medicine">Medicines</option>
            <option value="supplement">Supplements</option>
            <option value="equipment">Equipment</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">ID</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Product Name</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Category</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Price</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Stock</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-sm font-bold text-slate-600 dark:text-gray-400">{product.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{product.name}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400">{product.category}</td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">₹{product.price}</td>
                  <td className="p-4 font-bold text-slate-700 dark:text-gray-300">{product.stock}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {product.status === 'In Stock' && <CheckCircle2 size={12} />}
                      {product.status === 'Low Stock' && <AlertTriangle size={12} />}
                      {product.status === 'Out of Stock' && <XCircle size={12} />}
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to 5 of 50 entries</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">Prev</button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/20">1</button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">2</button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">Next</button>
          </div>
        </div>
      </div>

      {/* Add / Update Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl z-50 border border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {editingProduct ? 'Update Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Barcode / SKU</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      placeholder="Scan or type barcode..." 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-mono" 
                    />
                    <button 
                      onClick={() => {
                        setScanTarget('form');
                        setIsScannerOpen(true);
                      }}
                      className="p-3 bg-emerald-100 dark:bg-emerald-500/10 hover:bg-emerald-200 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl transition-colors shrink-0 shadow-sm"
                      title="Scan Barcode"
                    >
                      <QrCode size={24} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Product Name</label>
                  <input type="text" defaultValue={editingProduct?.name || ''} className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Category</label>
                    <input 
                      type="text" 
                      list="category-options"
                      defaultValue={editingProduct?.category || ''}
                      placeholder="Select or type new..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                    />
                    <datalist id="category-options">
                      <option value="Medicine" />
                      <option value="Supplement" />
                      <option value="Equipment" />
                      <option value="Safety" />
                    </datalist>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Original Price (₹)</label>
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Discount (%)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 10" 
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Final Amount (₹)</label>
                    <input 
                      type="number" 
                      readOnly 
                      value={finalAmount}
                      placeholder="Calculated automatically" 
                      className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-500 dark:text-gray-400 cursor-not-allowed font-bold" 
                    />
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-full py-4 mt-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} /> {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Scanner Modal */}
      <AnimatePresence>
        {isScannerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScannerOpen(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-dark-card rounded-[32px] p-6 shadow-2xl z-[70] border border-slate-100 dark:border-white/5 flex flex-col items-center text-center"
            >
              <div className="w-full flex justify-end mb-2">
                <button onClick={() => setIsScannerOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10">
                  <XCircle size={24} />
                </button>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Scan Barcode / QR</h3>
              <p className="text-sm text-slate-500 mb-6">Position the code within the scanner frame.</p>
              
              <div className="relative w-64 h-64 bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-4 border-slate-800">
                {/* Live Camera Feed */}
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Fake scanner laser */}
                <motion.div 
                  animate={{ y: [-100, 100, -100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] z-10"
                />
                <ScanLine size={48} className="text-white/30 z-10 mix-blend-overlay drop-shadow-lg" />
                
                {/* Corner markers */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Camera Active</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Import Excel Modal */}
      <AnimatePresence>
        {isImportModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImportModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl z-50 border border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Bulk Upload Products</h3>
                <button onClick={() => setIsImportModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer group relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Click to upload Excel file</h4>
                  <p className="text-xs text-slate-500">Supports .xlsx, .xls, and .csv formats</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-400">Need a template?</span>
                    <span className="text-xs text-blue-600/80 dark:text-blue-400/80">Download the sample excel file format.</span>
                  </div>
                  <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Download</button>
                </div>

                <button onClick={() => setIsImportModalOpen(false)} className="w-full py-4 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} /> Process Upload
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
