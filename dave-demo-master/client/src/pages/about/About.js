import { dividerClasses } from "@mui/material";

import "./About.css";

import strauss from "../../img/strausscampus_logo.png";
import hac from "../../img/hac_logo.png"

const About = () => {
    return (  
        <div className="about">
            <h1>About this website</h1>
            <hr></hr>
            <img src={hac}></img>

            <h2>This website has been developed in the context of students final project at Hadassah Academic College.</h2>
            <p>This website has been developed by two engineering computer students, Nethanel Gak and David Nyssen in the contect of the final project.</p>
            <p>We want to thank the director Yoram Biberman and all of our teacher we could meet.</p>
            <img src={strauss}></img>

        </div>
    );
}
 
export default About;