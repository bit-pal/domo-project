export interface JwtPayload {
  user_id: string;
  boss_id: string;
  base_id: string;
  exp: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  publicKey: string | null;
  connected: boolean;
  connecting: boolean;
  logout: () => Promise<void>;
} 