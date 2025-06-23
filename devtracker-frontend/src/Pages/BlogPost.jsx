import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { user: alias, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ALIAS_MAP = {
      zeeshan: "mzeeshan138",
      nadeem: "nadeem137",
      anus: "anus_javaid30",
    };
    const username = ALIAS_MAP[alias.toLowerCase()] || alias;
    const fetchUrl = `https://dev.to/api/articles/${username}/${slug}`;

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Network error (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      });
  }, [alias, slug]);

  if (loading) return <p>Loading post…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.wrapper}>
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} style={styles.heroImage} />
      )}
      <div style={styles.contentBox}>
        <h1 style={styles.title}>{post.title}</h1>
        <p style={styles.meta}>
          by <strong>{post.user.name}</strong> on{" "}
          {new Date(post.published_at).toLocaleDateString()}
        </p>
        <hr style={styles.divider} />
        <div
          style={styles.body}
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "#f9fafb",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  heroImage: {
    width: "100%",
    height: "auto",
    maxHeight: "900px",
    objectFit: "cover",
    display: "block",
    margin: 0,
    padding: "15px",
  },
  contentBox: {
    width: "100%",
    margin: "10px 20px",
    padding: "24px 32px",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#111827",
  },
  meta: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e5e7eb",
    margin: "20px 0",
  },
  body: {
    fontSize: "18px",
    lineHeight: 1.8,
    color: "#374151",
  },
};

export default BlogPost;
