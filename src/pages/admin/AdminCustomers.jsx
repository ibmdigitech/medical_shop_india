import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, UserPlus, MoreVertical, Edit, 
  Trash2, Mail, Phone, MapPin, CheckCircle2, XCircle
} from 'lucide-react';

const initialCustomers = [
  { id: 'CUST-001', name: 'Rahul Krishnan', email: 'rahul.k@example.ae', phone: '+971 50 432 1001', location: 'Dubai Marina', orders: 12, totalSpent: 12500, status: 'Active' },
  { id: 'CUST-002', name: 'Aisha Mohammed', email: 'aisha.m@example.ae', phone: '+971 55 432 1002', location: 'Jumeirah', orders: 5, totalSpent: 4500, status: 'Active' },
  { id: 'CUST-003', name: 'John Doe', email: 'john.d@example.ae', phone: '+971 52 432 1003', location: 'Abu Dhabi', orders: 2, totalSpent: 1200, status: 'Inactive' },
  { id: 'CUST-004', name: 'Sneha Patel', email: 'sneha.p@example.ae', phone: '+971 56 432 1004', location: 'Sharjah', orders: 8, totalSpent: 8900, status: 'Active' },
  { id: 'CUST-005', name: 'Vishnu R', email: 'vishnu.r@example.ae', phone: '+971 54 432 1005', location: 'Ajman', orders: 0, totalSpent: 0, status: 'Blocked' },
];

export default function AdminCustomers() {
  const [customersList, setCustomersList] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active',
  });

  const resetCustomerForm = () => {
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'Active',
    });
    setFormError('');
  };

  const handleOpenAddModal = () => {
    resetCustomerForm();
    setIsAddModalOpen(true);
  };

  const handleSaveCustomer = () => {
    const name = customerForm.name.trim();
    const email = customerForm.email.trim();
    const phone = customerForm.phone.trim();
    const location = customerForm.location.trim();

    if (!name || !email || !phone) {
      setFormError('Full name, email, and phone number are required.');
      return;
    }

    const nextNumber = customersList.length + 1;
    const newCustomer = {
      id: `CUST-${String(nextNumber).padStart(3, '0')}`,
      name,
      email,
      phone,
      location: location || 'Not assigned',
      orders: 0,
      totalSpent: 0,
      status: customerForm.status,
    };

    setCustomersList([newCustomer, ...customersList]);
    setIsAddModalOpen(false);
    resetCustomerForm();
  };

  const handleDeleteCustomer = (customerId) => {
    if (confirm('Delete this customer profile from the ERP customer list?')) {
      setCustomersList(customersList.filter((customer) => customer.id !== customerId));
    }
  };

  const filteredCustomers = customersList.filter((customer) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query);
    const matchesStatus = selectedStatus === 'all' || customer.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Customers</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage your customer base and view their order history.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <UserPlus size={18} /> Add Customer
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Contact</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Location</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Orders</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Spent</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-gray-300 font-black">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{customer.name}</p>
                        <p className="text-xs text-slate-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-gray-400">
                      <div className="flex items-center gap-1"><Mail size={12}/> {customer.email}</div>
                      <div className="flex items-center gap-1"><Phone size={12}/> {customer.phone}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400">
                    <div className="flex items-center gap-1"><MapPin size={14}/> {customer.location}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-700 dark:text-gray-300">{customer.orders}</td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">AED {customer.totalSpent}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      customer.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      customer.status === 'Inactive' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {customer.status === 'Active' && <CheckCircle2 size={12} />}
                      {customer.status === 'Inactive' && <MoreVertical size={12} />}
                      {customer.status === 'Blocked' && <XCircle size={12} />}
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
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
      </div>

      {/* Add Customer Modal */}
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
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Add New Customer</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-bold">
                    {formError}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Email Address</label>
                  <input
                    type="email"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Location</label>
                    <input
                      type="text"
                      value={customerForm.location}
                      onChange={(e) => setCustomerForm({ ...customerForm, location: e.target.value })}
                      placeholder="Dubai Marina"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Status</label>
                    <select
                      value={customerForm.status}
                      onChange={(e) => setCustomerForm({ ...customerForm, status: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Blocked</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleSaveCustomer} className="w-full py-4 mt-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} /> Save Customer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
