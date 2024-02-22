import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post('/register', user);
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
            return response.data;
        } catch (error) {
            // Return the error message as the payload of the rejected action
            return rejectWithValue(error.response.data);
        }
    }
);
export const loginupdate = createAsyncThunk(
    'auth/loginupdate',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post('/loginupdate', user);
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

                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {

                state.status = 'succeeded';
                state.message = action.payload.message;
                state.transaction = action.payload.data;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message?action.payload?.message: action.payload?.data?.data?.reason;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'succeeded';
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.error = null;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                console.log(action.payload);
                state.error =  action.payload?.message?action.payload?.message: action.payload?.data?.data?.reason;
            })
        
            // Login Update
            .addCase(loginupdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginupdate.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'succeeded';
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.error = null;

            })
            .addCase(loginupdate.rejected, (state, action) => {
                state.status = 'failed';
                console.log(action.payload);
                // state.error =  action.payload?.message?action.payload?.message: action.payload?.data?.data?.reason;
            })
            
        
            //
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'succeeded';
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.error = null;
                state.message = action.payload.message;

                

            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message?action.payload?.message: action.payload?.data?.reason;
            });
    },
});

export const { clearErrorsAndMessages } = authSlice.actions;

export default authSlice.reducer;
