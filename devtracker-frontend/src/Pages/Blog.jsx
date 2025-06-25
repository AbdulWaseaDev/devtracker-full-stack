import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { user: alias } = useParams(); // alias = 'zeeshan', 'nadeem', or 'anus'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseURL = "http://localhost:5000/api/v1/devto/feed";
    const endpoint = alias ? `${baseURL}/${alias}` : baseURL;

    setLoading(true);
    fetch(endpoint, {
      credentials: "include",
      cache: "no-cache",
      headers: { "Cache-Control": "no-store" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Network error (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      });
  }, [alias]);

  if (loading) return <p>Loading articles…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!posts.length)
    return <p>No posts found{alias ? ` for "${alias}"` : ""}.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>
        {alias ? `${alias}'s Blogs` : "All Blogs"}
      </h1>
      {posts.map((post) => {
        const isDefault = !post.cover_image;
        return (
          <div key={post.id} style={styles.card}>
            <img
              src={post.cover_image || "/images/default/default-blog-cover.png"}
              alt={post.title}
              style={{
                ...styles.image,
                objectFit: isDefault ? "contain" : "cover",
              }}
            />
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <h2 style={styles.title}>{post.title}</h2>
            </a>
            <p style={styles.meta}>
              by <strong>{post.source}</strong> on{" "}
              {new Date(post.published_at).toLocaleDateString()}
            </p>
            <p style={styles.content}>{post.description}</p>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f3f4f6",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  mainTitle: {
    gridColumn: "1 / -1",
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "12px",
  },
  title: { fontSize: "22px", marginBottom: "8px", textDecoration: "none" },
  meta: { fontSize: "14px", color: "#6b7280", marginBottom: "12px" },
  content: { fontSize: "16px", color: "#374151" },
};

export default Blog;
