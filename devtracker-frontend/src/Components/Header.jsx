import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const [showBlogDropdown, setShowBlogDropdown] = useState(false);

  const handleMouseEnter = () => setShowBlogDropdown(true);
  const handleMouseLeave = () => setShowBlogDropdown(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Devtracker-Frontend-Main</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/home">Home</Nav.Link>

            {/* Blog Dropdown with hover functionality */}
            <NavDropdown
              title="Blog"
              id="navbarScrollingDropdown"
              show={showBlogDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown.Item href="/blog">All Blogs</NavDropdown.Item>
              <NavDropdown.Item href="/blog/zeeshan">
                M Zeeshan's Blog
              </NavDropdown.Item>
              <NavDropdown.Item href="/blog/nadeem">
                M Nadeem's Blog
              </NavDropdown.Item>
              <NavDropdown.Item href="/blog/anus">Anus's Blog</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
