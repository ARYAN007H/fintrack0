import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus, Chrome } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface RegisterPageProps {
  onNavigate: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { register, signInWithGoogle } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      // This validation error should still be shown locally
      return;
    }
    
    if (password.length < 6) {
      // This validation error should still be shown locally
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, password);
    } catch (err: any) {
      // Error is now handled by toast in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
    } catch (err: any) {
      // Error is now handled by toast in AuthContext
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <UserPlus size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('create an account')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('register to start managing your finances')}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {(error || (password !== confirmPassword && confirmPassword) || (password.length > 0 && password.length < 6)) && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {password !== confirmPassword && confirmPassword ? 'Passwords do not match' :
                 password.length > 0 && password.length < 6 ? 'Password must be at least 6 characters long' :
                 error}
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Chrome size={20} className="text-red-500" />
                )}
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Continue with Google
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or register with email
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('name')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('your name')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('i agree to the')} <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">{t('terms')}</a> {t('and')} <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">{t('privacy policy')}</a>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:hover:bg-purple-600"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" className="text-white" />
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>{t('register')}</span>
                  </>
                )}
              </button>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('already have an account')}?{' '}
                  <button
                    type="button"
                    onClick={onNavigate}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                  >
                    {t('login')}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; 2025 FinTrack. {t('all rights reserved')}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;