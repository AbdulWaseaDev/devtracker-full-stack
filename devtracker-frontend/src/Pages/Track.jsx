// import React from 'react';
import { Container, Button } from "react-bootstrap";

const Track = () => {
  return (
    <div>
      {/* Call to Action */}
      <Container className="text-center py-5">
        <h3>Ready to Track Smarter?</h3>
        <p>Join Dev-Tracker today and simplify your development journey.</p>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default Track;
