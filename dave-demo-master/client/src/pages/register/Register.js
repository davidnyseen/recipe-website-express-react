import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import "./register.css";
import { useNavigate, Link } from "react-router-dom";
import { getSignup } from "../../store/signupReducer";
import { getLogin } from "../../store/loginReducer";

const Register = () => {
  const dispatch = useDispatch();
  const { signup } = useSelector((state) => state.signup);
  const { login } = useSelector((state) => state.login);

  console.log(signup);

  let navigate = useNavigate(); // like href
  const [name, setname] = useState("");
  const [emailRes, setEmailRes] = useState("");
  const [passwordRes, setPasswordRes] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passwordErr, setpasswordErr] = useState("");
  useEffect(() => {
    setemailErr('');
    setpasswordErr('')
  }, [name, emailRes, passwordRes])
  useEffect(() => {
    setemailErr('');
    setpasswordErr('')
  }, [])
  const handleClick = (e) => {
    e.preventDefault();
    console.log(emailRes);
    dispatch(getSignup({ emailRes, passwordRes, name }))

  }
  useEffect(() => {
    if(signup){
      dispatch(getLogin({ emailRes, passwordRes })) // also sign in after sign up
    }
  }, [signup])
  useEffect(() => {  // did i login?
  if((login.user)){
    navigate('/');
  }
  }, [login])

  useEffect(() => { // if there are  errors
    if (signup.errors) {
      setemailErr(signup.errors.email);
      setpasswordErr(signup.errors.password);
    }
  }, [signup])
  return (
    <div className="mybody">
      <div className="center">
        <h1>sign up</h1>
        <form onSubmit={handleClick} className="form2">
        <div className="txt_field">
            <input type="text" required name="name"
               placeholder="user name"
               value={name}
               onChange={(e) => setname(e.target.value)} />
            <span></span>
          </div>         
           <div className="txt_field">
            <input type="text" required name="email"
               placeholder="email"
                value={emailRes}
              onChange={(e) => setEmailRes(e.target.value)} />
            <div className="email error">{emailErr}</div>
            <span></span>
          </div>
          <div className="txt_field">
            <input type="password" name="password"
              value={passwordRes} placeholder="Password"
              onChange={(e) => setPasswordRes(e.target.value)} />
            <div className="password error">{passwordErr}</div>
            <span></span>
          </div>
          <input type="submit" value="sign up" />

          <div className="signup_link" >
            Already Have An Acount?
            <Link to="/login" style={{ 'marginLeft': '15px' }}>login</Link>
          </div>
        </form >
      </div>
    </div>
  );
}

export default Register;