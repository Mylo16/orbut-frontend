import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from './campaignSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    campaign: campaignReducer,
  },
});

export default store;
