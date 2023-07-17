import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios
    from 'axios';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        address: "",
        infor: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.address = action.payload.address;
            state.infor = action.payload.infor;
        },
        clearUser: (state) => {
            state.address = "";
        },
        setInfor: (state, action) => {
            state.infor = action.payload.infor;
        }
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
            let infor = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/login`, {
                walletAddress: accounts[0]
            });
            console.log(infor.data)
            dispatch(setUser({ address: accounts[0], infor: infor.data }));
        } catch (err) {
            console.log(err.message);
        }
    } else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask");
    }
});

export const changeInfor = createAsyncThunk('user/changeinfor', async ({ token, data, axiosJWT }, { dispatch }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/changeinfor`, data, {
            headers: {
                token: `Bearer ${token}`
            },
        })
        console.log(res)
        let newinfor = {
            ...res.data,
            accessToken: token
        }
        dispatch(setInfor({ infor: newinfor }))
    }
    catch (err) {
        console.log(err)
    }
})

export const changeAvatar = createAsyncThunk('user/changeavatar', async ({ token, data, axiosJWT }, { dispatch }) => {
    try {
        console.log(token)
        console.log(data)
        const res = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/changeavatar`, data, {
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        })
        console.log("avatar", res);
    }
    catch (err) {
        console.log(err)
    }
}
)

export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
    dispatch(clearUser());
})

export const { setUser, clearUser, setInfor } = userSlice.actions;
export const userReducer = userSlice.reducer;