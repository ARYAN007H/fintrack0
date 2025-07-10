export interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'updates' | 'messages' | 'alerts' | 'system';
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  icon?: string;
}

export interface NotificationPreferences {
  categories: {
    updates: { push: boolean; email: boolean; muted: boolean };
    messages: { push: boolean; email: boolean; muted: boolean };
    alerts: { push: boolean; email: boolean; muted: boolean };
    system: { push: boolean; email: boolean; muted: boolean };
  };
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  sound: boolean;
  vibration: boolean;
  doNotDisturb: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export interface UserSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'other';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface BillingAddress {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}