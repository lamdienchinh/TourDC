import "./css/Forum.scss";
import { Container, Breadcrumbs, Typography, Pagination, Skeleton } from "@mui/material";
import Link from '@mui/material/Link';
import { useState, useEffect } from "react"
import axios from 'axios';
import LazyLoad from 'react-lazyload';
const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

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
                            <div className="post">
                                <div>{post}</div>
                                {/* <h2>{post.title}</h2>
                                <p>{post.content}</p> */}
                            </div>
                        </LazyLoad>
                    ))}
                </div>
                <div className="forum__sidebar">
                    <div >

                    </div>
                    <div>

                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Forum;