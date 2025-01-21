import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    currentuser: null,
    loading: false,
    error: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signinSuccess: (state, action) => {
            state.loading = false;
            state.currentuser = action.payload;
            state.error = null;  
        },
        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signout: (state) => {
            state.currentuser = null;
            state.loading = false;
            state.error = null;
        }
    }
});
export const { signinStart, signinSuccess, signinFailure, signout } = userSlice.actions;
export default userSlice.reducer;