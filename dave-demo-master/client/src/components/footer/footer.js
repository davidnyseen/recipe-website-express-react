import './footer.css';
import React, { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import strauss from "../../img/strausscampus_logo.png";
import hac from "../../img/hac_logo.png"






const Footer = () => {

    let navigate = useNavigate();

    function redirect(type) {
        navigate("categories/" + type, { state: type });
    }


    return (
        <footer>
            <div className="footer-container">
                <ul>
                    <h1>Categories</h1>
                    <div className="list-container">
                        <li><a href="" onClick={() => redirect(`breakfest`)}>Breakfast</a></li>
                        <li><a href="" onClick={() => redirect(`lunch`)}>Lunch</a></li>
                        <li><a href="" onClick={() => redirect(`dinner`)}>Dinner</a></li>
                    </div>
                </ul>
                <div className="footer-about">
                    <h1>About the project</h1>
                    <p>This website has been developed in the context of students final project at Hadassah Academic College.
                        We want to thank the director Yoram Biberman and all of our teacher we could meet.
                    </p>
                </div>
                <div className="footer-img">
                    <img src={hac}></img>
                    <img className="strauss-img" src={strauss}></img>
                </div>
            </div>
            <hr></hr>
            <div className="extra">
                <p>Hadassah Academic College - Jerusalem | Strauss Campus - Jerusalem</p>
            </div>
        </footer>
    )

}


export default Footer;