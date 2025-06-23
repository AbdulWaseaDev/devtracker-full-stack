import React from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      {/* Hero Section with Carousel */}
      <div className="bg-dark text-center py-4">
        <div className="mx-auto" style={{ width: "90%" }}>
          <Carousel fade interval={3000} ride="carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/hero.webp"
                alt="Hero"
                style={{ height: "90vh", objectFit: "cover" }}
              />
              <Carousel.Caption className="bg-white bg-opacity-75 p-3 rounded text-dark">
                <h3>Welcome to Dev-Tracker</h3>
                <p>
                  Dev-Tracker is a web-based application designed to help
                  developers and students monitor their daily learning progress,
                  manage projects, and keep track of milestones.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/2ndhome.avif"
                alt="Learning Journey"
                style={{ height: "90vh", objectFit: "cover" }}
              />
              <Carousel.Caption className="bg-white bg-opacity-75 p-3 rounded text-dark">
                <h3>Improve Your Skills</h3>
                <p>
                  Blog updates, progress tracking, and profile management to
                  help you stay focused and motivated.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/dev-homes.jpg"
                alt="Dev Homes"
                style={{ height: "90vh", objectFit: "cover" }}
              />
              <Carousel.Caption className="bg-white bg-opacity-75 p-3 rounded text-dark">
                <h3>Stay on Track</h3>
                <p>
                  Your ultimate solution to track development progress with ease
                  and efficiency.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* About Section */}
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <img
              src="/images/about devtacker.webp"
              alt="Team"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <h2>About Dev-Tracker</h2>
            <p>
              Dev-Tracker helps developers and teams monitor their project
              tasks, updates, and goals in a centralized dashboard. Designed
              with simplicity and productivity in mind, it enables better
              collaboration and faster development.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="py-5 bg-light">
        <h2 className="text-center mb-4">Key Features</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-3 shadow-sm h-100">
              <Card.Img
                variant="top"
                src="/images/real time progress.jpeg"
                style={{ width: "100%", height: "215px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Real-Time Progress</Card.Title>
                <Card.Text>
                  Track your project's progress in real-time with dynamic
                  dashboards and updates.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 shadow-sm h-100">
              <Card.Img
                variant="top"
                src="/images/team collaboratin.jpeg"
                style={{ width: "100%", height: "215px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Team Collaboration</Card.Title>
                <Card.Text>
                  Share tasks, updates, and communicate seamlessly within your
                  dev team.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 shadow-sm h-100">
              <Card.Img
                variant="top"
                src="/images/task management.jpeg"
                style={{ width: "100%", height: "215px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Task Management</Card.Title>
                <Card.Text>
                  Create, assign, and manage tasks effortlessly with built-in
                  tracking tools.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
