import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { BASE_API, POST_PATH, FLAG_PATH } from "../../constants/api";
import NavBar from "../layout/Nav";
import { OPTIONS } from "../../constants/options";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter some text"),
  tags: yup.array().ensure().nullable(),
  media: yup.string().url("Must be a valid URL"),
});

export default function EditPost() {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, OPTIONS);
        console.log(response.data);
        reset({
          title: response.data.title,
          body: response.data.body,
          tags: response.data.tags,
          media: response.data.media,
        });
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [reset, url]);

  async function onSubmit(data) {
    setSubmitting(true);
    setCreateError(null);
    console.log(data);
    const getToken = window.localStorage.getItem("token");
    const postUrl = BASE_API + POST_PATH + `/${id}`;
    try {
      const response = await axios({
        method: "put",
        url: postUrl,
        data: data,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
      navigate("/myProfile");
    }
  }

  async function deletePost() {
    const getToken = window.localStorage.getItem("token");
    const postUrl = BASE_API + POST_PATH + `/${id}`;
    try {
      const doDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (doDelete) {
        await axios({
          method: "delete",
          url: postUrl,
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });
        navigate(`/myprofile`);
      }
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Edit Post</h1>
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          {createError && <p className="formError">{createError}</p>}
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="formInput"
              {...register("title")}
              placeholder="Change Title"
            />
            {errors.title && (
              <p className="formError">{errors.title.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              className="formInput"
              {...register("tag")}
              placeholder="Change Tags"
            />
            {errors.email && (
              <p className="formError">{errors.email.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Featured image</Form.Label>
            <Form.Control
              className="formInput"
              {...register("media")}
              placeholder="Change Image"
            />
            {errors.media && (
              <p className="formError">{errors.media.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Body</Form.Label>
            <Form.Control
              className="formInput"
              as="textarea"
              style={{ height: "100px" }}
              {...register("body")}
              placeholder="Change Contents"
            />
            {errors.body && <p className="formError">{errors.body.message}</p>}
          </Form.Group>
          <button className="btn">
            {submitting ? "Updating..." : "Update"}
          </button>
          <button onClick={deletePost} className="deleteBtn">
            {submitting ? "Deleting..." : "Delete"}
          </button>
        </Form>
      </div>
      {error && <div>Error</div>}
    </div>
  );
}
