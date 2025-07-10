import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import AppRouter from './router/AppRouter';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <NotificationProvider>
            <AuthProvider>
              <DataProvider>
                <AppRouter />
              </DataProvider>
            </AuthProvider>
          </NotificationProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;