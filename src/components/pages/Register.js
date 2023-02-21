import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { BASE_API, REGISTER_PATH } from "../../constants/api";
import HeroImage from "../../images/istockphoto-1323364309-170667a.jpg";

const url = BASE_API + REGISTER_PATH;
const USERNAME_REQUIRMENTS = /^[a-zA-Z0-9_]+$/;
const EMAIL_REQUIRMENTS = /^[\w-.]+(@noroff.no|@stud.noroff.no)$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      USERNAME_REQUIRMENTS,
      "Your name must not contain punctuation symbols apart from underscore"
    )
    .required("Please enter your username"),
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

export default function SignUp() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    window.confirm("You will have to login with your new account!");
    setSubmitting(true);
    setLoginError(null);
    console.log(data);
    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      setLoginError("Your username is already in use. Please select another.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <p className="centeredText">
        Register now to join the Circle
      </p>
      <div className='index--hero'>
          <img src={HeroImage} alt="the circle hero"></img>
      </div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        {loginError && <p>{loginError}</p>}
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="formInput"
            {...register("name")}
            type="username"
            placeholder="Username"
          />
          {errors.name && <p className="formError">{errors.name.message}</p>}
        </Form.Group>
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
          Already have an account?{" "}
          <Link className="link" to="/login">
            Sign in here!
          </Link>
        </p>
        <button className="btn">
          {submitting ? "Signing in..." : "Sign up"}
        </button>
      </Form>
    </div>
  );
}
