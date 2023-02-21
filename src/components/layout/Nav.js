import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavbarBrand } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Logo from "../../images/THECIRCLELOGO.png";
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    const doLogout = window.confirm("Are you sure you want to logout?");

    if (doLogout) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      navigate("/login");
    }
  };

  return (
    <Navbar className="fixed-top" expand="lg" bg="dark" variant="dark">
       <NavLink to="/">
       <NavbarBrand>
            <img src={Logo} alt="brand logo"></img>
          </NavbarBrand>
          </NavLink>   
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link>
            <Link to="/feed" className="navItem">
              Feed
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/myprofile" className="navItem">
              My Profile
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/TheCircle" className="navItem">
              The Circle
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/profile" className="navItem">
              Profiles
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/create" className="navItem">
              Create Post
            </Link>
          </Nav.Link>
          <Button variant="primary" onClick={logout} className="navItem">
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
