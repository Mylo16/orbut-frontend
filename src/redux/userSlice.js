import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getUserFromLocalStorage,
  getUserTokenFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from '../localStorgeUser';

const base_url = 'https://test.quups.app';

export const userSignup = createAsyncThunk('user/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${base_url}/api/create-account`, userData, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    const errorMessages = error.response.data.errors.map((err, index) => ({
      id: index,
      message: err,
    }));
    return rejectWithValue(errorMessages);
  }
});

export const userSignin = createAsyncThunk('user/signin', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${base_url}/api/signin`, userData, {
      headers: {
        Accept: 'application/json',
      },
    });
    return {
      user: response.data.data,
      token: response.data.data.access_token,
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: undefined,
    token: undefined,
    loading: true,
    error: null,
    userCreated: false,
  },
  reducers: {
    userSignout: (state) => {
      state.user = null;
      state.token = null;
      removeUserFromLocalStorage();
    },
    loadUserFromLocalStorage: (state) => {
      const user = getUserFromLocalStorage();
      const token = getUserTokenFromLocalStorage();
      if (user && token) {
        state.user = user;
        state.token = token;
      }
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignin.fulfilled, (state, action) => {
      if (action.payload.user != undefined || action.payload.token !== undefined) {
        saveUserToLocalStorage(action.payload.user, action.payload.token);
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
      state.loading = false;
    })
      .addCase(userSignin.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(userSignin.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userCreated = true;
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userCreated = false;
      })
      .addCase(userSignup.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.userCreated = false;
      });
  },
});

export const { loadUserFromLocalStorage, userSignout } = userSlice.actions;
export default userSlice.reducer;
