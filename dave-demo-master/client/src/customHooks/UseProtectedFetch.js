import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginValue } from "../store/loginReducer";


const UseProtectedFetch = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate(); // like href
    const { login } = useSelector((state) => state.login);
    useEffect(() => {
        // I logged out these lines thet are not logiclly correct.
        // if (!login.user) {
        //     navigate('/');
        // }

        func();
    }, [])
        const func = async () => {
            try {
                const res = await fetch('/protctedroute',
                    { credentials: 'include', })
                const data = await res.json();
                // console.log('in handlelogout: = ' + data)
                if (!data) {
                    navigate('/Login');
                    return false;
                }
                else{
                    // jwt authorized
                    dispatch(loginValue({user : " "}));
                    return true;
                }
            }
            catch {
                console.log('cannt reach protected route');
                navigate('/');
                return false;
            }
        }
}

export default UseProtectedFetch;