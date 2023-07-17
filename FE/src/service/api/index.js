import axios from "axios";

const getAllPlace = async () => {
    try {
        let allplace = await axios.get(`${process.env.REACT_APP_ENDPOINT}/v1/place/getallplaces`)
        return allplace.data;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}
// const getAllTrip = async (walletAddress) => {
//     try {
//         let alltrip = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/trip/getalltrips`, { data: walletAddress })
//         return alltrip.data;
//     }
//     catch (err) {
//         console.log(err);
//         return [];
//     }
// }
// const reviewTrip = async (reviewdata) => {
//     try {
//         let review = await axios.post(`${process.env.REACT_APPOINT}`, { data: reviewdata })
//         return review;
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// const getAllAlbums = async (walletAddress) => {
//     try {
//         let allalbums = await axios.post(`${process.env.REACT_APP_ENDPOINT}/v1/album/getallalbums`, { data: walletAddress })
//         return allalbums.data;
//     }
//     catch (err) {
//         console.log(err);
//         return [];
//     }
// }

// const removeAlbum = async (albumid) => {
//     try {
//         let album_del = await axios.delete(`${process.env.REACT_APP_ENDPOINT}/v1/album/remove`, { data: albumid })
//         return album_del;
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
export {
    getAllPlace
}