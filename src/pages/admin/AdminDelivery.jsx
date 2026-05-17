import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MapPin, Truck, 
  CheckCircle2, Clock, Map, Phone, XCircle
} from 'lucide-react';

const deliveries = [
  { id: 'DEL-8902', orderId: 'ORD-9024', agent: 'Suresh Kumar', destination: 'Dubai Marina, Dubai', status: 'Out for Delivery', eta: '30 mins', phone: '+971 50 111 1101' },
  { id: 'DEL-8901', orderId: 'ORD-9023', agent: 'Unassigned', destination: 'Al Barsha, Dubai', status: 'Pending Dispatch', eta: '-', phone: '-' },
  { id: 'DEL-8900', orderId: 'ORD-9020', agent: 'Ramesh V', destination: 'Business Bay, Dubai', status: 'Delivered', eta: 'Delivered at 2:00 PM', phone: '+971 55 222 2202' },
  { id: 'DEL-8899', orderId: 'ORD-9018', agent: 'Suresh Kumar', destination: 'Al Nahda, Dubai', status: 'Delivered', eta: 'Delivered at 12:30 PM', phone: '+971 50 111 1101' },
  { id: 'DEL-8898', orderId: 'ORD-9015', agent: 'Unassigned', destination: 'Al Majaz, Sharjah', status: 'Delayed', eta: 'Rescheduled', phone: '-' },
];

export default function AdminDelivery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Delivery Management</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Track delivery agents and active shipments.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMapModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <Map size={18} /> Live Map View
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 flex items-center justify-center">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Active Agents</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">12 / 15</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Out for Delivery</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">24</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Delivered Today</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">142</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Tracking ID, Agent..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold">
            <option value="all">All Deliveries</option>
            <option value="pending">Pending Dispatch</option>
            <option value="active">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Tracking Info</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Delivery Agent</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Destination</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status / ETA</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <p className="font-black text-primary">{delivery.id}</p>
                    <p className="text-xs font-bold text-slate-500">Ref: {delivery.orderId}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{delivery.agent}</p>
                    {delivery.phone !== '-' && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone size={10} /> {delivery.phone}
                      </p>
                    )}
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400">
                    <div className="flex items-center gap-1"><MapPin size={14} className="text-rose-500"/> {delivery.destination}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider mb-1 ${
                      delivery.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      delivery.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                      delivery.status === 'Delayed' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    }`}>
                      {delivery.status}
                    </span>
                    <p className="text-xs font-bold text-slate-500">{delivery.eta}</p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {delivery.agent === 'Unassigned' ? (
                        <button 
                          onClick={() => {
                            setSelectedDelivery(delivery);
                            setIsAssignModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-lg shadow-md shadow-primary/20 transition-all"
                        >
                          Assign Agent
                        </button>
                      ) : (
                        <button className="px-3 py-1.5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 font-bold text-xs rounded-lg transition-colors">
                          Update
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Agent Modal */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssignModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl z-50 border border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Assign Delivery Agent</h3>
                <button onClick={() => setIsAssignModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 mb-4">
                  <p className="text-sm text-slate-500 font-bold mb-1">Delivery Tracking ID</p>
                  <p className="text-lg font-black text-primary">{selectedDelivery?.id}</p>
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-gray-400 mt-2">
                    <MapPin size={14} className="text-rose-500"/> {selectedDelivery?.destination}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Select Available Agent</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-bold">
                    <option value="">Choose an agent...</option>
                    <option value="suresh">Suresh Kumar (Available)</option>
                    <option value="ramesh">Ramesh V (Available)</option>
                    <option value="akhil">Akhil T (Available)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Estimated Delivery Time</label>
                  <input type="text" placeholder="e.g., 45 mins" className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                </div>
                <button onClick={() => setIsAssignModalOpen(false)} className="w-full py-4 mt-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} /> Confirm Assignment
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Live Map Modal */}
      <AnimatePresence>
        {isMapModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMapModalOpen(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[80vh] bg-white dark:bg-dark-card rounded-[32px] p-2 shadow-2xl z-50 border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 dark:border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Map size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Live Fleet Tracking</h3>
                    <p className="text-xs font-bold text-slate-500">24 active agents across Dubai and Sharjah</p>
                  </div>
                </div>
                <button onClick={() => setIsMapModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-50 dark:bg-white/5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="flex-1 relative w-full h-full bg-slate-100 dark:bg-slate-800 rounded-[24px] overflow-hidden m-2">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format')] bg-cover bg-center opacity-60 mix-blend-luminosity dark:mix-blend-overlay"></div>
                
                {/* Fake GPS Markers */}
                <div className="absolute top-1/4 left-1/3 flex flex-col items-center animate-bounce">
                  <div className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-lg mb-1">Suresh</div>
                  <div className="w-4 h-4 bg-primary border-2 border-white rounded-full shadow-xl"></div>
                </div>
                
                <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
                  <div className="bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg mb-1">Delayed</div>
                  <div className="w-4 h-4 bg-rose-500 border-2 border-white rounded-full shadow-xl"></div>
                </div>
                
                <div className="absolute bottom-1/3 left-1/2 flex flex-col items-center">
                  <div className="bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg mb-1">Ramesh</div>
                  <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-xl"></div>
                </div>
                
                {/* Overlay controls */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                  <button className="w-12 h-12 bg-white dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 transition-colors font-black text-xl">
                    +
                  </button>
                  <button className="w-12 h-12 bg-white dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl shadow-lg flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 transition-colors font-black text-xl">
                    -
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
