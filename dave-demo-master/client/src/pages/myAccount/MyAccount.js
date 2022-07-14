import CreateRecipe from "../../myAccountComp/createRecipe/CreateRecipe";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseProtectedFetch from '../../customHooks/UseProtectedFetch'
import fetchGet from '../../utils/fetchGet'
import "./myAccount.css";
import MyRecipes from '../../myAccountComp/myRecipes/MyRecipes';
import HomeBody from "../../components/homeBody/HomeBody";
import Popup from "../../components/Popup/Popup";
import SingleRecipe from "../singleRecipe/SingleRecipe";
import MyUploads from "../../components/myUploads/MyUploads";
import SavedRecipes from "../../components/savedRecipes/SavedRecipes";
const MyAccount = () => {

    const [myRecipes, setmyRecipes] = useState(true);
    const [mysavedRecipes, setmsavedRecipes] = useState(false)


    let navigate = useNavigate(); // like href

    UseProtectedFetch(); // this is a protected route
    let setuploads =() => {
        setmyRecipes(true)
        setmsavedRecipes(false)
    }
    let setsaved =() => {
        setmyRecipes(false)
        setmsavedRecipes(true);

    }

    return (
        <div>
            <nav className="main-nav">
                <ul>
                    <li className={myRecipes ? " currentBtn lili" : "lili"}
                     onClick={()=>setuploads()}>my uploads</li>
                    <li className={mysavedRecipes ? " currentBtn lili" : "lili"}
                    onClick={()=>setsaved()}>saved recipes</li>
        
                </ul>
            </nav>
        {myRecipes && <MyUploads></MyUploads>}
        {mysavedRecipes && <SavedRecipes></SavedRecipes>}
        </div>
    );
}

export default MyAccount;