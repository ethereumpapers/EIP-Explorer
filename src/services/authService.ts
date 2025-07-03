interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private listeners: ((state: AuthState) => void)[] = [];
  private currentState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };

  constructor() {
    // Check for existing session on initialization
    this.checkExistingSession();
  }

  private checkExistingSession() {
    const savedUser = localStorage.getItem('eip_explorer_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.currentState = {
          user,
          isAuthenticated: true,
          isLoading: false
        };
        this.notifyListeners();
      } catch (error) {
        localStorage.removeItem('eip_explorer_user');
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentState));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    // Immediately call with current state
    listener(this.currentState);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): AuthState {
    return this.currentState;
  }

  async signUp(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    this.currentState.isLoading = true;
    this.notifyListeners();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('eip_explorer_users') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (in production, this would be a real API)
      existingUsers.push({ ...newUser, password }); // Don't store password in real app
      localStorage.setItem('eip_explorer_users', JSON.stringify(existingUsers));
      localStorage.setItem('eip_explorer_user', JSON.stringify(newUser));

      this.currentState = {
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      };

      this.notifyListeners();
      return { success: true };
    } catch (error) {
      this.currentState.isLoading = false;
      this.notifyListeners();
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign up failed' 
      };
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.currentState.isLoading = true;
    this.notifyListeners();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const existingUsers = JSON.parse(localStorage.getItem('eip_explorer_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('eip_explorer_user', JSON.stringify(userWithoutPassword));

      this.currentState = {
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false
      };

      this.notifyListeners();
      return { success: true };
    } catch (error) {
      this.currentState.isLoading = false;
      this.notifyListeners();
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign in failed' 
      };
    }
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('eip_explorer_user');
    this.currentState = {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
    this.notifyListeners();
  }

  async updateProfile(updates: { name?: string; bio?: string; avatar?: string }): Promise<{ success: boolean; error?: string }> {
    if (!this.currentState.user) {
      return { success: false, error: 'Not authenticated' };
    }
    try {
      const user = { ...this.currentState.user, ...updates };
      // Update user in users list
      const users = JSON.parse(localStorage.getItem('eip_explorer_users') || '[]');
      const idx = users.findIndex((u: any) => u.email === user.email);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        localStorage.setItem('eip_explorer_users', JSON.stringify(users));
      }
      // Update current user
      localStorage.setItem('eip_explorer_user', JSON.stringify(user));
      this.currentState.user = user;
      this.notifyListeners();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update profile' };
    }
  }
}

export const authService = new AuthService();
export type { User, AuthState };