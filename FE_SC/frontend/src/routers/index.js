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
const RouterList = () => {
  return (
    <Routes>
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<Intro />} />
        <Route path="/travel" element={<Home />} />
        <Route path="/404" element={<></>} />
        <Route path="/placeinfor" element={<PlaceInfor />} />
      </Route>
      <Route element={<UserLayout />}>
        <Route path="/user" element={<User />} />
        <Route path="/album" element={<Album />} />
        <Route path="/viewalbum" element={<ViewAlbum />} />
        <Route path="/createalbum" element={<CreateAlbum />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/code" element={<Code />} />
      </Route>
    </Routes>
  );
};

export default RouterList;
