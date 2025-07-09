export type LanguageCode = 'en' | 'es' | 'fr' | 'de';

export const supportedLanguages = [
  { code: 'en' as LanguageCode, name: 'English' },
  { code: 'es' as LanguageCode, name: 'Español' },
  { code: 'fr' as LanguageCode, name: 'Français' },
  { code: 'de' as LanguageCode, name: 'Deutsch' }
];

interface TranslationDictionary {
  [key: string]: string;
}

interface Translations {
  [language: string]: TranslationDictionary;
}

export const translations: Translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    transactions: 'Transactions',
    budgets: 'Budgets',
    reports: 'Reports',
    settings: 'Settings',
    
    // Dashboard
    totalBalance: 'Total Balance',
    income: 'Income',
    expenses: 'Expenses',
    monthlyBudget: 'Monthly Budget',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    
    // Accounts
    addAccount: 'Add Account',
    accountName: 'Account Name',
    accountType: 'Account Type',
    balance: 'Balance',
    currency: 'Currency',
    institution: 'Institution',
    lastFour: 'Last Four Digits',
    
    // Account Types
    checking: 'Checking',
    savings: 'Savings',
    credit: 'Credit Card',
    investment: 'Investment',
    cash: 'Cash',
    other: 'Other',
    
    // Transactions
    addTransaction: 'Add Transaction',
    date: 'Date',
    amount: 'Amount',
    description: 'Description',
    category: 'Category',
    account: 'Account',
    type: 'Type',
    notes: 'Notes',
    recurring: 'Recurring',
    
    // Transaction Types
    income: 'Income',
    expense: 'Expense',
    transfer: 'Transfer',
    
    // Budgets
    addBudget: 'Add Budget',
    budgetName: 'Budget Name',
    budgetAmount: 'Budget Amount',
    spent: 'Spent',
    remaining: 'Remaining',
    period: 'Period',
    startDate: 'Start Date',
    endDate: 'End Date',
    
    // Budget Periods
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    
    // Settings
    language: 'Language',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    currencySettings: 'Currency Settings',
    notifications: 'Notifications',
    exportData: 'Export Data',
    
    // Misc
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    thisYear: 'This Year',
    welcome: 'Welcome',
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
    noData: 'No data available',
    currencyConverter: 'Currency Converter',
    from: 'From',
    to: 'To',
    convert: 'Convert',
    converted: 'Converted Amount'
  },
  
  es: {
    // Navigation
    dashboard: 'Tablero',
    accounts: 'Cuentas',
    transactions: 'Transacciones',
    budgets: 'Presupuestos',
    reports: 'Informes',
    settings: 'Configuración',
    
    // Dashboard
    totalBalance: 'Balance Total',
    income: 'Ingresos',
    expenses: 'Gastos',
    monthlyBudget: 'Presupuesto Mensual',
    recentTransactions: 'Transacciones Recientes',
    viewAll: 'Ver Todo',
    
    // Accounts
    addAccount: 'Añadir Cuenta',
    accountName: 'Nombre de la Cuenta',
    accountType: 'Tipo de Cuenta',
    balance: 'Balance',
    currency: 'Moneda',
    institution: 'Institución',
    lastFour: 'Últimos Cuatro Dígitos',
    
    // Account Types
    checking: 'Cuenta Corriente',
    savings: 'Ahorros',
    credit: 'Tarjeta de Crédito',
    investment: 'Inversión',
    cash: 'Efectivo',
    other: 'Otro',
    
    // Transactions
    addTransaction: 'Añadir Transacción',
    date: 'Fecha',
    amount: 'Monto',
    description: 'Descripción',
    category: 'Categoría',
    account: 'Cuenta',
    type: 'Tipo',
    notes: 'Notas',
    recurring: 'Recurrente',
    
    // Transaction Types
    income: 'Ingreso',
    expense: 'Gasto',
    transfer: 'Transferencia',
    
    // Budgets
    addBudget: 'Añadir Presupuesto',
    budgetName: 'Nombre del Presupuesto',
    budgetAmount: 'Monto del Presupuesto',
    spent: 'Gastado',
    remaining: 'Restante',
    period: 'Período',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    
    // Budget Periods
    weekly: 'Semanal',
    monthly: 'Mensual',
    yearly: 'Anual',
    
    // Auth
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    name: 'Nombre',
    
    // Settings
    language: 'Idioma',
    theme: 'Tema',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Oscuro',
    currencySettings: 'Configuración de Moneda',
    notifications: 'Notificaciones',
    exportData: 'Exportar Datos',
    
    // Misc
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    search: 'Buscar',
    filter: 'Filtrar',
    today: 'Hoy',
    thisWeek: 'Esta Semana',
    thisMonth: 'Este Mes',
    thisYear: 'Este Año',
    welcome: 'Bienvenido',
    loading: 'Cargando',
    error: 'Error',
    success: 'Éxito',
    noData: 'No hay datos disponibles',
    currencyConverter: 'Conversor de Moneda',
    from: 'De',
    to: 'A',
    convert: 'Convertir',
    converted: 'Monto Convertido'
  },
  
  fr: {
    // Navigation
    dashboard: 'Tableau de Bord',
    accounts: 'Comptes',
    transactions: 'Transactions',
    budgets: 'Budgets',
    reports: 'Rapports',
    settings: 'Paramètres',
    
    // Dashboard
    totalBalance: 'Solde Total',
    income: 'Revenus',
    expenses: 'Dépenses',
    monthlyBudget: 'Budget Mensuel',
    recentTransactions: 'Transactions Récentes',
    viewAll: 'Voir Tout',
    
    // Accounts
    addAccount: 'Ajouter un Compte',
    accountName: 'Nom du Compte',
    accountType: 'Type de Compte',
    balance: 'Solde',
    currency: 'Devise',
    institution: 'Institution',
    lastFour: 'Quatre Derniers Chiffres',
    
    // Account Types
    checking: 'Compte Courant',
    savings: 'Épargne',
    credit: 'Carte de Crédit',
    investment: 'Investissement',
    cash: 'Espèces',
    other: 'Autre',
    
    // Transactions
    addTransaction: 'Ajouter une Transaction',
    date: 'Date',
    amount: 'Montant',
    description: 'Description',
    category: 'Catégorie',
    account: 'Compte',
    type: 'Type',
    notes: 'Notes',
    recurring: 'Récurrent',
    
    // Transaction Types
    income: 'Revenu',
    expense: 'Dépense',
    transfer: 'Transfert',
    
    // Budgets
    addBudget: 'Ajouter un Budget',
    budgetName: 'Nom du Budget',
    budgetAmount: 'Montant du Budget',
    spent: 'Dépensé',
    remaining: 'Restant',
    period: 'Période',
    startDate: 'Date de Début',
    endDate: 'Date de Fin',
    
    // Budget Periods
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    
    // Auth
    login: 'Connexion',
    register: 'S\'inscrire',
    logout: 'Déconnexion',
    email: 'Email',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    name: 'Nom',
    
    // Settings
    language: 'Langue',
    theme: 'Thème',
    lightMode: 'Mode Clair',
    darkMode: 'Mode Sombre',
    currencySettings: 'Paramètres de Devise',
    notifications: 'Notifications',
    exportData: 'Exporter les Données',
    
    // Misc
    save: 'Sauvegarder',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Éditer',
    search: 'Rechercher',
    filter: 'Filtrer',
    today: 'Aujourd\'hui',
    thisWeek: 'Cette Semaine',
    thisMonth: 'Ce Mois',
    thisYear: 'Cette Année',
    welcome: 'Bienvenue',
    loading: 'Chargement',
    error: 'Erreur',
    success: 'Succès',
    noData: 'Aucune donnée disponible',
    currencyConverter: 'Convertisseur de Devises',
    from: 'De',
    to: 'À',
    convert: 'Convertir',
    converted: 'Montant Converti'
  },
  
  de: {
    // Navigation
    dashboard: 'Dashboard',
    accounts: 'Konten',
    transactions: 'Transaktionen',
    budgets: 'Budgets',
    reports: 'Berichte',
    settings: 'Einstellungen',
    
    // Dashboard
    totalBalance: 'Gesamtsaldo',
    income: 'Einkommen',
    expenses: 'Ausgaben',
    monthlyBudget: 'Monatliches Budget',
    recentTransactions: 'Neueste Transaktionen',
    viewAll: 'Alle Anzeigen',
    
    // Accounts
    addAccount: 'Konto Hinzufügen',
    accountName: 'Kontoname',
    accountType: 'Kontotyp',
    balance: 'Saldo',
    currency: 'Währung',
    institution: 'Institution',
    lastFour: 'Letzte Vier Ziffern',
    
    // Account Types
    checking: 'Girokonto',
    savings: 'Sparkonto',
    credit: 'Kreditkarte',
    investment: 'Investition',
    cash: 'Bargeld',
    other: 'Andere',
    
    // Transactions
    addTransaction: 'Transaktion Hinzufügen',
    date: 'Datum',
    amount: 'Betrag',
    description: 'Beschreibung',
    category: 'Kategorie',
    account: 'Konto',
    type: 'Typ',
    notes: 'Notizen',
    recurring: 'Wiederkehrend',
    
    // Transaction Types
    income: 'Einkommen',
    expense: 'Ausgabe',
    transfer: 'Überweisung',
    
    // Budgets
    addBudget: 'Budget Hinzufügen',
    budgetName: 'Budgetname',
    budgetAmount: 'Budgetbetrag',
    spent: 'Ausgegeben',
    remaining: 'Verbleibend',
    period: 'Zeitraum',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    
    // Budget Periods
    weekly: 'Wöchentlich',
    monthly: 'Monatlich',
    yearly: 'Jährlich',
    
    // Auth
    login: 'Anmelden',
    register: 'Registrieren',
    logout: 'Abmelden',
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort Bestätigen',
    name: 'Name',
    
    // Settings
    language: 'Sprache',
    theme: 'Thema',
    lightMode: 'Heller Modus',
    darkMode: 'Dunkler Modus',
    currencySettings: 'Währungseinstellungen',
    notifications: 'Benachrichtigungen',
    exportData: 'Daten Exportieren',
    
    // Misc
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    search: 'Suchen',
    filter: 'Filtern',
    today: 'Heute',
    thisWeek: 'Diese Woche',
    thisMonth: 'Dieser Monat',
    thisYear: 'Dieses Jahr',
    welcome: 'Willkommen',
    loading: 'Laden',
    error: 'Fehler',
    success: 'Erfolg',
    noData: 'Keine Daten verfügbar',
    currencyConverter: 'Währungsrechner',
    from: 'Von',
    to: 'Nach',
    convert: 'Umrechnen',
    converted: 'Umgerechneter Betrag'
  }
};