import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Feed from "./components/pages/Feed";
import Post from "./components/pages/Post";
import Profile from "./components/pages/Profile";
import MyProfile from "./components/pages/MyProfile";
import ProfileFeed from "./components/pages/ProfileFeed";
import CreatePost from "./components/pages/CreatePost";
import EditPost from "./components/pages/EditPost";
import EditProfile from "./components/pages/EditProfile";
import TheCircle from "./components/pages/TheCircle";




function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/TheCircle" element={<TheCircle />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/profile/:name" element={<Profile />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/profile" element={<ProfileFeed />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/editpost/:id" element={<EditPost />} />
      <Route path="/editprofile" element={<EditProfile />} />
    
    </Routes>
    
  );
}

export default App;