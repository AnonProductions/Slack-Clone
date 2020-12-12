import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import "./Login.css";
import { useStateValue } from "./../../StateProvider";

const Login = () => {
  const [state, dispatch] = useStateValue();

  const singIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) =>
        dispatch({
          type: "SET_USER",
          user: res.user,
        })
      )
      .catch((err) => alert("There was an error, please try again later!"));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt="Slack"
        />
        <h1>Signin to Fireship.io Slack space</h1>
        <p>fireship.slack.com</p>
        <Button onClick={singIn}>Signin with Google</Button>
      </div>
    </div>
  );
};

export default Login;
