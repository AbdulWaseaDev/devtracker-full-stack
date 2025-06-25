import React, { useState } from "react";
import { useEffect } from "react";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 1. Fetch real users on mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // or wherever you keep it
    fetch("http://localhost:5000/api/v1/admin/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          // handle 401 specifically
          if (res.status === 401) {
            throw new Error("Unauthorized – please log in again.");
          }
          throw new Error(`Server responded ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((err) => {
        console.error("Load users failed:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSort = (field) => {
    setSortBy(field);
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleUpdate = (id) => {
    alert(`Update user with ID: ${id}`);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search),
    )
    .sort((a, b) => a[sortBy]?.localeCompare(b[sortBy]));

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
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => handleSort("name")}
          >
            Sort by Name
          </button>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => handleSort("email")}
          >
            Sort by Email
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleSort("jobTitle")}
          >
            Sort by Job
          </button>
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
              <th>Roles</th>
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
                <tr key={user.id}>
                  <td>
                    <img
                      src={
                        user.avatar.url && user.avatar.url.trim() !== ""
                          ? user.avatar.url
                          : "/images/default/default_avatar.jpg"
                      }
                      alt={user.name}
                      className="rounded-circle"
                      width="40"
                      height="40"
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
                    <div
                      className="gap-2 d-flex justify-content-center align-item-center"
                      role="group"
                    >
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="btn btn-warning text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleUpdate(user.id)}
                        className="btn btn-info text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete ${user.name}?`,
                            )
                          ) {
                            handleDelete(user.id);
                          }
                        }}
                        className="btn btn-danger"
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
