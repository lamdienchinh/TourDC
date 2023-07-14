import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { address: "" },
    reducers: {
        setUser: (state, action) => {
            state.address = action.payload.address;
        },
        clearUser: (state) => {
            state.address = "";
        },
    },
});

export const connectWallet = createAsyncThunk('user/connectWallet', async (_, { dispatch }) => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
            /* MetaMask is installed */
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(accounts[0]);
            dispatch(setUser({ address: accounts[0] }));
        } catch (err) {
            console.log(err.message);
        }
    } else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask");
    }
});

export const logout = createAsyncThunk('user/logout', async (_, {dispatch}) => {
    dispatch(clearUser());
})

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;