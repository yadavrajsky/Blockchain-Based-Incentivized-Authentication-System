import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post('/register', user);
            console.log(response.data);
            return response.data;
        } catch (error) {
            // Return the error message as the payload of the rejected action
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post('/login', user);
            console.log(response.data);
            return response.data;
        } catch (error) {
            // Return the error message as the payload of the rejected action
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post('/logout', user);
            console.log(response); 
            return response.data ;
        } catch (error) {
            // Return the error message as the payload of the rejected action
            return rejectWithValue(error.response.data);
        }
    }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        status: 'idle',
        message: null,
        transaction: null
    },
    reducers: {
        clearErrorsAndMessages: (state) => {
            state.error = null;
            state.message = null;
            state.transaction = null;
            // state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {

                state.status = 'idle';
            })
            .addCase(registerUser.fulfilled, (state, action) => {

                state.status = 'succeeded';
                state.message = "User register successfully"
                state.transaction = action.payload.data.data;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log(action.payload);
                state.status = 'failed';
                state.error = action.payload?.data?.data?.reason;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'succeeded';
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'succeeded';
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { clearErrorsAndMessages } = authSlice.actions;

export default authSlice.reducer;
