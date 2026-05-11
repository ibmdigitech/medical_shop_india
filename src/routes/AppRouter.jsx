import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = lazy(() => import('../pages/HomePage'));
const MedicinesPage = lazy(() => import('../pages/MedicinesPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));

// Placeholder components for medical specific pages
const LabTestsPage = () => <div className="pt-32 text-center text-white">Lab Tests Page (Coming Soon)</div>;
const WellnessPage = () => <div className="pt-32 text-center text-white">Wellness Page (Coming Soon)</div>;
const StoreLocatorPage = () => <div className="pt-32 text-center text-white">Store Locator Page (Coming Soon)</div>;
const UploadPrescriptionPage = lazy(() => import('../pages/UploadPrescriptionPage'));
const CartPage = lazy(() => import('../pages/CartPage'));

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
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/stores" element={<StoreLocatorPage />} />
          <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
