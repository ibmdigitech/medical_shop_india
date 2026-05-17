import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, Store, MapPin, Phone, Mail, 
  CreditCard, Bell, Shield, Globe, CheckCircle2, AlertTriangle, HelpCircle
} from 'lucide-react';
import { getTaxProfile, getTaxProfileOptions } from '../../services/taxProfiles';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General Settings State
  const [storeName, setStoreName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [currency, setCurrency] = useState('AED');
  const [taxRegion, setTaxRegion] = useState('United Arab Emirates');
  const [storeAddress, setStoreAddress] = useState('');
  const [licenseNo, setLicenseNo] = useState('');

  // Payment & Tax Settings State
  const [vatRate, setVatRate] = useState('5');
  const [taxRegistrationNumber, setTaxRegistrationNumber] = useState('');
  const activeRegion = getTaxProfile(taxRegion);

  // Security Permissions State
  const [roles, setRoles] = useState({
    pharmacistCanEditProducts: false,
    salesManagerCanApproveRx: false,
    deliveryRidersCanUpdateCash: true
  });

  // Load from localStorage
  useEffect(() => {
    const savedRegion = localStorage.getItem('erpTaxRegion') || 'United Arab Emirates';
    const savedProfile = getTaxProfile(savedRegion);
    setStoreName(localStorage.getItem('erpStoreName') || 'Amster Med Care');
    setSupportEmail(localStorage.getItem('erpSupportEmail') || 'info@amstermedcare.com');
    setSupportPhone(localStorage.getItem('erpSupportPhone') || savedProfile.phone);
    setCurrency(localStorage.getItem('erpCurrency') || savedProfile.currency);
    setTaxRegion(savedRegion);
    setStoreAddress(localStorage.getItem('erpStoreAddress') || savedProfile.address);
    setLicenseNo(localStorage.getItem('erpLicenseNo') || savedProfile.license);
    setVatRate(localStorage.getItem('erpVatRate') || savedProfile.defaultTaxRate);
    setTaxRegistrationNumber(localStorage.getItem('erpTaxRegistrationNumber') || savedProfile.sampleRegistration);
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
    const profile = getTaxProfile(region);
    setTaxRegion(region);
    setCurrency(profile.currency);
    setVatRate(profile.defaultTaxRate);
    setStoreAddress(profile.address);
    setSupportPhone(profile.phone);
    setLicenseNo(profile.license);
    setTaxRegistrationNumber(profile.sampleRegistration);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">ERP Configuration</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1 font-bold">Manage country tax profiles, VAT/GST, pharmacy licensing, and authorization metrics.</p>
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
            { id: 'payment', label: 'Taxes & VAT', icon: CreditCard },
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
                    {getTaxProfileOptions().map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Active Currency</label>
                  <input 
                    type="text" 
                    readOnly={taxRegion !== 'Custom'}
                    value={taxRegion === 'Custom' ? currency : activeRegion.currencyLabel}
                    onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                    className={`w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl font-bold outline-none ${
                      taxRegion === 'Custom'
                        ? 'bg-slate-50 dark:bg-dark text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 cursor-not-allowed'
                    }`}
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
                <p className="text-xs text-slate-500 mt-1">Configure country tax slabs, invoice headers, and pharmacy tax registrations.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl flex gap-3 text-xs text-amber-800 dark:text-amber-400">
                  <AlertTriangle size={24} className="shrink-0" />
                  <div>
                    <span className="font-black block uppercase mb-1">{activeRegion.noticeTitle}</span>
                    <span>
                      {activeRegion.notice}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">Base {activeRegion.taxName} Rate (%)</label>
                    <select 
                      value={vatRate} 
                      onChange={(e) => setVatRate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-black"
                    >
                      {activeRegion.taxRates.map((rate) => (
                        <option key={rate.value} value={rate.value}>{rate.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 dark:text-gray-300 uppercase tracking-wider">{activeRegion.registrationLabel}</label>
                    <input 
                      type="text" 
                      value={taxRegistrationNumber} 
                      onChange={(e) => setTaxRegistrationNumber(e.target.value)}
                      placeholder="Enter Tax registration number..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-900 dark:text-white font-mono font-bold" 
                    />
                  </div>
                </div>

                {activeRegion.splitTax?.enabled && (
                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                    <p className="text-sm font-black text-slate-800 dark:text-white">{activeRegion.splitTax.labels.join(' / ')} Split Preview</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Billing can display {parseFloat(vatRate || 0) / 2}% {activeRegion.splitTax.labels[0]} and {parseFloat(vatRate || 0) / 2}% {activeRegion.splitTax.labels[1]} for an effective {vatRate}% {activeRegion.taxName}.
                    </p>
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
                  { name: 'Amster Med Care Dubai HQ', area: 'Downtown Dubai, Dubai, UAE', type: 'Physical Store & Distribution', code: 'BR-001' },
                  { name: 'Amster Care Sharjah', area: 'Al Majaz, Sharjah, UAE', type: 'Physical Pharmacy', code: 'BR-002' },
                  { name: 'Amster Care Dubai Marina Hub', area: 'Marina Heights, Marina Walk, Dubai, UAE', type: 'Fulfillment Warehouse', code: 'BR-003' },
                  { name: 'Amster Med Care Omassery', area: 'Omassery, Calicut, Kerala, India', type: 'India GST Branch', code: 'IN-001' }
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
