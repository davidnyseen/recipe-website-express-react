import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './singleRecipe.css'
import { useEffect, useState } from "react";
import Rating from "../../components/Rating/Rating.js"
import { saveRate } from "../../store/ratingReducer"
import fetchPost from '../../utils/fetchPost';
import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";


import starLogo from '../../img/Star1.png';
import favLogo from '../../img/Fav1.png'
import comLogo from '../../img/Comm1.png'




const SingleRecipe = ({ recipe, goBack, fromAPI, curr_ID, reGetRecipes }) => {
    /*let params = useParams();
    const { recipes } = useSelector((state) => state.recipes);
    let recipe = recipes[params.singlerecipeid];*/

    //console.log(recipe.image);

    //UPDATED SINCE 12/04/2022
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const rate = useSelector((state) => state.rate);

    let value = "Pizza";

    const initialRender = useRef(true);

    const [cartRate, setCartRate] = useState(0);


    useEffect(() => {
        if (!fromAPI) {
            /*if (initialRender.current == true) {
                //window.scrollTo(0, 0);
                console.log(rate);

                fetchPost('http://localhost:5000', recipe._id)
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    console.log(json.recipesDb[0].ratingAverage);
                    dispatch(saveRate(json.recipesDb[0].ratingAverage));
                    //setRating(json.recipesDb[0].ratingAverage);
                })
                .catch(err => {
                    console.log("WOLA");
                });
                dispatch(saveRate(recipe.ratingAverage));
                initialRender.current = false;
            }*/
            if (initialRender.current == true) {
                setCartRate(recipe.ratingAverage);
                initialRender.current = false;
            }
        }
    }, [cartRate])

    console.log(fromAPI);
    console.log(recipe);

    //ADDED SINCE 08/05/22

    const [temp, setTemp] = useState(false);
    const [temp2, setTemp2] = useState(false);
    const [ratingDone, setRatingDone] = useState(false);
    const [cannotRate, setCannotRate] = useState(true);

    function test() {
        if (login.user) {
            setCannotRate(false);
        }
        setTemp(true);
        setTemp2(false);

    };


    const { login } = useSelector((state) => state.login);

    console.log(login);

    //ADDED SINCE 10/05/2022

    const [allRates, setAllRates] = useState([]);

    useEffect(() => {
        //if (initialRender.current == true) {
        //console.log("updatingAllrates");
        setAllRates(recipe.allRatings);
        //console.log(recipe.allRatings);
        // }
    }, [cartRate]);//TO FINISH - Next time, define object with id, name and rate, and pass it into state



    //ADDED SINCE 20/05/2022

    const [savedrecipe, setSaved] = useState(false);


    let addToFavrite = (e) => {
        console.log("in addToFavrite");
        setTemp(false);
        setTemp2(true);
        let value = recipe._id;
        fetchPost("/saverecipe", value)
            .then((res) => res.json())
            .then((res) => {
                if (res) setSaved(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="single-recipe">
            <div className="left">
                <button className="backButton" onClick={goBack}>Back</button>
                <div className="top-part">
                    <h1 className="recipeLabel">{recipe.label ? recipe.label : recipe.recipename}</h1>
                    <hr className="bar"></hr>
                    <h2 className="rating">{fromAPI ? "" : <FaStar fontSize={25} color={"#fabf84"} />} {fromAPI ? "" : recipe.ratingAverage} {/*<Rating curr_ID = {recipe._id} updateRate={setRating} currentRate={rating}/>*/}</h2>
                    <img className="recipeImg" src={recipe.images ? (recipe.images.LARGE ? recipe.images.LARGE.url : recipe.images.REGULAR.url) : recipe.imgUrl}></img>
                </div>
                <div className="bottom-part">
                    <div className="directionsDetails">
                        <h1 className="recDirections">Directions:</h1>
                        {recipe.directions ? recipe.directions : ""}
                    </div>
                </div>
            </div>
            <div className="right">
                {fromAPI ? "" : <div className="tab">
                    <div className="icons">
                        {fromAPI ? "" : <div className="column" onClick={test}>
                            <img className="logo" src={starLogo} ></img>
                        </div>}
                        {fromAPI ? "" : <div className="column" onClick={addToFavrite}>
                            <img className="logo" src={favLogo}></img>
                        </div>}
                    </div>
                </div>}
                <div className="icons-response">
                    <p>{temp ? <div>{login.user ? <Rating curr_recipe={recipe} curr_ID={recipe._id} updateRate={setRating} currentRate={rating} setDone={setTemp} confirm={setRatingDone}
                        currentUser={login.user} currentUserID={login.id} updateCartRate={setCartRate} reGetRecipes={() => reGetRecipes()} /> : <Link to="Login">Please login</Link>}</div> : ""}</p>
                    <p>{temp2 ? <div>{login.user ? "Saved" : <Link to="Login">Please login</Link>}</div> : ""}</p>
                    <p>{ratingDone ? "DONE" : ""}</p>
                </div>
                <div className="informations">
                    <p className="recipeAuthor">Author: {recipe.source ? recipe.source : recipe.author}</p>
                    <p className="type">Cuisine type: {recipe.cuisineType ? recipe.cuisineType : ""}</p>
                    <p className="mealType">Meal type: {recipe.mealType}</p>
                    <p className="prepTime">Preparation time: {recipe.totalTime ? recipe.totalTime : recipe.preparationtime} hour</p>
                </div>
                <div className="ingredientsDetails">
                    <h1>Ingredients:</h1>
                    <ol>{recipe.ingredientLines ? (recipe.ingredientLines && recipe.ingredientLines.map((step, i) =>
                        (<li>{step}</li>))) : (recipe.ingredients && recipe.ingredients.map((step, i) => (<li>{step}</li>)))}</ol>
                </div>
                {fromAPI ? "" : <div className="ratingsAndComments">
                    {recipe.allRatings.length > 0 ? <h1>Reviews</h1> : ""}
                    {recipe.allRatings && recipe.allRatings.map((element, i) => (
                        <div className="usrReaction" key={i}>
                            <p className="usrName">{element.name}</p>
                            <div className="usrRateAndComment">
                                <p className="rateElement"><FaStar fontSize={25} />{element.rate}</p>
                                <p className="rateElement">{element.comment}</p>
                            </div>
                            <hr></hr>
                        </div>
                    ))}
                </div>}
            </div>
        </div>

    );
}

export default SingleRecipe;
