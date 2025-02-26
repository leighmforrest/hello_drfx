import { useEffect, useState } from "react";
import apiClient from "../apiClient";
import urls from "../urls";


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(urls.index);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {posts.map((post) => (
            <li key={post.pk}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
