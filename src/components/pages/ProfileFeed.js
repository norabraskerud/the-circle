import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { BASE_API, PROFILES_PATH } from "../../constants/api";
import { OPTIONS } from "../../constants/options";
import NavBar from "../layout/Nav";
import banner from "../../images/banner (2).png";
import blankProfile from "../../images/profile.png";

export default function ProfileFeed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = BASE_API + PROFILES_PATH;
      const response = await axios.get(url, OPTIONS);
      console.log("response", response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <h1>Users</h1>
          {data.map((profile) => (
            <Link to={`/profile/${profile.name}`}>
              <Card className="item" style={{ width: "auto" }}>
                <Card.Body className="profileFeedItem">
                  {profile.banner === null || profile.banner === "" ? (
                    <Card.Img src={banner} alt={profile.author} />
                  ) : (
                    <Card.Img
                      src={profile.banner}
                      alt={profile.author}
                      className="bannerImg"
                    />
                  )}
                  {profile.avatar === null || profile.avatar === "" ? (
                    <Card.Img
                      src={blankProfile}
                      alt={profile.name}
                      className="img-fluid rounded-circle"
                    />
                  ) : (
                    <Card.Img
                      src={profile.avatar}
                      alt={profile.name}
                      className="img-fluid rounded-circle"
                    />
                  )}
                  <div className="user">
                    <Card.Title>{profile.name}</Card.Title>
                    <Card.Text>{profile._count.followers} followers</Card.Text>
                    <Card.Text>{profile._count.following} following</Card.Text>
                    <Card.Text> </Card.Text>
                  </div>
                  
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
