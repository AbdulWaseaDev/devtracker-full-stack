import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import * as formik from "formik";
import * as yup from "yup";

function FormExample() {
  const { Formik } = formik;
  const [submittedData, setSubmittedData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    jobTitle: yup.string().required("Job title is required"),
    location: yup.string().required("Location is required"),
    bio: yup.string().required("Bio is required"),
    github: yup
      .string()
      .url("Enter a valid URL")
      .required("GitHub link required"),
    linkedin: yup
      .string()
      .url("Enter a valid URL")
      .required("LinkedIn link required"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        setSubmittedData(values);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000); // auto-hide
        resetForm();
      }}
      initialValues={{
        name: "",
        email: "",
        password: "",
        jobTitle: "",
        location: "",
        bio: "",
        github: "",
        linkedin: "",
        terms: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <>
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="m-4 p-4 border rounded"
          >
            <h4 className="mb-4">User Registration Form</h4>

            {showSuccess && (
              <Alert variant="success">✅ Form submitted successfully!</Alert>
            )}

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormikName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="validationFormikPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password && touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormikJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={values.jobTitle}
                onChange={handleChange}
                isInvalid={!!errors.jobTitle && touched.jobTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobTitle}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormikLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={values.location}
                onChange={handleChange}
                isInvalid={!!errors.location && touched.location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.location}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormikBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={values.bio}
                onChange={handleChange}
                isInvalid={!!errors.bio && touched.bio}
              />
              <Form.Control.Feedback type="invalid">
                {errors.bio}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormikGithub">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                type="url"
                name="github"
                value={values.github}
                onChange={handleChange}
                isInvalid={!!errors.github && touched.github}
              />
              <Form.Control.Feedback type="invalid">
                {errors.github}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormikLinkedin">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="url"
                name="linkedin"
                value={values.linkedin}
                onChange={handleChange}
                isInvalid={!!errors.linkedin && touched.linkedin}
              />
              <Form.Control.Feedback type="invalid">
                {errors.linkedin}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms && touched.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormikTerms"
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit Form
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default FormExample;
