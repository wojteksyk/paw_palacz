import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

function fetchPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
}

function PostsList() {
    const { data: posts, error, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

    if (isLoading) return <p>Ładowanie...</p>;
    if (error) return <p>Błąd: {error.message}</p>;

    return (
        <div>
            <h1>Lista</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsList;

