import axios from "axios";
import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";
import { toast } from "react-toastify";


const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);

const getAllPlace = async () => {
    try {
        let allplace = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/place/getallplaces`)
        console.log("AllPlaces", allplace)
        return allplace.data;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}
const reviewtoBE = async (data, token, axiosJWT) => {
    try {
        console.log(token)
        console.log(data);
        let review = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/trip/upload`, data, {
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        })
        console.log(review)
    }
    catch (err) {
        console.log(err)
    }
}
const getTrips = async (token, axiosJWT) => {
    try {
        console.log(token)
        let review = await axiosJWT.get(`${process.env.REACT_APP_ENDPOINT}/v1/trip`, {
            headers: {
                token: `Bearer ${token}`,
            },
        })
        // console.log(review)
        return review
    }
    catch (err) {
        console.log(err)
    }
}

const getPlace = async (placeid) => {
    try {
        // From SC
        const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
        const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);
        let review1 = await contract.methods.getReviewsInPlace(placeid).call();
        // From BE
        let place = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/place/get`, {
            placeid: placeid
        })
        let review2 = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/trip`, {
            placeid: placeid
        })
        review2 = review2.data
        console.log("Review 2", review2)
        //Merge
        const mergedArray = review1.map((item1) => {
            const matchingElement = review2.find((item2) => item2.tripid === (item1.tripId).toString());
            if (matchingElement) {
                return { ...item1, ...matchingElement };
            } else {
                return null;
            }
        });
        const filteredMergedArray = mergedArray.filter(item => item !== null);
        let result = {
            placeinfor: place.data,
            reviews: filteredMergedArray
        }
        console.log("MergeArray", filteredMergedArray);
        return result;
    }
    catch (err) {
        console.log(err)
    }
}
const getAllReviewsInAllPlaces = async () => {
    let mergedArray = [];
    let numPlace = 20; // => lấy số lượng của place???
    for (var i = 1; i <= numPlace; i++) {
        let temp = await contract.methods.getReviewsInPlace(i).call();
        mergedArray.push(temp);
    }
    return mergedArray
}

const getReviewsWithIds = async (idList, currentAccount) => {
    return await contract.methods.getJourneyWithID(idList).call({ from: currentAccount });
}

const getAlbums = async (token, axiosJWT) => {
    const album = await axiosJWT.get(`${process.env.REACT_APP_ENDPOINT}/v1/album/`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
    return album;
}

const login = async (email, password) => {
    try {
        let user = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/login`, {
            email: email,
            password: password
        })
        // console.log("users: ", user);
        return user;
    } catch (error) {
        return false;
    }
}

const addPost = async (data, token, axiosJWT) => {
    try {
        let post = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/add`, data, {
            headers: {
                token: `Bearer ${token}`,
            },
        })
        console.log(post)
        return 1;
    }
    catch (err) {
        console.log(err)
        return 0;
    }
}

const getPosts = async () => {
    try {
        const posts = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/post/`, {
        })
        return posts;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

const getMyPosts = async (token, axiosJWT) => {
    try {
        let posts = await axiosJWT.get(`${process.env.REACT_APP_ENDPOINT}/v1/post/mypost`, {
            headers: {
                token: `Bearer ${token}`
            },
        })
        return posts;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

const deletePost = async (token, data, axiosJWT) => {
    try {
        let posts = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/delete`, data, {
            headers: {
                token: `Bearer ${token}`
            },
        })
        return posts;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

const editPost = async (token, data, axiosJWT) => {
    try {
        let posts = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/edit`, data, {
            headers: {
                token: `Bearer ${token}`
            },
        })
        return posts;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const register = async (form) => {
    try {
        let user = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/`, {
            email: form.email,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName,
            phonenumber: form.phonenumber,
            walletAddress: form.walletAddress,
            privateKey: form.privateKey,
        })
        return user;
    } catch (error) {
        return error;
    }
}

const createAccountAddress = async () => {
    try {
        let newAddress = web3.eth.accounts.create();
        return newAddress
    } catch (error) {
        return false
    }
}

const autoCheckIn = async (user, ticketId, placeId) => {
    const publicKey = user.walletAddress;
    const privateKey = user.privateKey;
    try {
        let check = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/transaction/autocheckin`, {
            publicKey: publicKey,
            privateKey: privateKey,
            ticketId: ticketId,
            placeId: placeId
        })
        console.log("check: ", check.data.txHash)
        if (check.data.txHash) {
            toast.success("Check in thành công!")
            return check.data.txHash;
        } else {
            toast.error("Check in thất bại!")
        }
    } catch (error) {
        console.log("error: ", error)
    }
}

const getAllVouchers = async () => {
    try {
        let vouchers = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/voucher/`);
        return vouchers.data;
    }
    catch (error) {
        console.log("error: ", error)
    }
}

const saleVoucher = async (data, token, axiosJWT) => {
    try {
        let sale = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/voucher/sale`, data, {
            headers: {
                token: `Bearer ${token}`
            },
        });
        return sale;
    }
    catch (error) {
        console.log("error: ", error)
    }
}

const checkVoucher = async (id) => {
    try {
        await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/voucher/check    `, {
            id: id
        });
        return 1;
    }
    catch (error) {
        console.log("error: ", error)
        return 0;
    }
}

const getBalanceOf = async (currentAccount) => {
    try {
        const balance = await contract.methods.balanceOf(currentAccount).call();
        return balance;
    } catch (error) {
        console.log("error: ", error)
        return 0;
    }
}
const purchaseVoucher = async (voucherID,
    signer,
    currentAccount,
    amount,
    message,
    nonce,
    signature) => {
    try {
        let txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: currentAccount,
                        to: contractAddress.Token,
                        gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
                        maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
                        maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
                        data: contract.methods.exchangeVoucher(voucherID, signer, currentAccount, amount, message, nonce, signature).encodeABI()
                    },
                ],
            });

        console.log("txHash: ", txHash);
        return txHash; // Trả về giá trị txHash
    } catch (error) {
        console.error("error: ", error)
        if (error.code === 4001) toast.error('Người dùng từ chối', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        return -1;
    }
}
const reviewTrip = async (currentAccount, placeID, tripId, comment, rate, title,
    signer, to, amount, message, nonce, signature) => {
    try {
        let txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: currentAccount,
                        to: contractAddress.Token,
                        gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
                        maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
                        maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
                        data: contract.methods.review(placeID, tripId, comment, rate, title, signer, to, amount, message, nonce, signature).encodeABI()
                    },
                ],
            });
        console.log("txHash: ", txHash);
        toast.success("Lưu cảm nghĩ thành công! Bạn nhận được 10 Xu.")
        return txHash;
    } catch (error) {
        toast.error(error)
        return -1;
    }
}

const getMyVouchers = async (token, axiosJWT) => {
    try {
        let voucher = await axiosJWT.get(`${process.env.REACT_APP_ENDPOINT}/v1/user/getvouchers`, {
            headers: {
                token: `Bearer ${token}`
            },
        });
        console.log(voucher)
        return voucher.data;
    }
    catch (error) {
        console.log("error: ", error)
        return []
    }
}
const getTrustRate = async (id) => {
    try {
        let rate = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/user/gettrustrate`, {
            id: id
        });
        console.log(rate)
        return rate.data;
    }
    catch (error) {
        console.log("error: ", error);
        return 0;
    }
}

const autoReview = async (user, placeId, tripId, comment, rate, title,
    signer, to, amount, message, nonce, signature) => {
    const walletAddress = user.walletAddress;
    const privateKey = user.privateKey;
    console.log("walletAddress: ", walletAddress)
    console.log("user: ", user)
    console.log("placeId: ", placeId)
    console.log("tripId: ", tripId)
    console.log("comment: ", comment)
    console.log("rate: ", rate)
    console.log("title: ", title)
    console.log("signer: ", signer)
    console.log("to: ", to)
    console.log("amount: ", amount)
    console.log("message: ", message)
    console.log("nonce: ", nonce)
    console.log("signature: ", signature)
    try {
        let check = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/transaction/autoreview`, {
            walletAddress: walletAddress,
            privateKey: privateKey,
            placeId: Number(placeId),
            tripId: Number(tripId),
            comment: comment,
            rate: rate,
            title: title,
            signer: signer,
            to: to,
            amount: amount,
            message: message,
            nonce: nonce,
            signature: signature
        })
        console.log("check: ", check.data.txHash)
        if (check.data.txHash) {
            toast.success("Lưu trữ kỉ niệm thành công!")
            return check.data.txHash;
        } else {
            toast.error("Lưu trữ kỉ niệm thất bại!")
            return -1;
        }
    } catch (error) {
        console.log("error: ", error)
        return -1;
    }
}
const autoPurchase = async (user, voucherID, signer, amount, message, nonce, signature) => {
    const walletAddress = user.walletAddress;
    const privateKey = user.privateKey;
    try {
        let purchase = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/transaction/autopurchase`, {
            walletAddress: walletAddress,
            privateKey: privateKey,
            voucherID: voucherID,
            signer: signer,
            amount: amount,
            message: message,
            nonce: nonce,
            signature: signature
        })
        console.log("check: ", purchase.data.txHash)
        if (purchase.data.receipt) {
            toast.success("Mua voucher thành công!")
            return purchase.data.receipt;
        } else {
            toast.error("Mua voucher thất bại!")
            return -1;
        }
    } catch (error) {
        console.log("error: ", error)
        toast.error("Mua voucher thất bại!")
        return -1;
    }
}
export {
    getAllPlace,
    reviewtoBE,
    getTrips,
    getPlace,
    getAllReviewsInAllPlaces,
    getReviewsWithIds,
    getPosts,
    addPost,
    getAlbums,
    login,
    getMyPosts,
    deletePost,
    editPost,
    register,
    createAccountAddress,
    autoCheckIn,
    getAllVouchers,
    saleVoucher,
    checkVoucher,
    getBalanceOf,
    purchaseVoucher,
    reviewTrip,
    getMyVouchers,
    getTrustRate,
    autoReview,
    autoPurchase
}