import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={onNavigate} 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Header 
            title={t(currentPage)} 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          />
          
          <main className="flex-1 p-4 md:p-6 transition-all ease-in-out duration-300">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;