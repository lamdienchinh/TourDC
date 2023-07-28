import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getBalanceOf } from '../service/api';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        address: "",
        infor: {},
        balance: 0,
    },
    reducers: {
        setUser: (state, action) => {
            state.address = action.payload.address;
            state.infor = action.payload.infor;
            state.balance = action.payload.balance
        },
        clearUser: (state) => {
            state.address = "";
        },
        setInfor: (state, action) => {
            state.infor = action.payload.infor;
        },
        setBalance: (state, action) => {
            state.balance = action.payload.balance;
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
            axios.defaults.withCredentials=true;
            let infor = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/loginByMetamask`, {
                walletAddress: accounts[0]
            });
            console.log(infor)
            console.log(infor.data)
            let balance = await getBalanceOf(accounts[0]);
            console.log(balance);
            dispatch(setUser({ address: accounts[0], infor: infor.data, balance: Number(balance) }));
            toast.success("Kết nối ví Metamask thành công")
        } catch (err) {
            console.log(err.message);
        }
    } else {
        /* MetaMask is not installed */
        console.log("Hãy cài đặt ví Metamask");
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
        toast.success('Thay đổi thông tin thành công !');
    }
    catch (err) {
        console.log(err)
    }
})

export const changeAvatar = createAsyncThunk('user/changeavatar', async ({ token, formData, axiosJWT }, { dispatch }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/changeavatar`, formData, {
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        })
        let newData = { ...res.data, accessToken: token };
        dispatch(setInfor({ infor: newData }));
        toast.success('Thay đổi avatar thành công !');
    }
    catch (err) {
        console.log(err)
    }
}
)

export const logout = createAsyncThunk('user/logout', async ({ token, axiosJWT }, { dispatch }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/logout`, token, {
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        })
        dispatch(clearUser());
        console.log(res);
        toast.success("Đăng xuất thành công")
    }
    catch (err) {
        console.log(err)
        dispatch(clearUser());
    }
})
export const updateBalance = createAsyncThunk('getBalance', async(currentAccount) =>{
    try {
        let balance = await getBalanceOf(currentAccount);
        // dispatch(setBalance({balance: balance}))
    } catch (error) {
        
    }
})

export const { setUser, clearUser, setInfor } = userSlice.actions;
export const userReducer = userSlice.reducer;