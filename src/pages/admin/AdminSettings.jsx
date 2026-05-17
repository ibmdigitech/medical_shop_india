import { useState, useEffect } from 'react';
import { 
  Save, Store, MapPin, Phone, Mail, 
  CreditCard, Bell, Shield, Globe, CheckCircle2, AlertTriangle, HelpCircle
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General Settings State
  const [storeName, setStoreName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [taxRegion, setTaxRegion] = useState('India (Kerala)');
  const [storeAddress, setStoreAddress] = useState('');
  const [licenseNo, setLicenseNo] = useState('');

  // Payment & Tax Settings State
  const [vatRate, setVatRate] = useState('12'); // 12% standard GST/VAT for medicines in Kerala
  const [taxRegistrationNumber, setTaxRegistrationNumber] = useState('');
  const [enableTaxSeparation, setEnableTaxSeparation] = useState(true); // Split CGST/SGST

  // Security Permissions State
  const [roles, setRoles] = useState({
    pharmacistCanEditProducts: false,
    salesManagerCanApproveRx: false,
    deliveryRidersCanUpdateCash: true
  });

  // Load from localStorage
  useEffect(() => {
    setStoreName(localStorage.getItem('erpStoreName') || 'Amster Med Care');
    setSupportEmail(localStorage.getItem('erpSupportEmail') || 'info@amstermedcare.com');
    setSupportPhone(localStorage.getItem('erpSupportPhone') || '+91 90375 07643');
    setCurrency(localStorage.getItem('erpCurrency') || 'INR');
    setTaxRegion(localStorage.getItem('erpTaxRegion') || 'India (Kerala)');
    setStoreAddress(localStorage.getItem('erpStoreAddress') || 'First Floor, ABC Complex, Near Bus Stand, Omassery, Calicut - 673582');
    setLicenseNo(localStorage.getItem('erpLicenseNo') || 'KL-KKD-2026-PHA-998');
    setVatRate(localStorage.getItem('erpVatRate') || '12');
    setTaxRegistrationNumber(localStorage.getItem('erpTaxRegistrationNumber') || '32AABCA1234F1Z5');
  }, []);

  const handleSave = () => {
    localStorage.setItem('erpStoreName', storeName);
    localStorage.setItem('erpSupportEmail', supportEmail);
    localStorage.setItem('erpSupportPhone', supportPhone);
    localStorage.setItem('erpCurrency', currency);
    localStorage.setItem('erpTaxRegion', taxRegion);
    localStorage.setItem('erpStoreAddress', storeAddress);
    localStorage.setItem('erpLicenseNo', licenseNo);
    localStorage.setItem('erpVatRate', vatRate);
    localStorage.setItem('erpTaxRegistrationNumber', taxRegistrationNumber);
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleRegionChange = (region) => {
    setTaxRegion(region);
    if (region === 'India (Kerala)') {
      setCurrency('INR');
      setVatRate('12'); // Standard GST for Indian drugs is 12%
      setStoreAddress('First Floor, ABC Complex, Near Bus Stand, Omassery, Calicut - 673582');
      setSupportPhone('+91 90375 07643');
      setLicenseNo('KL-KKD-2026-PHA-998');
      setTaxRegistrationNumber('32AABCA1234F1Z5');
    } else {
      setCurrency('AED');
      setVatRate('5'); // UAE standard VAT rate is 5%
      setStoreAddress('Office Suite 4B, Health Heights, Downtown Dubai, Dubai, UAE');
      setSupportPhone('+971 4 234 5678');
      setLicenseNo('DHA-PH-2026-8874');
      setTaxRegistrationNumber('100348572900003');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">ERP Configuration</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1 font-bold">Manage store parameters, India Kerala/UAE VAT setups, and authorization metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <Save size={18} /> Save Settings
          </button>
        </div>
      </div>

      {saveSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="p-4 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-2xl font-bold flex items-center gap-3 shadow-sm"
        >
          <CheckCircle2 size={20} />
          <span>Settings saved successfully! The entire ERP registry has been synchronized.</span>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 space-y-2 shrink-0">
          {[
            { id: 'general', label: 'General & Region', icon: Store },
            { id: 'payment', label: 'Taxes & VAT (Kerala/UAE)', icon: CreditCard },
            { id: 'locations', label: 'Pharmacy Locations', icon: MapPin },
            { id: 'security', label: 'Staff Roles (RBAC)', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-black transition-all text-left ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Store & Region Configuration</h2>
                <p className="text-xs text-slate-500 mt-1">Specify currency, local geographic regions, and drug regulatory licenses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Active Regulatory Region</label>
                  <select 
                    value={taxRegion} 
                    onChange={(e) => handleRegionChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-black"
                  >
                    <option value="India (Kerala)">India (Kerala State GST/VAT Model)</option>
                    <option value="United Arab Emirates">United Arab Emirates (5% UAE VAT Model)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Active Currency</label>
                  <input 
                    type="text" 
                    readOnly
                    value={currency === 'INR' ? 'INR (₹ - Indian Rupee)' : 'AED (AED - UAE Dirham)'}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 font-bold outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Pharmacy Store Name</label>
                  <input 
                    type="text" 
                    value={storeName} 
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-bold" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Drug License Registration Number</label>
                  <input 
                    type="text" 
                    value={licenseNo} 
                    onChange={(e) => setLicenseNo(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-mono font-bold" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Support Email Address</label>
                  <input 
                    type="email" 
                    value={supportEmail} 
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Support Contact Phone</label>
                  <input 
                    type="text" 
                    value={supportPhone} 
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Headquarters Corporate Address</label>
                <textarea 
                  rows="3" 
                  value={storeAddress} 
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-bold resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: TAXES & VAT */}
          {activeTab === 'payment' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Taxation Settings & VAT Logs</h2>
                <p className="text-xs text-slate-500 mt-1">Configure VAT percentages, split state SGST / federal CGST, and tax invoice headers.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl flex gap-3 text-xs text-amber-800 dark:text-amber-400">
                  <AlertTriangle size={24} className="shrink-0" />
                  <div>
                    <span className="font-black block uppercase mb-1">State GST & VAT Compliance Notice</span>
                    <span>
                      {taxRegion === 'India (Kerala)' 
                        ? 'For Indian pharmacies operating in Kerala, medicine supplies are subject to 12% standard GST (split equally into 6% CGST and 6% SGST). Life saving items can be configured at 5%.' 
                        : 'For UAE pharmacys, Federal Tax Authority standard VAT is fixed at 5% across generic and medical products.'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Base Tax / VAT Rate (%)</label>
                    <select 
                      value={vatRate} 
                      onChange={(e) => setVatRate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-black"
                    >
                      <option value="5">5% (UAE Standard / Lifesaving Drugs)</option>
                      <option value="12">12% (India Kerala standard Medicine GST)</option>
                      <option value="18">18% (Supplements & Luxury items)</option>
                      <option value="0">0% (Tax Exempted Items)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">GSTIN / TRN Registration ID</label>
                    <input 
                      type="text" 
                      value={taxRegistrationNumber} 
                      onChange={(e) => setTaxRegistrationNumber(e.target.value)}
                      placeholder="Enter Tax registration number..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-mono font-bold" 
                    />
                  </div>
                </div>

                {taxRegion === 'India (Kerala)' && (
                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl space-y-3 border border-slate-100 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-white">Split Central CGST & State SGST</p>
                        <p className="text-xs text-slate-500">Automatically display {parseFloat(vatRate)/2}% CGST and {parseFloat(vatRate)/2}% SGST in billing breakdown.</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={enableTaxSeparation}
                        onChange={(e) => setEnableTaxSeparation(e.target.checked)}
                        className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PHARMACY LOCATIONS */}
          {activeTab === 'locations' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Active Pharmacy Branches</h2>
                <p className="text-xs text-slate-500 mt-1">Manage physical pharmacy inventory hubs and regional outlets.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                {[
                  { name: 'Amster Med Care Omassery (HQ)', area: 'Calicut Bus Stand Road, Kozhikode, Kerala', type: 'Physical Store & Distribution', code: 'BR-001' },
                  { name: 'Amster Care Calicut City', area: 'Mavoor Road, Kozhikode, Kerala', type: 'Physical Pharmacy', code: 'BR-002' },
                  { name: 'Amster Care Dubai Marina Hub', area: 'Marina Heights, Marina Walk, Dubai, UAE', type: 'Fulfillment Warehouse', code: 'BR-003' }
                ].map((branch, idx) => (
                  <div key={idx} className="p-4 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase rounded">{branch.code}</span>
                        <h4 className="font-black text-slate-950 dark:text-white text-sm">{branch.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><MapPin size={12} className="text-rose-500" /> {branch.area}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{branch.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STAFF RBAC ROLES */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Role-Based Access Controls (RBAC)</h2>
                <p className="text-xs text-slate-500 mt-1">Set operational clearance rules for pharmacists, inventory staff, and delivery riders.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">Pharmacist can override product prices</p>
                      <p className="text-xs text-slate-400">Allows licensed DHA/MOH pharmacists to modify purchase cost or selling price tabs.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={roles.pharmacistCanEditProducts}
                      onChange={(e) => setRoles({ ...roles, pharmacistCanEditProducts: e.target.checked })}
                      className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">Sales Manager can authorize Prescription uploads</p>
                      <p className="text-xs text-slate-400">Allows sales team to verify and clear doctor prescriptions without pharmacist license validation.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={roles.salesManagerCanApproveRx}
                      onChange={(e) => setRoles({ ...roles, salesManagerCanApproveRx: e.target.checked })}
                      className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">Delivery Riders can settle Cash on Delivery (COD)</p>
                      <p className="text-xs text-slate-400">Enables mobile rider application to mark invoice ledgers as PAID instantly upon package dispatch.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={roles.deliveryRidersCanUpdateCash}
                      onChange={(e) => setRoles({ ...roles, deliveryRidersCanUpdateCash: e.target.checked })}
                      className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
