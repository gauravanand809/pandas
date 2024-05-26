import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Style from "../../styles/blogStyle.module.css";
import axios from 'axios';

const Blogpost = ({ message }) => {
    const router = useRouter();
    const { slug } = router.query;
    const [blogData, setBlogData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        console.log("Fetching blog post for slug:", slug);
        
        axios.get(`http://localhost:3000/api/readfile?slug=${slug}`)
            .then((response) => {
                console.log("Response Data:", response.data);
                setBlogData(response.data);
            })
            .catch((err) => {
                setError('Failed to load blog post');
                console.error(err);
            });
    }, [router.isReady, slug]);

    if (error) {
        return <div className={Style.blog}><p>{error}</p></div>;
    }

    return (
        <div className={Style.blog}>
            <h1>The title of the blog is {slug}</h1>
            {blogData ? (
                <div>
                    {blogData.Title && <h3>{blogData.Title}</h3>}
                    {blogData.Description && blogData.Description.Text && <p>{blogData.Description.Text}</p>}
                    {blogData.Author && <p>Author: {blogData.Author}</p>}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <p>{message}</p>
        </div>
    );
};

export async function getServerSideProps() {
    return {
        props: { message: "I am a good guy" }
    }
}

export default Blogpost;
