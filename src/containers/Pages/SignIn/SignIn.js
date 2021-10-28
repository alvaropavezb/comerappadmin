import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "@iso/components/uielements/input";
import Checkbox from "@iso/components/uielements/checkbox";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import FirebaseLoginForm from "../../FirebaseForm/FirebaseForm";
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/actions";
import Auth0 from "../../Authentication/Auth0/Auth0";
import logoComer from "@iso/assets/images/comerLogo.png";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "@iso/lib/firebase/firebase.authentication.util";
import SignInStyleWrapper from "./SignIn.styles";

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [helperMessage, setHelperMessage] = React.useState("");

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  function handleLogin(e, token = false) {
    e.preventDefault();

    if (email == "admin@comerapp.nz" && password == "admin") {
      if (token) {
        dispatch(login(token));
      } else {
        dispatch(login());
      }
      dispatch(clearMenu());
      history.push("/dashboard");
    }else{
      setHelperMessage("Email or Password Incorrect")
    }
  }
  let { from } = location.state || { from: { pathname: "/dashboard" } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <img style={{ width: 300, height: 100 }} src={logoComer}></img>
            </Link>
          </div>
          <div className="isoSignInForm">
            <form>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Username"
                  autoComplete="true"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div style={{color:"red"}}  role="alert">{helperMessage}</div>
    
              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button
                  style={{ backgroundColor: "black" }}
                  type="primary"
                  onClick={handleLogin}
                >
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
