import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const UseProtectedFetch = () => {
    let navigate = useNavigate(); // like href
    const { login } = useSelector((state) => state.login);
    useEffect(() => {
        if (!login.user) {
            navigate('/');
        }

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