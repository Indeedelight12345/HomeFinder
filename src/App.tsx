import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AgentsPage } from './pages/AgentsPage';
import { ListPropertyPage } from './pages/ListPropertyPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute.name, (currentRoute as any).propertyId, (currentRoute as any).agentId]);

  const renderCurrentPage = () => {
    switch (currentRoute.name) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage initialFilters={currentRoute.initialFilters} />;
      case 'details':
        return <PropertyDetailsPage propertyId={currentRoute.propertyId} />;
      case 'favorites':
        return <FavoritesPage />;
      case 'agents':
        return <AgentsPage selectedAgentId={currentRoute.agentId} />;
      case 'list-property':
        return <ListPropertyPage />;
      case 'user-dashboard':
        return <UserDashboardPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
