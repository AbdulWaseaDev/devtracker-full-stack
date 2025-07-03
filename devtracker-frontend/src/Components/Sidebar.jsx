// src/components/OffcanvasExample.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Spinner from "react-bootstrap/Spinner";

export default function OffcanvasExample() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    setLoggingOut(true);

    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        withCredentials: true,
      });
      // simulate delay before redirect
      setTimeout(() => {
        setLoggingOut(false);
        navigate("/dashboard/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Logout failed. Please try again.");
      setLoggingOut(false);
    }
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/dashboard">Devtracker-Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Dashboard
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                {error && <div className="text-danger mb-2">{error}</div>}

                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/dashboard/users">Manage Users</Nav.Link>
                  <Nav.Link href="/dashboard/user/register">
                    Register Users
                  </Nav.Link>
                  <Nav.Link href="/dashboard/login">Login</Nav.Link>

                  {/* Logout with delay and disabled state */}
                  <Nav.Link
                    href="#"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    style={{ cursor: loggingOut ? "not-allowed" : "pointer" }}
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
