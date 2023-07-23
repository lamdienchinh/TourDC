import React, { Component } from 'react';
import { useState } from 'react';
// import FbImageLibrary from './react-fb-image-grid';
// import FacebookEmoji from 'react-facebook-emoji';
import { AiOutlineLike, AiOutlineDislike,AiFillLike, AiFillDislike,AiOutlineComment } from "react-icons/ai"
import './FBPost.css';

import defaultAvtar from '../../assets/imgs/default-avatar.jpg';
import privacyPublic from '../../assets/imgs/privacy-public.PNG';
import privacyFriends from '../../assets/imgs/privacy-friends.PNG';
import LikeBtn from '../../assets/imgs/like-btn.PNG';

let LikeBtnImg = LikeBtn;

const FBPost = (props) => {
  
  const [avtar, setAvtar] = useState(props.avtar?props.avtar:false);
  const [name, setName] = useState(props.name?props.name:"Your name");
  const [time, setTime] = useState(props.time?props.time:"Just Now");
  const [privacy, setPrivacy] = useState(props.time?props.privacy:"public");
  const [caption, setCaption] = useState(props.caption?props.caption:"Some Awesome Caption");
  const [images, setImages] = useState(props.images?props.images:[]);
  const [likes, setLikes] = useState(props.likes?props.likes:0);


  // const [Liked, setLiked] = useState(Album.liked) LẤY LIKED TRONG ALBUM TRUE/FALSE
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  
  const HandleLiked = () => {
      setLiked(!liked)
      let temp = likes;
      setLikes(temp++)
  }
  const HandleDisLiked = () => {
    setDisLiked(!disLiked)
  }
  const ViewIconLike = !liked ? <AiOutlineLike style={{ fontSize: `20px` }} /> : <AiFillLike style={{ fontSize: `25px` }}/>
  const ViewIconDisLike = !disLiked ? <AiOutlineDislike style={{ fontSize: `20px` }} /> : <AiFillDislike style={{ fontSize: `25px` }}/>

    return (
      <div className="post">
        <div className="head">
          <div className="avatar">
            <img src={avtar ? avtar : defaultAvtar} alt="Img" />
          </div>

          <span className="name">{name}</span>

          <div className="time">
            {time} &nbsp;-&nbsp;
            <span className="privacy">
              <img
                src={privacy === 'friends' ? privacyFriends : privacyPublic}
                alt="."
              />
            </span>
          </div>

          <div className="dots">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="caption">{caption}</div>
        <div
          className="images"
          style={images.length > 0 ? { height: 400 } : { height: 0 }}
        >
          {/* <FbImageLibrary beautify images={images} /> */}
        </div>

        <div className="likesCount" style={{display: "flex"}}>
          <div className="likes">
           <button className='likebtns' onClick={HandleLiked}>{ViewIconLike}</button>
           {likes}
           </div>
           <div className="dislikes" style={{marginLeft: "25px"}}>
           <button className='likebtns' onClick={HandleDisLiked}>{ViewIconDisLike}</button>
           {likes}
           </div>
           <div className="comment" style={{marginLeft: "25px"}}>
           <button className='likebtns' > <AiOutlineComment style={{ fontSize: `20px` }}/></button>
           {likes}
           </div>
        </div>

        <div className="btns">
        <div className="likes">
           <button className='likebtns' onClick={HandleLiked}>{ViewIconLike}</button>
           {likes}
           </div>
           <div className="dislikes" style={{marginLeft: "25px"}}>
           <button className='likebtns' onClick={HandleDisLiked}>{ViewIconDisLike}</button>
           {likes}
           </div>
           <div className="comment" style={{marginLeft: "25px"}}>
           <button className='likebtns' > <AiOutlineComment style={{ fontSize: `20px` }}/></button>
           {likes}
           </div>
        </div>
      </div>
    );
  }

export default FBPost;
