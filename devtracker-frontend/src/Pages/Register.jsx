// src/components/FormExample.jsx
import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

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
  terms: yup.bool().oneOf([true], "Terms must be accepted"),
});

export default function FormExample() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ← new
  const navigate = useNavigate();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        name: "",
        email: "",
        password: "",
        avatar: "",
        jobTitle: "",
        location: "",
        bio: "",
        github: "",
        linkedin: "",
        terms: false,
      }}
      onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
        setErrorMessage(""); // clear previous

        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/register`,
            values,
            {
              withCredentials: true,
            },
          );
          setShowSuccess(true);
          resetForm();
          setTimeout(() => setShowSuccess(false), 5000);
          navigate("/dashboard/users");
        } catch (error) {
          const resp = error.response && error.response.data;

          // if you returned field errors:
          if (resp && resp.errors) {
            const apiErrors = {};
            resp.errors.forEach((e) => {
              apiErrors[e.field] = e.message;
            });
            setErrors(apiErrors);
          }
          // if you returned a message:
          if (resp && resp.message) {
            setErrorMessage(resp.message);
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="m-4 p-4 border rounded"
        >
          <h4 className="mb-4">User Registration Form</h4>

          {showSuccess && (
            <Alert variant="success">✅ Form submitted successfully!</Alert>
          )}

          {errorMessage && ( // ← new
            <Alert variant="danger">{errorMessage}</Alert>
          )}

          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group controlId="formEmail">
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
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formPassword">
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

          <Form.Group className="mb-3" controlId="formJobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              name="jobTitle"
              value={values.jobTitle}
              onChange={handleChange}
              isInvalid={!!errors.jobTitle && touched.jobTitle}
            />
            <Form.Control.Feedback type="invalid">
              {errors.jobTitle}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={values.location}
              onChange={handleChange}
              isInvalid={!!errors.location && touched.location}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBio">
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

          <Form.Group className="mb-3" controlId="formGithub">
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

          <Form.Group className="mb-3" controlId="formLinkedin">
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

          <Form.Group className="mb-3" controlId="formTerms">
            <Form.Check
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms && touched.terms}
              feedback={errors.terms}
              feedbackType="invalid"
            />
          </Form.Group>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting...." : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
