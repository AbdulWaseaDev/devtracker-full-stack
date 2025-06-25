import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Button, Alert, Container } from "react-bootstrap";

const LoginForm = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div style={{ width: "65%" }}>
        <h3 className="mb-4 text-center">🔐 Login Form</h3>

        <Formik
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            setSubmittedData(values);
            setLoginSuccess(true);
            setTimeout(() => setLoginSuccess(false), 4000);
            resetForm();
          }}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <>
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="border rounded p-4 shadow-sm"
              >
                {loginSuccess && (
                  <Alert variant="success">✅ Logged in successfully!</Alert>
                )}

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

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>

              {submittedData && (
                <div className="mt-4">
                  <h6>📄 Submitted Data</h6>
                  <pre className="bg-light p-3 border rounded">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              )}
            </>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default LoginForm;
