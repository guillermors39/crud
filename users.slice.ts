import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localForage from 'localforage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
      // Guardamos los datos en la caché
      redisClient.set('users', JSON.stringify(data), error => {
        if (error) {
          console.error(error);
        }
      });
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUserRequest: (state) => {
      state.loading = true;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.loading = false;
      state.error = null;
      // Guardamos los datos en la caché
      redisClient.set('users', JSON.stringify(data), error => {
        if (error) {
          console.error(error);
        }
      });
    },
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
        state.loading = false;
        state.error = null;
        // Guardamos los datos en la caché
        redisClient.set('users', JSON.stringify(data), error => {
          if (error) {
            console.error(error);
          }
        });
      }
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      const deletedUserId = action.payload;
      state.users = state.users.filter(user => user.id !== deletedUserId);
      state.loading = false;
      state.error = null;
      // Guardamos los datos en la caché
      redisClient.set('users', JSON.stringify(data), error => {
        if (error) {
          console.error(error);
        }
      });
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;

