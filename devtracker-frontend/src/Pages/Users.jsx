import React, { useState } from "react";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ali Raza",
      email: "ali.raza@example.com",
      jobTitle: "Frontend Developer",
      status: "active",
      avatar: { url: "https://i.pravatar.cc/150?img=3" },
    },
    {
      id: 2,
      name: "Fatima Khan",
      email: "fatima.khan@example.com",
      jobTitle: "Backend Engineer",
      status: "inactive",
      avatar: { url: "" },
    },
  ]);

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
              <th>Status</th>
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
                      src={user.avatar?.url || "https://via.placeholder.com/40"}
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
                      className={`badge ${user.status === "active" ? "bg-success justify-content-center align-item-center" : "bg-danger justify-content-center align-item-center"}`}
                    >
                      {user.status || "unknown"}
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
