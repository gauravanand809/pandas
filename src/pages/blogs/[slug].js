import React from 'react';
import { useRouter } from 'next/router';
import Style from '../../styles/blogStyle.module.css';
import axios from 'axios';

const Blogs = ({ blogData, error }) => {
    const router = useRouter();
    const { slug } = router.query;

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
        </div>
    );
};

export async function getServerSideProps(context) {
    const { slug } = context.params;
    let blogData = null;
    let error = null;

    try {
        const response = await axios.get(`http://localhost:3000/api/readfile?slug=${slug}`);
        blogData = response.data;
    } catch (err) {
        error = 'Failed to load blog post';
    }

    return {
        props: { blogData, error },
    };
}

export default Blogs;

