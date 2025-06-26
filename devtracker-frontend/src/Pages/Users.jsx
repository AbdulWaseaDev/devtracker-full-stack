import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/admin/allusers", {
      method: "GET",
      credentials: "include", // send the HTTP-only cookie
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 401) {
          // Unauthorized or cookie expired
          navigate("/dashboard/login");
          throw new Error("Redirecting to login...");
        }
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(data.users || []))
      .catch((err) => {
        if (err.message !== "Redirecting to login...") {
          console.error("Load users failed:", err);
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  const handleSort = (field) => setSortBy(field);
  const handleDelete = (id) =>
    setUsers((prev) => prev.filter((u) => u._id !== id));
  const handleEdit = (id) => alert(`Edit user with ID: ${id}`);
  const handleUpdate = (id) => alert(`Update user with ID: ${id}`);

  const filteredUsers = users
    .filter((user) =>
      [user.name, user.email]
        .map((s) => (s || "").toLowerCase())
        .some((txt) => txt.includes(search)),
    )
    .sort((a, b) => {
      const A = (a[sortBy] || "").toString().toLowerCase();
      const B = (b[sortBy] || "").toString().toLowerCase();
      return A.localeCompare(B);
    });

  if (loading)
    return (
      <div className="text-center my-5">
        <span className="spinner-border"></span> Loading users…
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger text-center my-5">Error: {error}</div>
    );

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-6 text-md-end">
          {["name", "email", "jobTitle"].map((field) => (
            <button
              key={field}
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleSort(field)}
            >
              Sort by {field.charAt(0).toUpperCase() + field.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={
                        user.avatar?.url?.trim()
                          ? user.avatar.url
                          : "/images/default/default_avatar.jpg"
                      }
                      alt={user.name}
                      className="rounded-circle"
                      width="40"
                      height="40"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.jobTitle || "—"}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "bg-success"
                          : user.role === "user"
                            ? "bg-primary"
                            : "bg-secondary"
                      } d-flex justify-content-center align-items-center`}
                    >
                      {user.role || "unknown"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="btn btn-warning text-white btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="btn btn-info text-white btn-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          window.confirm(
                            `Are you sure you want to delete ${user.name}?`,
                          ) && handleDelete(user._id)
                        }
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
