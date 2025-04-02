import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';

function fetchPost(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json());
}

function fetchUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json());
}

function PostDetails() {
    const { id } = useParams();
    const { data: post, isLoading: postLoading, error: postError } = useQuery({ queryKey: ['post', id], queryFn: () => fetchPost(id) });

    const userId = post?.userId;
    const { data: user, isLoading: userLoading, error: userError } = useQuery({ queryKey: ['user', userId], queryFn: () => fetchUser(userId), enabled: !!userId });

    if (postLoading || userLoading) return <p>Ładowanie...</p>;
    if (postError || userError) return <p>Błąd: {postError?.message || userError?.message}</p>;

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