import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  CreditCard, 
  MapPin, 
  Bell, 
  Download,
  Smartphone,
  Monitor,
  Globe,
  Crown,
  Star,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserSession, PaymentMethod, BillingAddress } from '../../types/navigationTypes';

const AccountDropdown: React.FC = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing' | 'sessions'>('profile');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock data - in a real app, this would come from your backend
  const userSessions: UserSession[] = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, US',
      lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      isCurrent: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, US',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isCurrent: false,
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: 'bank',
      last4: '1234',
      isDefault: false,
    },
  ];

  const billingAddresses: BillingAddress[] = [
    {
      id: '1',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      isDefault: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Active now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <Smartphone size={16} className="text-gray-500" />;
    }
    return <Monitor size={16} className="text-gray-500" />;
  };

  const tabs = [
    { id: 'profile', label: t('profile'), icon: <User size={16} /> },
    { id: 'security', label: t('security'), icon: <Shield size={16} /> },
    { id: 'billing', label: t('billing'), icon: <CreditCard size={16} /> },
    { id: 'sessions', label: t('sessions'), icon: <Globe size={16} /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-medium">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {user?.name}
          </p>
          <div className="flex items-center gap-1">
            <Crown size={12} className="text-yellow-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Pro Member</span>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {user?.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.email}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Crown size={12} className="text-yellow-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Pro Member</span>
                  <Star size={12} className="text-yellow-500 ml-1" />
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mt-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('editProfile')}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('accountSettings')}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('preferences')}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('notifications')}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('changePassword')}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('twoFactorAuth')}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('notEnabled')}
                    </p>
                  </div>
                  <button className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                    {t('enable')}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('loginHistory')}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('connectedAccounts')}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('paymentMethods')}
                  </h4>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {method.type === 'card' ? `${method.brand} ••••${method.last4}` : `Bank ••••${method.last4}`}
                          </span>
                          {method.isDefault && (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                              {t('default')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('billingAddress')}
                  </h4>
                  {billingAddresses.map((address) => (
                    <div key={address.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {address.name}
                        </span>
                        {address.isDefault && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                            {t('default')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                        {address.street}, {address.city}, {address.state} {address.zipCode}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('subscriptionManagement')}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('activeSessions')}
                </h4>
                <div className="space-y-3">
                  {userSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getDeviceIcon(session.device)}
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {session.device}
                            {session.isCurrent && (
                              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded">
                                {t('current')}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {session.location} • {formatLastActive(session.lastActive)}
                          </p>
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <button className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                          {t('revoke')}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Download size={16} />
              <span>{t('exportData')}</span>
            </button>
            
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;