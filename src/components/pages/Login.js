import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { BASE_API, LOGIN_PATH } from "../../constants/api";

const url = BASE_API + LOGIN_PATH;
const EMAIL_REQUIRMENTS = /^[\w-.]+(@noroff.no|@stud.noroff.no)$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      EMAIL_REQUIRMENTS,
      "Your email doesn't match the criteria: must be a valid 'stud.noroff.no' or 'noroff.no' email address"
    )
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "The password must be at least 8 charcters long")
    .required("Please enter your password"),
});

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      window.localStorage.setItem("token", response.data.accessToken);
      window.localStorage.setItem("name", response.data.name);
      navigate("/feed");
    } catch (error) {
      console.log("error", error);
      setLoginError("Your email or password is wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {loginError && <p className="formError">{loginError}</p>}
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="formInput"
            {...register("email")}
            type="email"
            placeholder="Enter email"
          />
          {errors.email && <p className="formError">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="formInput"
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="formError">{errors.password.message}</p>
          )}
        </Form.Group>
        <p>
          Don't have an account?{" "}
          <Link className="link" to="/register">
            Register here!
          </Link>
        </p>
        <button className="btn">
          {submitting ? "Logging in..." : "Login"}
        </button>
      </Form>
    </div>
  );
}

export default Login;
