import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminCustomers from '../pages/admin/AdminCustomers';
import AdminSalesReports from '../pages/admin/AdminSalesReports';
import AdminStockAudit from '../pages/admin/AdminStockAudit';
import AdminPrescriptions from '../pages/admin/AdminPrescriptions';
import AdminDelivery from '../pages/admin/AdminDelivery';
import AdminOffers from '../pages/admin/AdminOffers';
import AdminSettings from '../pages/admin/AdminSettings';
import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';

import HomePage from '../pages/HomePage';
import MedicinesPage from '../pages/MedicinesPage';
import CartPage from '../pages/CartPage';
import UploadPrescriptionPage from '../pages/UploadPrescriptionPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import BlogPage from '../pages/BlogPage';
import FranchisePage from '../pages/FranchisePage';
import LabTestsPage from '../pages/LabTestsPage';
import CompareMedicinesPage from '../pages/CompareMedicinesPage';
import StoreLocatorPage from '../pages/StoreLocatorPage';
import VeterinaryPage from '../pages/VeterinaryPage';
import BabyProductsPage from '../pages/BabyProductsPage';
import CosmeticsPage from '../pages/CosmeticsPage';
import SurgicalsPage from '../pages/SurgicalsPage';
import CovidSuppliesPage from '../pages/CovidSuppliesPage';
import AyurvedicPage from '../pages/AyurvedicPage';
import GenericMedicinesPage from '../pages/GenericMedicinesPage';

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
            {/* Add more admin routes here in the future */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
