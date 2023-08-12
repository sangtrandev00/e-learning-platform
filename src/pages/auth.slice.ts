import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { UserRole } from '../types/user.type';

interface AuthState {
  userId: string;
  adminId: string;
  isAuth: boolean;
  isAdminAuth: boolean;
  token: string | null;
  adminToken: string | null;
  isOpenAuthModal: boolean;
  adminRole: UserRole | null;
}

const initialState: AuthState = {
  userId: '',
  adminId: '',
  isAuth: false,
  isAdminAuth: false,
  token: null,
  adminToken: null,
  isOpenAuthModal: false,
  adminRole: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkUserCredentials: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuth = true;
    },
    setAuthenticated(state, action: PayloadAction<string>) {
      state.isAuth = true;
      state.token = action.payload;
      const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(action.payload);
      state.userId = decodedToken.userId;
    },
    setAdminAuthenticated(state, action: PayloadAction<string>) {
      state.isAdminAuth = true;
      state.adminToken = action.payload;
      const decodedToken: { exp: number; iat: number; userId: string; email: string; adminRole: UserRole } = jwtDecode(
        action.payload
      );
      state.adminId = decodedToken.userId;
      state.adminRole = decodedToken.adminRole;
    },
    setUnauthenticated(state) {
      state.isAuth = false;
      state.token = null;
      state.userId = '';
      localStorage.removeItem('token');
    },
    setAdminUnauthenticated(state) {
      state.isAdminAuth = false;
      state.adminToken = null;
      state.adminId = '';
      localStorage.removeItem('adminToken');
    },
    openAuthModal(state) {
      state.isOpenAuthModal = true;
    },
    closeAuthModal(state) {
      state.isOpenAuthModal = false;
    },
    logout(state) {
      state.userId = '';
      state.isAuth = false;
    },
    adminLogout(state) {
      state.adminId = '';
      state.isAdminAuth = false;
    }
  }
});

const authReducer = authSlice.reducer;
export const {
  checkUserCredentials,
  setAuthenticated,
  setUnauthenticated,
  setAdminAuthenticated,
  setAdminUnauthenticated,
  openAuthModal,
  closeAuthModal,
  logout,
  adminLogout
} = authSlice.actions;
export default authReducer;
