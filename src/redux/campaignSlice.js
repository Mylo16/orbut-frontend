import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserTokenFromLocalStorage } from '../localStorgeUser';

const base_url = 'https://test.quups.app';

export const createCampaign = createAsyncThunk('/createCampaign', async (campaignData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${base_url}/api/campaigns`, campaignData, {
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${getUserTokenFromLocalStorage()}`,
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

export const getCampaigns = createAsyncThunk('/getCampaigns', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${base_url}/api/campaigns`, {
      headers: {
        Authorization: `bearer ${getUserTokenFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCampaign = createAsyncThunk('/updateCampaign/id', async ({ campaignData, campaignId }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${base_url}/api/campaigns/${campaignId}`, { campaignData, campaignId }, {
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${getUserTokenFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getCampaignById = createAsyncThunk('/getCampaign/id', async (campaignId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${base_url}/api/campaigns/${campaignId}`, {
      headers: {
        Authorization: `bearer ${getUserTokenFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCampaign = createAsyncThunk('/deleteCampaign/id', async (campaignId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${base_url}/api/campaigns/${campaignId}`, {
      headers: {
        Authorization: `bearer ${getUserTokenFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    campaigns: undefined,
    loading: undefined,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(createCampaign.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    })
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.campaigns = action.payload;
      })
      .addCase(getCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaigns.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.campaigns = state.campaigns.filter((campaign) => campaign.id !== action.payload.id);
      })
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.campaigns = action.payload;
      })
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload === null) {
          state.campaigns = [];
        } else {
          state.campaigns = [action.payload];
        }
      })
      .addCase(getCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default campaignSlice.reducer;
