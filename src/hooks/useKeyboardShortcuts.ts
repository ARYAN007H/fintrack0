import { useEffect, useCallback, useRef } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  description?: string;
}

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  target?: HTMLElement | Document;
}

/**
 * Hook for managing keyboard shortcuts
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  options: UseKeyboardShortcutsOptions = {}
) {
  const { enabled = true, target = document } = options;
  const shortcutsRef = useRef(shortcuts);

  // Update shortcuts ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const activeShortcuts = shortcutsRef.current;

    for (const shortcut of activeShortcuts) {
      const {
        key,
        ctrlKey = false,
        metaKey = false,
        shiftKey = false,
        altKey = false,
        callback,
        preventDefault = true,
      } = shortcut;

      // Check if the key combination matches
      const keyMatches = event.key.toLowerCase() === key.toLowerCase();
      const ctrlMatches = event.ctrlKey === ctrlKey;
      const metaMatches = event.metaKey === metaKey;
      const shiftMatches = event.shiftKey === shiftKey;
      const altMatches = event.altKey === altKey;

      if (keyMatches && ctrlMatches && metaMatches && shiftMatches && altMatches) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
        break; // Only execute the first matching shortcut
      }
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const targetElement = target as HTMLElement | Document;
    targetElement.addEventListener('keydown', handleKeyDown);

    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled, target]);

  return {
    shortcuts: shortcutsRef.current,
  };
}

/**
 * Hook for common application shortcuts
 */
export function useAppShortcuts(callbacks: {
  onSave?: () => void;
  onNew?: () => void;
  onSearch?: () => void;
  onClose?: () => void;
  onRefresh?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onSelectAll?: () => void;
}) {
  const shortcuts: KeyboardShortcut[] = [
    // Save
    ...(callbacks.onSave
      ? [
          {
            key: 's',
            ctrlKey: true,
            callback: callbacks.onSave,
            description: 'Save',
          },
          {
            key: 's',
            metaKey: true,
            callback: callbacks.onSave,
            description: 'Save (Mac)',
          },
        ]
      : []),

    // New
    ...(callbacks.onNew
      ? [
          {
            key: 'n',
            ctrlKey: true,
            callback: callbacks.onNew,
            description: 'New',
          },
          {
            key: 'n',
            metaKey: true,
            callback: callbacks.onNew,
            description: 'New (Mac)',
          },
        ]
      : []),

    // Search
    ...(callbacks.onSearch
      ? [
          {
            key: 'f',
            ctrlKey: true,
            callback: callbacks.onSearch,
            description: 'Search',
          },
          {
            key: 'f',
            metaKey: true,
            callback: callbacks.onSearch,
            description: 'Search (Mac)',
          },
          {
            key: 'k',
            ctrlKey: true,
            callback: callbacks.onSearch,
            description: 'Quick search',
          },
          {
            key: 'k',
            metaKey: true,
            callback: callbacks.onSearch,
            description: 'Quick search (Mac)',
          },
        ]
      : []),

    // Close
    ...(callbacks.onClose
      ? [
          {
            key: 'Escape',
            callback: callbacks.onClose,
            description: 'Close/Cancel',
          },
        ]
      : []),

    // Refresh
    ...(callbacks.onRefresh
      ? [
          {
            key: 'F5',
            callback: callbacks.onRefresh,
            description: 'Refresh',
          },
          {
            key: 'r',
            ctrlKey: true,
            callback: callbacks.onRefresh,
            description: 'Refresh',
          },
          {
            key: 'r',
            metaKey: true,
            callback: callbacks.onRefresh,
            description: 'Refresh (Mac)',
          },
        ]
      : []),

    // Undo
    ...(callbacks.onUndo
      ? [
          {
            key: 'z',
            ctrlKey: true,
            callback: callbacks.onUndo,
            description: 'Undo',
          },
          {
            key: 'z',
            metaKey: true,
            callback: callbacks.onUndo,
            description: 'Undo (Mac)',
          },
        ]
      : []),

    // Redo
    ...(callbacks.onRedo
      ? [
          {
            key: 'y',
            ctrlKey: true,
            callback: callbacks.onRedo,
            description: 'Redo',
          },
          {
            key: 'z',
            ctrlKey: true,
            shiftKey: true,
            callback: callbacks.onRedo,
            description: 'Redo',
          },
          {
            key: 'z',
            metaKey: true,
            shiftKey: true,
            callback: callbacks.onRedo,
            description: 'Redo (Mac)',
          },
        ]
      : []),

    // Copy
    ...(callbacks.onCopy
      ? [
          {
            key: 'c',
            ctrlKey: true,
            callback: callbacks.onCopy,
            description: 'Copy',
          },
          {
            key: 'c',
            metaKey: true,
            callback: callbacks.onCopy,
            description: 'Copy (Mac)',
          },
        ]
      : []),

    // Paste
    ...(callbacks.onPaste
      ? [
          {
            key: 'v',
            ctrlKey: true,
            callback: callbacks.onPaste,
            description: 'Paste',
          },
          {
            key: 'v',
            metaKey: true,
            callback: callbacks.onPaste,
            description: 'Paste (Mac)',
          },
        ]
      : []),

    // Select All
    ...(callbacks.onSelectAll
      ? [
          {
            key: 'a',
            ctrlKey: true,
            callback: callbacks.onSelectAll,
            description: 'Select All',
          },
          {
            key: 'a',
            metaKey: true,
            callback: callbacks.onSelectAll,
            description: 'Select All (Mac)',
          },
        ]
      : []),
  ];

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
}

/**
 * Hook for navigation shortcuts
 */
export function useNavigationShortcuts(onNavigate: (route: string) => void) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: '1',
      altKey: true,
      callback: () => onNavigate('dashboard'),
      description: 'Go to Dashboard',
    },
    {
      key: '2',
      altKey: true,
      callback: () => onNavigate('accounts'),
      description: 'Go to Accounts',
    },
    {
      key: '3',
      altKey: true,
      callback: () => onNavigate('transactions'),
      description: 'Go to Transactions',
    },
    {
      key: '4',
      altKey: true,
      callback: () => onNavigate('budgets'),
      description: 'Go to Budgets',
    },
    {
      key: '5',
      altKey: true,
      callback: () => onNavigate('reports'),
      description: 'Go to Reports',
    },
    {
      key: '6',
      altKey: true,
      callback: () => onNavigate('settings'),
      description: 'Go to Settings',
    },
  ];

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
}

export default useKeyboardShortcuts;