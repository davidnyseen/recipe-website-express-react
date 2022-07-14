import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import "./login.css";
import { getLogin } from "../../store/loginReducer";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const { login } = useSelector((state) => state.login);
    let navigate = useNavigate(); // like href

    const [emailRes, setEmailRes] = useState("");
    const [passwordRes, setPasswordRes] = useState("");
    const [emailErr, setemailErr] = useState("");
    const [passwordErr, setpasswordErr] = useState("");
    useEffect(() => {
        setemailErr('');
        setpasswordErr('');
    }, [emailRes, passwordRes])
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getLogin({ emailRes, passwordRes }))
    }
    useEffect(() => {
        if (login.user) {
            navigate('/');
        }
        if (login.errors) {
            setemailErr(login.errors.email);
            setpasswordErr(login.errors.password);
        }
    }, [login])

    return (
        <div className="mybody">
            <div className="center">
                <h1>Login</h1>
                <form method="post" onSubmit={handleClick}>
                    <div className="txt_field">
                        <input type="text" required name="email"
                            value={emailRes} placeholder="Email"
                            onChange={(e) => setEmailRes(e.target.value)} />
                        <div className="email error">{emailErr}</div>

                        <span></span>
                        {/* <label>Email</label> */}
                    </div>
                    <div className="txt_field">
                        <input type="password" name="password"
                            value={passwordRes} placeholder="Password"
                            onChange={(e) => setPasswordRes(e.target.value)} />
                        <div className="password error">{passwordErr}</div>
                        <span></span>
                    </div>
                    <input type="submit" value="Login" />

                    <div className="signup_link" >
                        Not a member?  
                        <Link to="/register" style={{'marginLeft':'15px'}}>signup</Link>
                    </div>
                </form >
            </div>
        </div>
    );
}

export default Login;