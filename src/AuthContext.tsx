import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocFromServer } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Ensure user exists in Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            activeGoal: 'Ganar Masa Muscular',
            streak: 0,
            level: 'Bronce',
            createdAt: new Date().toISOString()
          });
        }
      }
      setUser(user);
      setLoading(false);
    });

    // Test connection
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    return unsubscribe;
  }, []);

  const signIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Error signing in:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('La ventana de inicio de sesión se cerró antes de completar el proceso.');
      } else if (error.code === 'auth/user-cancelled') {
        setAuthError('El acceso fue denegado o el proceso fue cancelado.');
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError('El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes.');
      } else {
        setAuthError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, signIn, authError } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="font-headline text-5xl font-black text-primary mb-8">FitNova Pro</div>
        
        {authError && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm font-medium max-w-md text-center animate-in fade-in slide-in-from-top-2">
            {authError}
          </div>
        )}

        <button
          onClick={signIn}
          className="bg-primary-container text-black px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(218,249,0,0.2)]"
        >
          <img src="https://www.gstatic.com/firebase/birdhouse/images/google-logo.png" className="w-6 h-6" alt="Google" />
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
