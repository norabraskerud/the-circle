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
      <h1>About us</h1>
      <div className='index--hero'>
          <img src={HeroImage} alt="the circle hero"></img>
      </div>
      <div className="container">
      <p>The Circle is a social media platform designed for you to be able to share everything from your everyday life. This is the platform for you who are already in a circle or who have never participated in a circle. Here everyone is included and welcome to participate in the circle.</p>
        <br></br>
      </div>
    </div>
  );
}
