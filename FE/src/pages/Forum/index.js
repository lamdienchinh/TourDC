import "./css/Forum.scss";
import { Container, Breadcrumbs, Typography, Pagination, Skeleton } from "@mui/material";
import Link from '@mui/material/Link';
import { useState, useEffect } from "react"
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { createAxios } from "../../utils/createInstance";
import { setInfor } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { getInfor, getUserData } from '../../state/selectors';
import { useSelector } from 'react-redux'
import FBPost from "../../components/widget/FBPost";
const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);


    const dispatch = useDispatch();
    const [userInfor, serUserInfor] = useState(useSelector(getInfor));
    console.log("userInfor: ", userInfor);
    let axiosJWT = createAxios(userInfor, dispatch, setInfor);


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        // const response = await axios.get(`/api/posts?page=${page}`);
        const response = {
            data: ["1", "2", "3"]
        }
        setPosts(prevPosts => [...prevPosts, ...response.data]);
        setPage(prevPage => prevPage + 1);
    };
    
    const Album = {
        title: "hello",
        content: 'This is album content',
        createdAt: '2023-07-22T10:48:34.127+00:00',
        list_trips: [],
        liked: false,
        disliked: false,
        likes: 10,
        dislikes: 10
    }

    const handleScroll = () => {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const pageHeight = document.documentElement.scrollHeight;

        if (windowHeight + scrollPosition >= pageHeight) {
            fetchPosts();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    
    return (
        <div className="forum-wrapper">
            <div className="forum__slides">
                <div className="forum__slides__content">
                    Cộng đồng giao lưu trao đổi
                </div>
                <div className="forum__slides_breadcumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="text.primary">Forum</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <Container maxWidth="lg">
                <div className="forum__helpers">
                    <div className="forum__search"></div>
                    <div className="forum__filter"></div>
                    <div className="forum__create"></div>
                </div>
                <div className="forum__posts">
                    <h1>Danh sách bài viết</h1>
                    {posts.map(post => (
                        <LazyLoad key={post.id}>
                        
                        </LazyLoad>
                    ))}
                </div>
                <div className="forum__sidebar">
                    <div >
                    <FBPost
                        avtar={userInfor.avatar}
                        name={userInfor.firstName + userInfor.lastName}
                        time={Album.createdAt}
                        // privacy={privacy}
                        caption={Album.content}
                        // images={images}
                        likes={Album.likes}
                        liked={Album.liked}
                        disliked={Album.disliked}
                        // includeLike={includeLike}
                        // includeLove={includeLove}
                        // includeHaha={includeHaha}
                        // includeWow={includeWow}
                        // includeSad={includeSad}
                        // includeAngry={includeAngry}
          />
                    </div>
                    <div>

                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Forum;