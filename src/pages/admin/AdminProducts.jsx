import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, Copy,
  Download, Upload, CheckCircle2, XCircle, AlertTriangle,
  QrCode, ScanLine, DollarSign, Archive, ClipboardList, ShieldAlert,
  Calendar, Layers, TrendingUp, AlertCircle
} from 'lucide-react';
import { getTaxProfile } from '../../services/taxProfiles';

const initialProducts = [
  { 
    sku: 'PRD001', 
    name: 'Panadol Advance 500mg', 
    genericName: 'Paracetamol', 
    brand: 'GSK', 
    supplier: 'Aster Distribution', 
    category: 'Medicine', 
    purchaseCost: 8.50, 
    sellingPrice: 12.00, 
    gpPercent: '29.17', 
    vatAmount: 0.60, 
    stock: 1250, 
    reservedStock: 45, 
    damagedStock: 2, 
    dosageInfo: 'Take 1-2 tablets every 4-6 hours', 
    prescriptionRequired: false, 
    batchNumber: 'B-PAN502', 
    expiryDate: '2027-11-20', 
    warehouseLocation: 'Zone A - Aisle 3', 
    status: 'In Stock' 
  },
  { 
    sku: 'PRD002', 
    name: 'Solgar Vitamin C 1000mg', 
    genericName: 'Ascorbic Acid', 
    brand: 'Solgar', 
    supplier: 'Gulf Drug LLC', 
    category: 'Supplement', 
    purchaseCost: 45.00, 
    sellingPrice: 75.00, 
    gpPercent: '40.00', 
    vatAmount: 3.75, 
    stock: 430, 
    reservedStock: 10, 
    damagedStock: 0, 
    dosageInfo: 'Take 1 capsule daily with meals', 
    prescriptionRequired: false, 
    batchNumber: 'B-SOL889', 
    expiryDate: '2028-02-15', 
    warehouseLocation: 'Zone C - Aisle 1', 
    status: 'In Stock' 
  },
  { 
    sku: 'PRD003', 
    name: 'Omron M3 Blood Pressure Monitor', 
    genericName: 'BP Monitor', 
    brand: 'Omron', 
    supplier: 'Modern Pharmaceutical LLC', 
    category: 'Equipment', 
    purchaseCost: 190.00, 
    sellingPrice: 295.00, 
    gpPercent: '35.59', 
    vatAmount: 14.75, 
    stock: 15, 
    reservedStock: 1, 
    damagedStock: 0, 
    dosageInfo: 'Use as directed by physician', 
    prescriptionRequired: false, 
    batchNumber: 'B-OMR003', 
    expiryDate: '2030-05-10', 
    warehouseLocation: 'Zone D - Shelf 2', 
    status: 'Low Stock' 
  },
  { 
    sku: 'PRD004', 
    name: 'Amoxicillin 500mg Capsules', 
    genericName: 'Amoxicillin Trihydrate', 
    brand: 'Julphar', 
    supplier: 'Julphar Gulf Pharmaceutical', 
    category: 'Medicine', 
    purchaseCost: 12.00, 
    sellingPrice: 22.50, 
    gpPercent: '46.67', 
    vatAmount: 1.13, 
    stock: 0, 
    reservedStock: 0, 
    damagedStock: 0, 
    dosageInfo: 'Take 1 capsule every 8 hours as directed', 
    prescriptionRequired: true, 
    batchNumber: 'B-AMX991', 
    expiryDate: '2026-08-30', 
    warehouseLocation: 'Zone A - Vault Rx', 
    status: 'Out of Stock' 
  },
  { 
    sku: 'PRD005', 
    name: 'N95 Respirator Masks (3M)', 
    genericName: 'Respirator Mask', 
    brand: '3M', 
    supplier: 'Aster Distribution', 
    category: 'Safety', 
    purchaseCost: 20.00, 
    sellingPrice: 35.00, 
    gpPercent: '42.86', 
    vatAmount: 1.75, 
    stock: 850, 
    reservedStock: 12, 
    damagedStock: 1, 
    dosageInfo: 'Single-use protective mask', 
    prescriptionRequired: false, 
    batchNumber: 'B-3MN95', 
    expiryDate: '2031-01-01', 
    warehouseLocation: 'Zone B - Pallet 4', 
    status: 'In Stock' 
  }
];

export default function AdminProducts() {
  const [productsList, setProductsList] = useState(initialProducts);
  const [currencySymbol, setCurrencySymbol] = useState('AED');
  const [vatRate, setVatRate] = useState(5);
  const [taxRegion, setTaxRegion] = useState('United Arab Emirates');
  const activeTaxProfile = getTaxProfile(taxRegion);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('erpCurrency') || 'AED';
    const savedVatRate = parseFloat(localStorage.getItem('erpVatRate') || '5');
    const savedRegion = localStorage.getItem('erpTaxRegion') || 'United Arab Emirates';
    setCurrencySymbol(savedCurrency === 'INR' ? 'INR' : 'AED');
    setVatRate(savedVatRate);
    setTaxRegion(savedRegion);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Modal Navigation Tab
  const [modalActiveTab, setModalActiveTab] = useState('general');

  // Form State
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [brand, setBrand] = useState('');
  const [supplier, setSupplier] = useState('');
  const [category, setCategory] = useState('Medicine');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('0');
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);
  const [dosageInfo, setDosageInfo] = useState('');
  const [stock, setStock] = useState('');
  const [reservedStock, setReservedStock] = useState('0');
  const [damagedStock, setDamagedStock] = useState('0');
  const [batchNumber, setBatchNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [warehouseLocation, setWarehouseLocation] = useState('');

  // Scanner state targets
  const [scanTarget, setScanTarget] = useState('search');
  const videoRef = useRef(null);

  // Auto Calculations (computed states)
  const calculatedVat = purchaseCost ? (parseFloat(purchaseCost) * (vatRate / 100)).toFixed(2) : '0.00';
  const computedSellingAfterDiscount = sellingPrice 
    ? (parseFloat(sellingPrice) - (parseFloat(sellingPrice) * parseFloat(discountPercent || 0) / 100)).toFixed(2) 
    : '0.00';
  
  const computedGpPercent = purchaseCost && computedSellingAfterDiscount && parseFloat(computedSellingAfterDiscount) > 0
    ? (((parseFloat(computedSellingAfterDiscount) - parseFloat(purchaseCost)) / parseFloat(computedSellingAfterDiscount)) * 100).toFixed(2)
    : '0.00';

  useEffect(() => {
    let timeout;
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Mock scanned barcode
        timeout = setTimeout(() => {
          setIsScannerOpen(false);
          if (scanTarget === 'search') {
            setSearchTerm('PRD001');
          } else {
            setSku('6291030948572');
          }
        }, 2000);
      } catch (err) {
        console.error("Camera access error:", err);
        timeout = setTimeout(() => {
          setIsScannerOpen(false);
          if (scanTarget === 'search') {
            setSearchTerm('PRD001');
          } else {
            setSku('6291030948572');
          }
        }, 1500);
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setSku(product.sku);
    setName(product.name);
    setGenericName(product.genericName || '');
    setBrand(product.brand || '');
    setSupplier(product.supplier || '');
    setCategory(product.category || 'Medicine');
    setPurchaseCost(product.purchaseCost.toString());
    setSellingPrice(product.sellingPrice.toString());
    setDiscountPercent('0');
    setPrescriptionRequired(product.prescriptionRequired || false);
    setDosageInfo(product.dosageInfo || '');
    setStock(product.stock.toString());
    setReservedStock(product.reservedStock ? product.reservedStock.toString() : '0');
    setDamagedStock(product.damagedStock ? product.damagedStock.toString() : '0');
    setBatchNumber(product.batchNumber || '');
    setExpiryDate(product.expiryDate || '');
    setWarehouseLocation(product.warehouseLocation || '');
    setModalActiveTab('general');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setSku('');
    setName('');
    setGenericName('');
    setBrand('');
    setSupplier('');
    setCategory('Medicine');
    setPurchaseCost('');
    setSellingPrice('');
    setDiscountPercent('0');
    setPrescriptionRequired(false);
    setDosageInfo('');
    setStock('');
    setReservedStock('0');
    setDamagedStock('0');
    setBatchNumber('');
    setExpiryDate('');
    setWarehouseLocation('');
    setModalActiveTab('general');
    setIsModalOpen(true);
  };

  const handleDuplicate = (product) => {
    const duplicated = {
      ...product,
      sku: `${product.sku}-COPY`,
      name: `${product.name} (Copy)`,
      stock: 0,
      reservedStock: 0,
      damagedStock: 0,
      batchNumber: `${product.batchNumber}-NEW`
    };
    handleEdit(duplicated);
    setEditingProduct(null); // Open modal as a new product setup
  };

  const handleDelete = (skuToDelete) => {
    if (confirm("Are you sure you want to delete this product from the ERP catalog?")) {
      setProductsList(productsList.filter(p => p.sku !== skuToDelete));
    }
  };

  const handleSave = () => {
    if (!sku || !name || !purchaseCost || !sellingPrice || !stock) {
      alert('Please fill out all mandatory fields in general and pricing tabs.');
      return;
    }

    const calculatedStatus = parseInt(stock) <= 0 
      ? 'Out of Stock' 
      : parseInt(stock) < 20 
      ? 'Low Stock' 
      : 'In Stock';

    const savedProduct = {
      sku,
      name,
      genericName,
      brand,
      supplier,
      category,
      purchaseCost: parseFloat(purchaseCost),
      sellingPrice: parseFloat(sellingPrice),
      gpPercent: computedGpPercent,
      vatAmount: parseFloat(calculatedVat),
      stock: parseInt(stock),
      reservedStock: parseInt(reservedStock),
      damagedStock: parseInt(damagedStock),
      dosageInfo,
      prescriptionRequired,
      batchNumber,
      expiryDate,
      warehouseLocation,
      status: calculatedStatus
    };

    if (editingProduct) {
      // Update
      setProductsList(productsList.map(p => p.sku === editingProduct.sku ? savedProduct : p));
    } else {
      // Add new
      setProductsList([...productsList, savedProduct]);
    }
    setIsModalOpen(false);
  };

  // Filter logic
  const filteredProducts = productsList.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.genericName && product.genericName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            Products Catalog
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage pharmacy stocks, GP% calculations, and DHA/MOH regulations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/20 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Upload size={18} /> Bulk Import
          </button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl transition-all flex items-center gap-2">
            <Download size={18} /> Export List
          </button>
          <button 
            onClick={handleAdd}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Add Medicine
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
        <div className="flex-1 relative w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, generic drug, or SKU code..." 
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
            className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-600 dark:text-gray-400 rounded-xl transition-colors border border-slate-200 dark:border-white/10 shrink-0"
            title="Scan Barcode / QR Code"
          >
            <QrCode size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold"
          >
            <option value="all">All Categories</option>
            <option value="medicine">Medicines</option>
            <option value="supplement">Supplements</option>
            <option value="equipment">Equipment</option>
            <option value="safety">Safety Items</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Grid Data table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">SKU / Barcode</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Name / Scientific Name</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Pricing ({currencySymbol})</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">GP% Margin</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Stock Level</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Compliance</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.sku} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <p className="font-mono text-sm font-bold text-slate-700 dark:text-gray-300">{product.sku}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{product.category}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <p className="font-black text-slate-900 dark:text-white leading-tight">{product.name}</p>
                      {product.genericName && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold italic mt-0.5">
                          {product.genericName}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="font-black text-slate-900 dark:text-white">RSP: {currencySymbol} {product.sellingPrice.toFixed(2)}</p>
                      <p className="text-xs text-slate-400 font-bold">Cost: {currencySymbol} {product.purchaseCost.toFixed(2)}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-slate-800 dark:text-white">{product.gpPercent}%</span>
                      {parseFloat(product.gpPercent) >= 30 ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="High Profit Margin" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" title="Moderate Margin" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-black text-slate-800 dark:text-white">{product.stock} units</p>
                      {product.reservedStock > 0 && (
                        <p className="text-[10px] text-amber-500 font-bold">Reserved: {product.reservedStock}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {product.prescriptionRequired ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 text-[10px] font-black uppercase rounded tracking-wider">
                        <ShieldAlert size={10} /> RX ONLY
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 text-[10px] font-black uppercase rounded tracking-wider">
                        OTC DRUG
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit Details"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDuplicate(product)}
                        className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                        title="Duplicate Product"
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.sku)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-sm text-slate-500 font-bold">
          <span>Showing {filteredProducts.length} of {productsList.length} products</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">Prev</button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/20">1</button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">Next</button>
          </div>
        </div>
      </div>

      {/* Add / Update Product Modal with TABS */}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-dark-card rounded-[32px] shadow-2xl z-50 border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {editingProduct ? 'Update Inventory Medicine' : 'Add New UAE Pharmacy Item'}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1 tracking-widest text-primary">UAE Drug Regulatory Form</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 rounded-full">
                  <XCircle size={24} />
                </button>
              </div>

              {/* Tab Navigation Menu */}
              <div className="flex border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-2 gap-2 shrink-0">
                {[
                  { id: 'general', label: 'General & Rx', icon: Archive },
                  { id: 'pricing', label: `Pricing & ${activeTaxProfile.taxName}`, icon: DollarSign },
                  { id: 'stock', label: 'Stock & Batches', icon: Layers },
                  { id: 'projection', label: 'Projections & Brand', icon: TrendingUp },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setModalActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                      modalActiveTab === tab.id
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <tab.icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Modal Scrollable Contents */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {/* 1. General Info & Regulatory */}
                {modalActiveTab === 'general' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">SKU / Barcode *</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="Enter or scan SKU..." 
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
                            <QrCode size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Medicine Name *</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Panadol Advance 500mg" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-bold" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Generic Scientific Name</label>
                        <input 
                          type="text" 
                          value={genericName} 
                          onChange={(e) => setGenericName(e.target.value)}
                          placeholder="e.g. Paracetamol" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Dosage Instructions</label>
                        <input 
                          type="text" 
                          value={dosageInfo} 
                          onChange={(e) => setDosageInfo(e.target.value)}
                          placeholder="e.g. 1 tablet every 8 hours" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Category</label>
                        <select 
                          value={category} 
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-bold"
                        >
                          <option value="Medicine">Medicine</option>
                          <option value="Supplement">Supplement</option>
                          <option value="Equipment">Equipment</option>
                          <option value="Safety">Safety Items</option>
                        </select>
                      </div>
                      
                      <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-white/5 mt-4">
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-white">Prescription Required (Rx Only)</p>
                          <p className="text-[10px] text-slate-500">Enable if DHA rules require doctor RX verification</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={prescriptionRequired} 
                          onChange={(e) => setPrescriptionRequired(e.target.checked)}
                          className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Pricing & regional tax */}
                {modalActiveTab === 'pricing' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Purchase Cost ({currencySymbol}) *</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={purchaseCost} 
                          onChange={(e) => setPurchaseCost(e.target.value)}
                          placeholder="0.00" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-black" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                          {vatRate}% {activeTaxProfile.taxName} ({currencySymbol})
                        </label>
                        <input 
                          type="text" 
                          readOnly 
                          value={`${currencySymbol} ${calculatedVat}`}
                          className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 font-bold outline-none cursor-not-allowed" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Recommended Selling Price (RSP - {currencySymbol}) *</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={sellingPrice} 
                          onChange={(e) => setSellingPrice(e.target.value)}
                          placeholder="0.00" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-black text-primary" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Discount Over RSP (%)</label>
                        <input 
                          type="number" 
                          value={discountPercent} 
                          onChange={(e) => setDiscountPercent(e.target.value)}
                          placeholder="0" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-black uppercase">Final Selling Price (after disc)</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{currencySymbol} {computedSellingAfterDiscount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-black uppercase">Gross Profit Margin (GP%)</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{computedGpPercent}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Stock Warehousing & Batches */}
                {modalActiveTab === 'stock' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Current Stock *</label>
                        <input 
                          type="number" 
                          value={stock} 
                          onChange={(e) => setStock(e.target.value)}
                          placeholder="Total units..." 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-bold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Reserved Stock</label>
                        <input 
                          type="number" 
                          value={reservedStock} 
                          onChange={(e) => setReservedStock(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Damaged Stock</label>
                        <input 
                          type="number" 
                          value={damagedStock} 
                          onChange={(e) => setDamagedStock(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Active Batch Number</label>
                        <input 
                          type="text" 
                          value={batchNumber} 
                          onChange={(e) => setBatchNumber(e.target.value)}
                          placeholder="e.g. B-PAN502" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-mono" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Batch Expiry Date</label>
                        <div className="relative">
                          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="date" 
                            value={expiryDate} 
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Warehouse / Shelf Location</label>
                      <input 
                        type="text" 
                        value={warehouseLocation} 
                        onChange={(e) => setWarehouseLocation(e.target.value)}
                        placeholder="e.g. Zone A - Aisle 3 - Shelf 4" 
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                      />
                    </div>
                  </div>
                )}

                {/* 4. Projections, Brand, Supplier */}
                {modalActiveTab === 'projection' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Brand Name</label>
                        <input 
                          type="text" 
                          value={brand} 
                          onChange={(e) => setBrand(e.target.value)}
                          placeholder="e.g. GSK (GlaxoSmithKline)" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Supplier</label>
                        <input 
                          type="text" 
                          value={supplier} 
                          onChange={(e) => setSupplier(e.target.value)}
                          placeholder="e.g. Aster Distribution" 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-bold" 
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        <TrendingUp size={18} />
                        <h4 className="font-black text-sm uppercase">{taxRegion} Sales Projection (30 Days)</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-gray-300 mt-1 leading-relaxed">
                        Based on localized historical patterns for {name || 'this product'}, demand is expected to <strong>increase by 12%</strong> next month due to high prescription rates. Recommended safety buffer: <strong>120 additional units</strong>.
                      </p>
                    </div>

                    <div className="border border-slate-100 dark:border-white/5 rounded-2xl p-4">
                      <h4 className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase mb-3 tracking-wider">Supplier Purchase Cost History ({currencySymbol})</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-2 bg-slate-50 dark:bg-white/5 rounded">
                          <span className="font-bold">May 2026 (Current)</span>
                          <span className="font-black">{currencySymbol} {purchaseCost || '0.00'}</span>
                        </div>
                        <div className="flex justify-between p-2">
                          <span className="font-bold">January 2026</span>
                          <span className="font-black">{currencySymbol} {(parseFloat(purchaseCost || 0) * 0.98).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between p-2">
                          <span className="font-bold">September 2025</span>
                          <span className="font-black">{currencySymbol} {(parseFloat(purchaseCost || 0) * 0.95).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions Footer */}
              <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex items-center justify-between shrink-0">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 size={18} /> {editingProduct ? 'Save Updates' : 'Add Item to Catalog'}
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
                <button onClick={() => setIsScannerOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 rounded-full">
                  <XCircle size={24} />
                </button>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Scan Barcode / QR</h3>
              <p className="text-sm text-slate-500 mb-6">Position the drug packet barcode inside the lines.</p>
              
              <div className="relative w-64 h-64 bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border-4 border-slate-800">
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
                <motion.div 
                  animate={{ y: [-100, 100, -100] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] z-10"
                />
                <ScanLine size={48} className="text-white/30 z-10 mix-blend-overlay drop-shadow-lg animate-pulse" />
                
                {/* Frame Corner markings */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Scanning Active</span>
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
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Bulk Excel Upload</h3>
                <button onClick={() => setIsImportModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 rounded-full">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Click to select catalog spreadsheet</h4>
                  <p className="text-xs text-slate-500">Supports .xlsx, .xls, and .csv UAE pharmacy templates</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
                  <div>
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-400 block">Download Template</span>
                    <span className="text-[10px] text-blue-600/80 dark:text-blue-400/80">UAE compliance columns formatted.</span>
                  </div>
                  <button className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline">Download</button>
                </div>

                <button 
                  onClick={() => {
                    alert('Simulated processing: Added 12 new medicine entries to stock list.');
                    setIsImportModalOpen(false);
                  }}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} /> Process Catalog Excel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

