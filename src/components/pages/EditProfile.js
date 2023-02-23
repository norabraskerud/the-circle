import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import NavBar from "../layout/Nav";
import profile from "../../images/profile.png";
import { BASE_API, PROFILES_PATH } from "../../constants/api";
import { OPTIONS } from "../../constants/options";

const schema = yup.object().shape({
  avatar: yup.string().url("Must be a valid URL"),
  banner: yup.string().url("Must be a valid URL"),
});

export default function EditProfile() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const navigate = useNavigate();
  const getToken = window.localStorage.getItem("token");
  const getName = window.localStorage.getItem("name");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const getUrl = BASE_API + PROFILES_PATH + `${getName}`;
      try {
        const result = await axios.get(getUrl, OPTIONS);
        console.log("response", result.data);
        reset({
          avatar: result.data.avatar,
          banner: result.data.banner,
        });
        setData(result.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    fetchProfile();
  }, [getName, getToken, reset]);

  async function onSubmit(info) {
    setSubmitting(true);
    setCreateError(null);
    console.log(info);
    const putUrl = BASE_API + PROFILES_PATH + getName + `/media`;
    try {
      const response = await axios({
        method: "put",
        url: putUrl,
        data: info,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
      navigate(`/myprofile`);
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
        <h1>Edit</h1>
        {data.avatar === null || data.avatar === "" ? (
          <img src={profile} alt={data.name} className="editAvatar" />
        ) : (
          <img src={data.avatar} alt={data.name} className="editAvatar" />
        )}
        <div className="UserInfo">
        <div className="profileName">
          <h2>Name:</h2>
          <h3>{data.name}</h3>
        </div>
        <div className="profileEmail">
          <h2>Email:</h2>
          <h3>{data.email}</h3>
        </div>
        </div>
<br></br>
<br></br>
        <h1 class="changeImgHead">Change image or avatar</h1>
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          {createError && <p className="formError">{createError}</p>}
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className="labelText">Avatar</Form.Label>
            <Form.Control
              className="formInput"
              {...register("avatar")}
              placeholder="Enter avatar link"
            />
            {errors.avatar && (
              <p className="formError">{errors.avatar.message}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className="labelText">Banner</Form.Label>
            <Form.Control
              className="formInput"
              {...register("banner")}
              placeholder="Enter banner link"
            />
            {errors.banner && (
              <p className="formError">{errors.banner.message}</p>
            )}
          </Form.Group>
          <button className="btn-save-changes">
            {submitting ? "Saving..." : "Save changes"}
          </button>
        </Form>
        
        <h1 class="createPost">Create Post</h1>
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
      {error && <div>Error</div>}
    </div>
  );
}

