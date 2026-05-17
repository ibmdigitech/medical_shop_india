import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Tag, Calendar, CheckCircle2, 
  XCircle, Edit, Trash2, Percent
} from 'lucide-react';
import { getTaxProfile } from '../../services/taxProfiles';

const offers = [
  { id: 'OFF-001', code: 'WELCOME25', title: 'New User Discount', type: 'Percentage', value: '25%', minOrder: 49, validUntil: '2026-12-31', status: 'Active' },
  { id: 'OFF-002', code: 'FREEDEL', title: 'Free Delivery', type: 'Shipping', value: 'Free', minOrder: 99, validUntil: '2026-06-30', status: 'Active' },
  { id: 'OFF-003', code: 'SUMMER10', title: 'Summer Special', type: 'Percentage', value: '10%', minOrder: 149, validUntil: '2026-08-31', status: 'Active' },
  { id: 'OFF-004', code: 'FLAT500', title: 'Flat Discount', type: 'Fixed', value: 50, minOrder: 500, validUntil: '2026-05-01', status: 'Expired' },
];

export default function AdminOffers() {
  const [offersList, setOffersList] = useState(offers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currency, setCurrency] = useState('AED');
  const [offerForm, setOfferForm] = useState({
    code: '',
    value: '',
    title: '',
    minOrder: '',
    validUntil: '',
  });

  useEffect(() => {
    const profile = getTaxProfile(localStorage.getItem('erpTaxRegion') || 'United Arab Emirates');
    setCurrency(localStorage.getItem('erpCurrency') || profile.currency);
  }, []);

  const formatMoney = (value) => `${currency} ${value}`;

  const resetOfferForm = () => {
    setOfferForm({
      code: '',
      value: '',
      title: '',
      minOrder: '',
      validUntil: '',
    });
  };

  const handleCreateOffer = () => {
    const nextOffer = {
      id: `OFF-${String(offersList.length + 1).padStart(3, '0')}`,
      code: offerForm.code.trim().toUpperCase() || 'NEWOFFER',
      title: offerForm.title.trim() || 'New Promotional Offer',
      type: offerForm.value.includes('%') ? 'Percentage' : 'Fixed',
      value: offerForm.value.trim() || '10%',
      minOrder: Number(offerForm.minOrder || 0),
      validUntil: offerForm.validUntil || '2026-12-31',
      status: 'Active',
    };

    setOffersList([nextOffer, ...offersList]);
    resetOfferForm();
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Offers & Coupons</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage discount codes and promotional campaigns.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Create Offer
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center">
            <Tag size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Active Offers</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">3</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center">
            <Percent size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Coupons Redeemed</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">1,420</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Expiring Soon</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">1</p>
          </div>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Coupon Code</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Title / Type</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Value</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Min. Order</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Valid Until</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {offersList.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-black rounded-lg border border-slate-200 dark:border-white/10 tracking-widest">
                      {offer.code}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{offer.title}</p>
                    <p className="text-xs text-slate-500">{offer.type}</p>
                  </td>
                  <td className="p-4 font-black text-primary">{typeof offer.value === 'number' ? formatMoney(offer.value) : offer.value}</td>
                  <td className="p-4 font-bold text-slate-700 dark:text-gray-300">{formatMoney(offer.minOrder)}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400">{offer.validUntil}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      offer.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {offer.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {offer.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Offer Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl z-50 border border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Create New Offer</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Coupon Code</label>
                    <input
                      type="text"
                      value={offerForm.code}
                      onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value })}
                      placeholder="e.g. SUMMER20"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Discount Value</label>
                    <input
                      type="text"
                      value={offerForm.value}
                      onChange={(e) => setOfferForm({ ...offerForm, value: e.target.value })}
                      placeholder="e.g. 20%"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Offer Title</label>
                  <input
                    type="text"
                    value={offerForm.title}
                    onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    placeholder="e.g. Summer Special Discount"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Minimum Order ({currency})</label>
                    <input
                      type="number"
                      value={offerForm.minOrder}
                      onChange={(e) => setOfferForm({ ...offerForm, minOrder: e.target.value })}
                      placeholder="500"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Valid Until</label>
                    <input
                      type="date"
                      value={offerForm.validUntil}
                      onChange={(e) => setOfferForm({ ...offerForm, validUntil: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <button onClick={handleCreateOffer} className="w-full py-4 mt-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} /> Save Offer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
