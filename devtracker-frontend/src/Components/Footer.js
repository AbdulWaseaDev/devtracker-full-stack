import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-light py-4 mt-5">
        <Container>
          <Row>
            <Col md={4} sm={12}>
              <h5>Your Logo</h5>
              <img src="/logo berlin.jpeg" alt="Logo" width="120" />
              <p>
                Delivering innovative tech solutions to empower your digital
                growth and online presence.
              </p>
            </Col>

            <Col md={4} sm={6}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/home" className="footer-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="footer-link">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="footer-link">
                    Profile
                  </Link>
                </li>
              </ul>
            </Col>

            <Col md={4} sm={6}>
              <h5>Contact Us</h5>
              <p>
                Location: Near Civil Lines College,Tariqabad colony MDA Road
                Kachery Chowk , Multan , Pakistan
              </p>
              <p>
                Email:{" "}
                <a href="mailto:info@berlintechs.com" className="footer-link">
                  info@berlintechs.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+923051935993" className="footer-link">
                  +92 305 1935993
                </a>
              </p>
            </Col>
          </Row>

          <hr className="border-light" />
          <p className="text-center mb-0">
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </Container>
      </footer>

      {/* Inline CSS for footer links */}
      <style>{`
        .footer-link {
          color: #f8f9fa;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-link:hover,
        .footer-link:focus,
        .footer-link:active {
          color: yellow;
        }
      `}</style>
    </>
  );
};

export default Footer;
