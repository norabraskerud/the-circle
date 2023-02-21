import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import banner from "../../images/banner (2).png";
import profile from "../../images/profile.png";
import { BASE_API, PROFILES_PATH } from "../../constants/api";
import { OPTIONS } from "../../constants/options";
import NavBar from "../layout/Nav";

export default function MyProfile() {
  const [info, setInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const getName = window.localStorage.getItem("name");
      const url = BASE_API + PROFILES_PATH + `${getName}`;
      const postUrl = url + `/posts`;
      try {
        const response = await axios.get(url, OPTIONS);
        const result = await axios.get(postUrl, OPTIONS);
        console.log("response", response.data);
        console.log("response", result.data);
        setInfo(response.data);
        setPosts(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  if (error) return <div>error</div>;
  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <Card className="item1" style={{ width: "auto" }}>
            <Card.Body className="profileFeedItem">
             

              {info.avatar === null || info.avatar === "" ? (
                <Card.Img
                  src={profile}
                  alt={info.name}
                  className="img-fluid rounded-circle1"
                />
              ) : (
                <Card.Img
                  src={info.avatar}
                  alt={info.name}
                  className="img-fluid rounded-circle1"
                />
              )}
              <div className="user1">
                <Card.Title>{info.name}</Card.Title>
                <Card.Text>{info._count.followers} followers</Card.Text>
                <Card.Text>{info._count.following} following</Card.Text>
                <div className="editButton">
                <Link to="/editprofile">
                  <button className="btn-edit">Edit profile</button>
                </Link>
                </div>
              </div>
            </Card.Body>
            {posts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <Card>
                  <Card.Body>
                    {post.media === null || post.media === "" ? (
                      <span></span>
                    ) : (
                      <Card.Img
                        src={post.media}
                        alt={post.title}
                        className="profileBanner"
                      />
                    )}
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    <Card.Text>{post._count.reactions} reactions</Card.Text>
                    <Card.Text>{post._count.comments} comments</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}


