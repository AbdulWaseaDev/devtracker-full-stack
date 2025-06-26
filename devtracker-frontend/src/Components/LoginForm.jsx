import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, { resetForm, setSubmitting }) => {
    setLoginError(null);
    try {
      const response = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setLoginSuccess(true);
      resetForm();
      // After showing success message, navigate to dashboard
      setTimeout(() => {
        setLoginSuccess(false);
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setLoginError(err.message);
      setLoginSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div style={{ width: "65%" }}>
        <h3 className="mb-4 text-center">🔐 Login Form</h3>

        <Formik
          validationSchema={schema}
          onSubmit={handleLogin}
          initialValues={{ email: "", password: "" }}
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
              className="border rounded p-4 shadow-sm"
            >
              {loginSuccess && (
                <Alert variant="success">✅ Logged in successfully!</Alert>
              )}
              {loginError && <Alert variant="danger">⚠️ {loginError}</Alert>}

              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Authenticating..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default LoginForm;
