import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data);
                return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            })
            .then((response) => response.json())
            .then((userData) => setUser(userData));
    }, [id]);

    if (!post || !user) {
        return <p>please waitwait</p>;
    }

    return (
        <div>
            <h1>User id: {post.id}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>Author: {user.name}</h3>
            <p>Email: {user.email}</p>
            <Link to="/">comeback to list</Link>
        </div>
    );
}

export default PostDetails;
