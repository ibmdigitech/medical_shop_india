import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';

const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const AdminCustomers = lazy(() => import('../pages/admin/AdminCustomers'));
const AdminSalesReports = lazy(() => import('../pages/admin/AdminSalesReports'));
const AdminStockAudit = lazy(() => import('../pages/admin/AdminStockAudit'));
const AdminPrescriptions = lazy(() => import('../pages/admin/AdminPrescriptions'));
const AdminDelivery = lazy(() => import('../pages/admin/AdminDelivery'));
const AdminOffers = lazy(() => import('../pages/admin/AdminOffers'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));
const AdminLogout = lazy(() => import('../pages/admin/AdminLogout'));

const HomePage = lazy(() => import('../pages/HomePage'));
const MedicinesPage = lazy(() => import('../pages/MedicinesPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const UploadPrescriptionPage = lazy(() => import('../pages/UploadPrescriptionPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const FranchisePage = lazy(() => import('../pages/FranchisePage'));
const LabTestsPage = lazy(() => import('../pages/LabTestsPage'));
const CompareMedicinesPage = lazy(() => import('../pages/CompareMedicinesPage'));
const StoreLocatorPage = lazy(() => import('../pages/StoreLocatorPage'));
const VeterinaryPage = lazy(() => import('../pages/VeterinaryPage'));
const BabyProductsPage = lazy(() => import('../pages/BabyProductsPage'));
const CosmeticsPage = lazy(() => import('../pages/CosmeticsPage'));
const SurgicalsPage = lazy(() => import('../pages/SurgicalsPage'));
const CovidSuppliesPage = lazy(() => import('../pages/CovidSuppliesPage'));
const AyurvedicPage = lazy(() => import('../pages/AyurvedicPage'));
const GenericMedicinesPage = lazy(() => import('../pages/GenericMedicinesPage'));

const WellnessPage = () => <div className="pt-32 text-center text-white">Wellness Page (Coming Soon)</div>;

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className="text-8xl font-black text-white/10 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/lab-tests" element={<LabTestsPage />} />
          <Route path="/compare-medicines" element={<CompareMedicinesPage />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/stores" element={<StoreLocatorPage />} />
          <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          
          {/* New Category Routes */}
          <Route path="/veterinary" element={<VeterinaryPage />} />
          <Route path="/baby-products" element={<BabyProductsPage />} />
          <Route path="/cosmetics" element={<CosmeticsPage />} />
          <Route path="/surgicals" element={<SurgicalsPage />} />
          <Route path="/covid-supplies" element={<CovidSuppliesPage />} />
          <Route path="/ayurvedic-products" element={<AyurvedicPage />} />
          <Route path="/generic-medicines" element={<GenericMedicinesPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Login (Public) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/logout" element={<AdminLogout />} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="sales-reports" element={<AdminSalesReports />} />
            <Route path="stock-audit" element={<AdminStockAudit />} />
            <Route path="prescriptions" element={<AdminPrescriptions />} />
            <Route path="delivery" element={<AdminDelivery />} />
            <Route path="offers" element={<AdminOffers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="logout" element={<AdminLogout />} />
            {/* Add more admin routes here in the future */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
