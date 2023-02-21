import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import banner from "../../images/banner (2).png";
import profile from "../../images/profile.png";
import { BASE_API, PROFILES_PATH } from "../../constants/api";
import { OPTIONS } from "../../constants/options";
import NavBar from "../layout/Nav";
import { Follow } from "./../ui/Follow";
import { Unfollow } from "./../ui/Unfollow";

export default function Profile() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let { name } = useParams();
  const url =
    BASE_API + PROFILES_PATH + name + `?_following=true&_followers=true`;
  const postUrl = BASE_API + PROFILES_PATH + name + `/posts`;
  const getName = window.localStorage.getItem("name");
  const [follow, setFollow] = useState([]);

  const followName = follow.map((follower) => follower.name);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(url, OPTIONS);
      const posts = await axios(postUrl, OPTIONS);
      console.log("response", response.data);
      console.log("post", posts.data);
      setData(response.data);
      setPosts(posts.data);
      setFollow(response.data.followers);
      setLoading(false);
    };
    fetchData();
  }, [postUrl, url]);

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <Card className="item1" style={{ width: "auto" }}>
            <Card.Body className="profileFeedItem">
              {data.banner === null || data.banner === "" ? (
                <Card.Img
                  src={banner}
                  alt={data.author}
                  className="bannerImg"
                />
              ) : (
                <Card.Img
                  src={data.banner}
                  alt={data.author}
                  className="bannerImg"
                />
              )}
              {data.avatar === null || data.avatar === "" ? (
                <Card.Img
                  src={profile}
                  alt={data.name}
                  className="img-fluid rounded-circle"
                />
              ) : (
                <Card.Img
                  src={data.avatar}
                  alt={data.name}
                  className="img-fluid rounded-circle"
                />
              )}

              <div className="user1">
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data._count.followers} followers</Card.Text>
                <Card.Text>{data._count.following} following</Card.Text>
                <div className="follow-button">
                  {followName.includes(getName) ? (
                    <Unfollow>Unfollow</Unfollow>
                  ) : (
                    <Follow>Follow</Follow>
                  )}
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
