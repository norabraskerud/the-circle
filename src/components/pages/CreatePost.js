import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { BASE_API, POST_PATH } from "../../constants/api";
import NavBar from "../layout/Nav";
import HeroImage from "../../images/istockphoto-1191719793-612x612.jpg";

const baseUrl = BASE_API + POST_PATH;
const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter some text"),
  tag: yup.array().ensure().nullable().required(),
  media: yup.string().url("Must be a valid URL"),
});

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(info) {
    setSubmitting(true);
    setCreateError(null);

    console.log(info);

    try {
      const getToken = window.localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: baseUrl,
        data: info,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
      navigate(`/post/${response.data.id}`);
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Create Post</h1>
        <div className='index--hero'>
          <img src={HeroImage} alt="the circle hero"></img>
    </div>
    <h2 class="TellUs">Tell us a story:</h2>
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          {createError && <p className="formError">{createError}</p>}
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="formInput"
              placeholder="Enter Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="formError">{errors.title.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              className="formInput"
              placeholder="Tags"
              {...register("tag")}
            />
            {errors.tag && <p className="formError">{errors.tag.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Featured image</Form.Label>
            <Form.Control
              className="formInput"
              placeholder="Image Link"
              {...register("media")}
            />
            {errors.media && (
              <p className="formError">{errors.media.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Body</Form.Label>
            <Form.Control
              className="formInput"
              placeholder="Enter Message"
              as="textarea"
              style={{ height: "100px" }}
              {...register("body")}
            />
            {errors.body && <p className="formError">{errors.body.message}</p>}
          </Form.Group>
          <button className="btn-create" variant="primary">
            {submitting ? "Creating..." : "Create"}
          </button>
        </Form>

      </div>
    </div>
  );
}
