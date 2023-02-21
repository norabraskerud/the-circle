import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FULL_API } from "../../constants/api";
import { OPTIONS } from "../../constants/options";
import NavBar from "../layout/Nav";
import HeroImage from "../../images/istockphoto-1323364309-170667a.jpg";

var url = FULL_API;

export default function Feed() {
  const [data, setData] = useState([]);

  url = url + `&limit=30&offset=0`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, OPTIONS);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>What's the Circle?</h1>
      <div className='index--hero'>
          <img src={HeroImage} alt="the circle hero"></img>
      </div>
      <div className="container">
      <p>The Circle is a social media platform designed for you to be able to share everything from your everyday life. This is the platform for you who are already in a circle or who have never participated in a circle. Here everyone is included and welcome to participate in the circle.</p>
        <br></br>
        <h2>What's the update?</h2>
        {data.map((post) => (
          <Card className="item">
            <br></br>
            <Card.Title>{post.title}</Card.Title>
            <Link to={`/post/${post.id}`}>
              <Card.Body>
                <div>
                  {post.media === null || post.media === "" ? (
                    <span></span>
                  ) : (
                    <Card.Img
                      className="feedImg"
                      src={post.media}
                      alt={post.title}
                    />
                  )}
                </div>
                <div className="profilBox">
                <Link className="profile" to={`/profile/${post.author.name}`}>
                  {post.author.name}
                </Link>
                </div>
                <br></br>
                
                <Card.Text key={post.id}>{post.body}</Card.Text>
                <div className="reactionsAndComments">
                  <div className="reactions">
                  <Card.Text className="commentLength">
                    {post.comments.length === 1
                      ? `${post.comments.length} comment`
                      : `${post.comments.length} comments`}
                  </Card.Text>
                    <Card.Text className="commentLength">
                      {post.reactions.length < 1 ? `0 reactions ` : ``}
                    </Card.Text>
                    {post.reactions.map((reaction, i) => (
                      <Card.Text className="emoji">{reaction.symbol}</Card.Text>
                    ))}
                  </div>
                  
                </div>
              </Card.Body>
            </Link>
            <Card className="ViewPost">
              <Link to={`/post/${post.id}`} className="btn">
                View Post
              </Link>
            </Card>
          </Card>
        ))}
      </div>
    </div>
  );
}
