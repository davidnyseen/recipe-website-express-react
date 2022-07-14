import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const RecForm = ({ closeRecommendationForm }) => {

    const { login } = useSelector((state) => state.login);

    console.log(login);
    const curr_ID = login.id;

    const [favCuisineType, setFavCuisineType] = useState("American");
    const [excludedIngredient, setExcludedIngredient] = useState("Avocado");
    const [recipeTime, setRecipeTime] = useState("0.5");

    let preferences = { favCuisineType, excludedIngredient, recipeTime };

    const pref = useSelector((state) => state.recipes);



    async function handleSubmit(e) {
        e.preventDefault();
        console.log(curr_ID);
        const value = true;

        const sentValue = JSON.stringify({ value, curr_ID, preferences });

        fetch('/setRecommendation', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: sentValue,
        })
            .then((response) => {
                if (response.ok) {
                    console.log("wola");
                    console.log(response);
                    return response.json();
                }
                else {
                    throw new Error('Something went wrong when sending the form');
                }
            })
            .then((res) => {
                console.log(res.usrPreferences[0]);
            })
            .catch((error) => {
                console.log(error)
            });

        console.log("WOLAAAAA");
        closeRecommendationForm(true);
    }

    return (
        <div className="recommendationForm">
            <h1>Recommendation Form</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label className="recommendationLabel">What are your favorite cuisine type ?</label>
                <select className="recommendationInput" value={favCuisineType} onChange={(e) => setFavCuisineType(e.target.value)}>
                    <option value="American">American</option>
                    <option value="Italian">Italian</option>
                    <option value="Asian">Asian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="French">French</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Greek">Greek</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Thai">Thai</option>
                    <option value="German">German</option>
                    <option value="Moroccan">Moroccan</option>
                    <option value="Irish">Irish</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Israeli">Israeli</option>
                </select>
                <label className="recommendationLabel">Which ingredient do you want to exclude ?</label>
                <select className="recommendationInput" value={excludedIngredient} onChange={(e) => setExcludedIngredient(e.target.value)}>
                    <option value="Avocado">Avocado</option>
                    <option value="Banana">Banana</option>
                    <option value="Beef">Beef</option>
                    <option value="Fish">Fish</option>
                    <option value="Mayonnaise">Mayonnaise</option>
                    <option value="Mushroom">Mushroom</option>
                    <option value="Olive">Olive</option>
                    <option value="Onion">Onion</option>
                    <option value="Potato">Potato</option>
                    <option value="Sugar">Sugar</option>
                    <option value="Tomato">Tomato</option>
                </select>
                <label className="recommendationLabel">How much time do you want to spend on a recipe ?</label>
                <select className="recommendationInput" value={recipeTime} onChange={(e) => setRecipeTime(e.target.value)}>
                    <option value="0.5">half an hour</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1.5 hours</option>
                    <option value="2">2 hours</option>
                    <option value="2.5">2.5 hours</option>
                </select>
                <button className="sendrecommendations">Send</button>

            </form>
        </div>
    );
}

export default RecForm;