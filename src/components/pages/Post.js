import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import { BASE_API, POST_PATH, FLAG_PATH } from "../../constants/api";
import { OPTIONS } from "../../constants/options";
import NavBar from "../layout/Nav";
import Reaction from "./../ui/Reaction";
import Comment from "./../ui/Comment";

function Post() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;
  const getName = window.localStorage.getItem("name");
  const commentUrl = BASE_API + POST_PATH + `/${id}/comment`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url, OPTIONS);
      console.log("data", response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const addComment = (text, replyToId) => {
    console.log("addComment", text, replyToId);
    const getToken = window.localStorage.getItem("token");

    const postData = async () => {
      const response = await axios({
        method: "post",
        url: commentUrl,
        data: {
          body: text,
          replyToId: replyToId,
        },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("data", response.data);
      window.location.reload();
    };
    postData();
  };

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <Card className="item" style={{ width: "auto" }}>
            <Card.Body>
              <Card.Text>
              <Card.Title>{data.title}</Card.Title>
                <Link className="profile" to={`/profile/${data.author.name}`}>
               <p> Posted by: {data.author.name}</p>
                </Link>
              </Card.Text>
              {data.media === null || data.media === "" ? (
                <span></span>
              ) : (
                <Card.Img
                  src={data.media}
                  alt={data.author}
                  className="postImage"
                />
              )}

              <Card.Text>{data.body}</Card.Text>
              {data.tags.map((tag) => (
                <div className="tags">
                  <Card.Text>#{tag}</Card.Text>
                </div>
              ))}
              <div className="reaction">
                {data.reactions.map((reaction) => (
                  <Card.Text className="emoji" >
                    {reaction.symbol}
                    {data.reactions.length < 1 ? `0 reactions` : ``}
                  </Card.Text>
                ))}
                <Reaction data={data.reactions} />
              </div>
              <h3>Comments:</h3>
              {data.comments.map((comment) => (
                <div>
                  <h3>{comment.owner}</h3>
                  <p>{comment.body}</p>
                </div>
              ))}
              <Comment submitLabel="Comment" handleSubmit={addComment} />
              {data.author.name === getName ? (
                <Link to={`/editpost/${data.id}`}>
                  <button className="editBtn">Edit post</button>
                </Link>
              ) : (
                <span></span>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Post;
