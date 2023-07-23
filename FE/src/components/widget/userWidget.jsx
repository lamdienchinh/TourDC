import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  // const dark = palette.neutral.dark;
  // const medium = palette.neutral.medium;
  // const main = palette.neutral.main;

  // const getUser = async () => {
  //   const response = await fetch(`http://localhost:3001/users/${userId}`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   setUser(data);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if (!user) {
  //   return null;
  // }

  // const {
  //   firstName =  "nguyen",
  //   lastName = "duy",
  //   location = "somewhere",
  //   occupation = "IT",
  //   viewedProfile = "viewprofiled",
  //   impressions = "impressions",
  //   friends = 10,
  // } = user;
  // setUser(user);
  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={"picturePath"} />
          <Box>
            <Typography
              variant="h4"
              // color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {"firstName"} {"lastName"}
            </Typography>
            {/* <Typography color={medium}>{friends.length} friends</Typography> */}
            <Typography >{"friends.length"} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" />
          {/* <Typography color={medium}>{location}</Typography> */}
          <Typography >{"location"}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" />
          {/* <Typography color={medium}>{occupation}</Typography> */}
          <Typography >{"occupation"}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography >Who's viewed your profile</Typography>
          <Typography fontWeight="500">
            {"viewedProfile"}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography >Impressions of your post</Typography>
          <Typography fontWeight="500">
            {"impressions"}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem"  fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../../assets/avatar.jpg" alt="twitter" />
            <Box>
              <Typography  fontWeight="500">
                Twitter
              </Typography>
              <Typography >Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: "white" }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../../assets/place1.png" alt="linkedin" />
            <Box>
              <Typography  fontWeight="500">
                Linkedin
              </Typography>
              <Typography>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;