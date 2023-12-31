import React from "react";
import { Routes, Route } from "react-router-dom";
//import layout
import GeneralLayout from "../layouts/general_layout";
//import pages
import Intro from "../pages/Intro";
import Home from "../pages/Home";
import PlaceInfor from "../pages/PlaceInfor";
import User from "../pages/User";
import Album from "../pages/Album";
import ViewAlbum from "../pages/ViewAlbum";
import UserLayout from "../layouts/user_layout";
import CreateAlbum from "../pages/CreateAlbum";
import Trips from "../pages/Trips";
import Code from "../pages/Code";
import Forum from "../pages/Forum";
import { useSelector } from "react-redux";
import { getInfor, getUserData } from "../state/selectors";
import Error from "../pages/Error";
import QrCode from "../pages/QRcode/qrCode";
import Login from "../pages/login";
import Register from "../pages/register/register";
import MyPosts from "../pages/MyPosts";
import VoucherShop from "../pages/Shop";
import PurchasedVouchers from "../pages/PurchasedVouchers";

const RouterList = () => {
  const walletAddress = useSelector(getUserData);
  const userinfor = useSelector(getInfor)
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<Intro />} />
        <Route path="/travel" element={<Home />} />
        <Route path="/placeinfor" element={<PlaceInfor />} />
      </Route>
      {
        walletAddress !== "" && (userinfor?.lastName !== "" || userinfor?.firstName !== "") ?
          <Route element={<UserLayout />}>
            <Route path="/" element={<Intro />} />
            <Route path="/travel" element={<Home />} />
            <Route path="/placeinfor" element={<PlaceInfor />} />
            <Route path="/user" element={<User />} />
            <Route path="/album" element={<Album />} />
            <Route path="/viewalbum" element={<ViewAlbum />} />
            <Route path="/createalbum" element={<CreateAlbum />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/code" element={<Code />} />
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/qrcode" element={<QrCode />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/shop" element={<VoucherShop />} />
            <Route path="/vouchers" element={<PurchasedVouchers />} />
            <Route path="*" element={<Error />} />
          </Route> :
          <Route element={<UserLayout />}>
            <Route path="*" element={<User />} />
          </Route>
      }
      <Route element={<GeneralLayout />}>
        <Route path="*" element={<Error />} />
      </Route>
      {/* {
        walletAddress ?
          <Route element={<UserLayout />}>
            <Route path="/user" element={<User />} />
            <Route path="/album" element={<Album />} />
            <Route path="/viewalbum" element={<ViewAlbum />} />
            <Route path="/createalbum" element={<CreateAlbum />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/code" element={<Code />} />
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/qrcode" element={<QrCode />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/shop" element={<VoucherShop />} />
            <Route path="/vouchers" element={<PurchasedVouchers />} />
            <Route path="*" element={<Error />} />
          </Route> : ""
      } */}
    </Routes>
  );
};

export default RouterList;
