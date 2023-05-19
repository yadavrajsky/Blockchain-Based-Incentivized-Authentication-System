import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerCompany = createAsyncThunk(
    'auth/registerCompany',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post('/company/register', user);
            console.log(response.data);
            return response.data;
        } catch (error) {
            // Return the error message as the payload of the rejected action
            return rejectWithValue(error.response.data);
        }
    }
);

// export const loginUser = createAsyncThunk(
//     'auth/loginUser',
//     async (user, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/company/login', user);
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             // Return the error message as the payload of the rejected action
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const logoutUser = createAsyncThunk(
//     'auth/logoutUser',
//     async (user, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('/logout', user);
//             console.log(response); 
//             return response.data ;
//         } catch (error) {
//             // Return the error message as the payload of the rejected action
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


export const companySlice = createSlice({
    name: 'company',
    initialState: {
        // isAuthenticated: false,
        // user: null,
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
            .addCase(registerCompany.pending, (state) => {

                state.status = 'idle';
            })
            .addCase(registerCompany.fulfilled, (state, action) => {

                // state.status = 'succeeded';
                state.message = "Company register successfully"
                state.transaction = action.payload.data.data;
                state.error = null;
            })
            .addCase(registerCompany.rejected, (state, action) => {
                console.log(action.payload);
                state.status = 'failed';
                state.error = action.payload?.data?.data?.reason;
            })
        // .addCase(loginUser.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(loginUser.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     state.status = 'succeeded';
        //     state.isAuthenticated = action.payload.isAuthenticated;
        //     state.user = action.payload.user;
        //     state.error = null;
        // })
        // .addCase(loginUser.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message;
        // })
        // .addCase(logoutUser.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(logoutUser.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     state.status = 'succeeded';
        //     state.isAuthenticated = action.payload.isAuthenticated;
        //     state.user = action.payload.user;
        //     state.error = null;
        // })
        // .addCase(logoutUser.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message;
        // });
    },
});

export const { clearErrorsAndMessages } = companySlice.actions;

export default companySlice.reducer;
