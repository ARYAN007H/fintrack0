import React, { createContext, useState, useContext, useEffect } from 'react';
import type { Notification, NotificationPreferences } from '../types/navigationTypes';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  getNotificationsByCategory: (category: string) => Notification[];
  getCategoryCount: (category: string) => number;
}

const defaultPreferences: NotificationPreferences = {
  categories: {
    updates: { push: true, email: true, muted: false },
    messages: { push: true, email: false, muted: false },
    alerts: { push: true, email: true, muted: false },
    system: { push: false, email: true, muted: false },
  },
  frequency: 'immediate',
  sound: true,
  vibration: true,
  doNotDisturb: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  },
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Budget Alert',
    message: 'You have exceeded 85% of your Food & Dining budget for this month.',
    category: 'alerts',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'New Feature Available',
    message: 'Check out our new investment tracking feature in the dashboard.',
    category: 'updates',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: false,
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Transaction Added',
    message: 'Your transaction for $45.99 at Grocery Store has been recorded.',
    category: 'updates',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    isRead: true,
    priority: 'low',
  },
  {
    id: '4',
    title: 'Security Alert',
    message: 'New login detected from Chrome on Windows. Was this you?',
    category: 'alerts',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    isRead: false,
    priority: 'high',
  },
  {
    id: '5',
    title: 'Monthly Report Ready',
    message: 'Your financial report for this month is now available.',
    category: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
    priority: 'medium',
  },
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    const saved = localStorage.getItem('notificationPreferences');
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show browser notification if enabled and permission granted
    if (preferences.categories[notification.category].push && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
        });
      }
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const getNotificationsByCategory = (category: string) => {
    return notifications.filter(n => n.category === category);
  };

  const getCategoryCount = (category: string) => {
    return notifications.filter(n => n.category === category && !n.isRead).length;
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      preferences,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      updatePreferences,
      getNotificationsByCategory,
      getCategoryCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};