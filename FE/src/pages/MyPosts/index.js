import "./css/Mypost.scss";
import { Container, Breadcrumbs, Typography, Pagination } from "@mui/material";
import Link from '@mui/material/Link';
import { useState, useEffect } from "react"
import LazyLoad from 'react-lazyload';
import { createAxios } from "../../utils/createInstance";
import { setInfor } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { getInfor } from '../../state/selectors';
import { useSelector } from 'react-redux'
import FBPost from "../../components/post";

import { getMyPosts } from "../../service/api";
const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [userInfor] = useState(useSelector(getInfor));
    let axiosJWT = createAxios(userInfor, dispatch, setInfor);


    useEffect(() => {
        const fetchPosts = async () => {
            let token = userInfor.accessToken
            let allPost = await getMyPosts(token, axiosJWT);
            console.log(allPost)
            setPosts(allPost.data)
        }
        fetchPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const [poststoview, setPostsToView] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [select, setSelect] = useState(1);

    useEffect(() => {
        let start = 4 * (select - 1);
        let end = start + 4;
        if (end > posts.length) end = posts.length;
        const temp = posts.slice(start, end);
        const totalPages = Math.ceil(posts.length / 4);
        const dataonepage = temp.slice(0, 10);
        setPostsToView(dataonepage);
        setTotalPages(totalPages);
    }, [select, posts]);

    const handlePageChange = (event, number) => {
        setSelect(number);
    }

    return (
        <div className="myposts-wrapper">
            <div className="myposts__slides">
                <div className="myposts__slides__content">
                    Những bài posts của bạn
                </div>
                <div className="myposts__slides_breadcumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link underline="hover" color="inherit" href="/forum">
                            Forum
                        </Link>
                        <Typography color="text.primary">My Posts</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <Container maxWidth="lg">
                <div className="myposts__posts">
                    <h1>Danh sách bài viết của bạn</h1>
                    <LazyLoad>
                        {poststoview.map((post, index) => (
                            <FBPost
                                key={index}
                                data={post}
                            />
                        ))}
                    </LazyLoad>
                    <div className="myposts__pagination">
                        <Pagination count={totalPages} onChange={handlePageChange} showFirstButton showLastButton color="primary" />
                    </div>
                </div>
            </Container >
        </div >
    );
}

export default MyPosts;