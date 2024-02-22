import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContractABI = createAsyncThunk(
    "contract/fetchContractABI",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/contractABI");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchContractAddress = createAsyncThunk(
    "contract/fetchContractAddress",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/contractAddress");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    contractABI: null,
    error: null,
    status: "idle",
    message: null,
    contractAddress: null,
  },
  reducers: {
    clearErrorsAndMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractABI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContractABI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contractABI = action.payload;
      })
      .addCase(fetchContractABI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;
      })
      .addCase(fetchContractAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContractAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.contractAddress = action.payload?.contractAddress;
      })
      .addCase(fetchContractAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message;

      });
  },
});

export const { clearErrorsAndMessages } = contractSlice.actions;

export default contractSlice.reducer;
