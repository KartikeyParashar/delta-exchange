import { NavLink, useHistory } from "react-router-dom";
import './Navbar.css';

function Navbar(props) {

  const history = useHistory();
  console.log(props.fullName);
  const redirectToSignupPage = () => {
    localStorage.clear();
    history.push("/signup");
    window.location.reload();
  }

  return (
    <div className="navbar">
      <NavLink to="/">DELTA-EXCHANGE</NavLink>
      <h4>
        Hello, {props.fullName}
      </h4>
      <div onClick={redirectToSignupPage}>Sign Out</div>
    </div>
  );
}

export default Navbar;
