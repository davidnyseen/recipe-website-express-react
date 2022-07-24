import HomeBody from '../../components/homeBody/HomeBody';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../store/homeReducer";
import { searchValue } from "../../store/searchReducer";
import { useState, useEffect } from 'react'
import './Home.css'
import Search from '../../components/search/Search'
import { ClassNames } from '@emotion/react';
import SingleRecipe from '../singleRecipe/SingleRecipe';
import Popup from '../../components/Popup/Popup';
import { updateRate } from '../../store/homeReducer'
import { saveRate } from "../../store/ratingReducer";
import { setStatus } from '../../store/recommendedReducer';
import { setRecommendedRecipes } from '../../store/recommendedReducer';
import fetchGet from '../../utils/fetchGet';
import fetchPost from '../../utils/fetchPost';
import RecForm from '../../components/RecForm/RecForm.js';
import './Homeintro.css';
import footer from '../../components/footer/footer.js';


import Header1 from '../../img/Header1.jpg';

import recipeimg1 from '../../img/recipeimg1.png';
import recipeimg2 from '../../img/recipeimg2.png';
import recipeimg3 from '../../img/recipeimg3.png';




const Homeintro = () => {
    return (
        <div className="intro-container">
            <div className="alotofrecipes">
                <div className="details">
                    <hr></hr>
                    <div className="alot-desc">
                        <h1>
                            A lot of recipes.
                        </h1>
                        <p>
                            A large number of recipes is available. Take your time and pick the recipe you will enjoy the most.
                        </p>
                    </div>
                    <div className="alot-img">
                        <img className="big" src={recipeimg1}></img>
                        <div className="smalls">
                            <img className="one" src={recipeimg2}></img>
                            <img className="two" src={recipeimg3}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="differentcategories">
                <div className="details">

                    <div className="diffcat-desc">

                        <h1>
                            Different types of recipes.
                        </h1>
                        <p>
                            The recipes are divided into different categories then you can easily search for the more adapted recipes.
                        </p>

                    </div>
                    <div className="diffcat-img">
                        <img className="rec" src="https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/59/3d/9d/french-breakfast.jpg"></img>
                        <div className="space"></div>
                        <img className="rec" src={"https://images.pexels.com/photos/33162/food-restaurant-menu-asia.jpg?cs=srgb&dl=pexels-pixabay-33162.jpg&fm=jpg"}></img>
                        <div className="space"></div>
                        <img className="rec" src={"https://images.unsplash.com/photo-1463183547458-6a2c760d0912?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"}></img>

                    </div>
                </div>


            </div>
            <div className="shareyourrecipe">
                <div className="details">
                    <div className="share-desc">

                        <h1>
                            Share your recipes.
                        </h1>
                        <p>
                            Upload your recipe to the website and check for the feedback of other users.
                        </p>
                    </div>
                    <div className="share-img">
                        <img className="shr" src={recipeimg1}></img>

                    </div>
                </div>

            </div>
        </div>)

}

export default Homeintro;