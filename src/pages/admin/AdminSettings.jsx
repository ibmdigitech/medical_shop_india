import { useState } from 'react';
import { 
  Save, Store, MapPin, Phone, Mail, 
  CreditCard, Bell, Shield, Globe
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage store preferences, taxes, and integrations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 space-y-2">
          {[
            { id: 'general', label: 'General Info', icon: Store },
            { id: 'locations', label: 'Store Locations', icon: MapPin },
            { id: 'payment', label: 'Payment & Taxes', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security & Auth', icon: Shield },
            { id: 'seo', label: 'SEO & Social', icon: Globe },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-4">General Store Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Store Name</label>
                  <input type="text" defaultValue="Amster Med Care" className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Support Email</label>
                  <input type="email" defaultValue="info@amstermedcare.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Support Phone</label>
                  <input type="tel" defaultValue="+91 90375 07643" className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Currency</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white">
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Store Address (Head Office)</label>
                  <textarea rows="3" defaultValue="First Floor, ABC Complex, Near Bus Stand, Omassery, Calicut - 673582" className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'general' && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                <Store size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Settings Category</h3>
              <p className="text-slate-500 mt-2 max-w-sm">This section is currently under development. You will be able to configure these settings soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
