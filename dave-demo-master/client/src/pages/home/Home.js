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


import Header1 from '../../img/Header1.jpg'




const Home = () => {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);//WITH SOGRAIM
  const { value } = useSelector((state) => state.searchReducer);
  const [searchResult, setSearchResult] = useState("");
  const { login } = useSelector((state) => state.login);

  //TEST
  const recipesUser = useSelector((state) => state.recipes); //NO SOGRAIM
  console.log(recipes);
  console.log(recipesUser.recipesDb);

  const [fromAPIPopup, setFromAPIPopup] = useState(false);
  //END TEST

  console.log(value);

  useEffect(() => {
    //if(!login){ // getrecipes only if login state is false.
    console.log("Dispatching");
    dispatch(getRecipes(value)); // 

    //}
  }, [value]);


  //ADDED SINCE 04/04/2022
  const [displaySingle, setDisplaySingle] = useState(false);
  const [currentIndex, setIndex] = useState(-1);
  console.log(recipes);

  function setBack() {
    setDisplaySingle(false);
    togglePopup();

  }

  function reGetRecipes() {
    //dispatch(getRecipes(value)); // CHECK

  }
  
  function reGetRecommended() {
    getRecommendedRecipes(login.id);
  }

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  //ADDED SINCE 22/05/2022

  const [isRecommendationFormSet, setRecommendationForm] = useState(login.recommendations);

  const recStatus = useSelector((state) => state.recommendedReducer);


  function closeRecommendationForm(value) {
    //const sentValue = JSON.stringify({ value, curr_ID });

    /*fetch('http://localhost:5000/setRecommendation', {
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
          setRecommendationForm(true);
          return response.json();
        }
        else {
          throw new Error('Something went wrong when sending the form');
        }
      })
      .catch((error) => {
        console.log(error)
      });*/

    //setRecommendationForm(value);

    let currUsrID = login.id;

    dispatch(setStatus(true));
    getRecommendedRecipes(currUsrID);


  }

  const [gotResult, setGotResult] = useState([]);

  async function getRecommendedRecipes(currUsrID) {

    const sentValue = JSON.stringify({ currUsrID });

    fetch('/getRecommended', {
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
        console.log(res);
        dispatch(setRecommendedRecipes(res));
      })
      .catch((error) => {
        console.log(error)
      });
  }

 /* useEffect(() => {
    let currUsrID;
    console.log(login);
    if (login.id) {
      console.log("LOGGED IN, RETRIVING REC STATUS");//WE CHECK IF THE FORM IS FILLED OR NOT YET
      currUsrID = login.id;

      const sentValue = JSON.stringify({ currUsrID });


      fetch(process.env.REACT_APP_HEROKU_URL+'/getFormStatus', {
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
            return response.json();
          }
          else {
            throw new Error('Something went wrong when sending the form');
          }
        })
        .then((res) => {
          console.log("Heres the form status:");
          console.log(res);
          dispatch(setStatus(res));
          console.log(recStatus.status);
        })
        .catch((error) => {
          console.log(error)
        });

      if (recStatus.status) {
        console.log(currUsrID);
        getRecommendedRecipes(currUsrID);
      }
    }
  }, []);*///RECOMMENDATION TEMPORARY DISABLED

  const [recRecipePopup, setRecRecipePopup] = useState(false);

  return (
    <div className="container-recipes">
      <div className="all-recipes">
        <Search></Search>
        <h1>search results for:  <p style={{ 'color': 'rgb(13, 49, 82)', 'display': 'inline' }}>{value}</p></h1>
        <h1>RECIPES FROM USERS</h1>
        <div className="recipe">
          {recipesUser.recipesDb && recipesUser.recipesDb.map((recipe, i) =>
          (
            <HomeBody key={i} index={i}
              image={recipe.imgUrl} label={recipe.recipename}
              dishType="TEMP TEST" recipe={recipe}
              handleClick={setDisplaySingle}
              updateIndex={setIndex}
              triggerPopup={togglePopup}
              fromAPI={false}
              setFromAPIPopup={setFromAPIPopup}
              setRecRecipePopup={() => setRecRecipePopup(false)}
            />
          ))}
        </div>
        <h1>RECIPES FROM EDAMAM</h1>
        <div className="recipe">
          {recipes ? recipes && recipes.map((recipe, i) =>
          (
            <HomeBody key={i} index={i}
              image={recipe.recipe.image} label={recipe.recipe.label}
              dishType={recipe.recipe.dishType} recipe={recipe.recipe}
              handleClick={setDisplaySingle}
              updateIndex={setIndex}
              triggerPopup={togglePopup}
              fromAPI={true}
              setFromAPIPopup={setFromAPIPopup}
              setRecRecipePopup={() => setRecRecipePopup(false)}
            />
          )) : <div className='APIServersError'><h2>"EDAMAM SERVERS ARE NOT AVAILABLE FOR NOW. PLEASE TRY LATER"</h2></div>}
        </div>

        {/*<h1>RECOMMENDED RECIPES</h1>

        <div className="RecommendedRecipes">
          {login.id ?
            <div className="recipe">{recStatus.status ? recStatus.recommendedRecipes && recStatus.recommendedRecipes.map((recipe, i) =>
            (
              <HomeBody key={i} index={i}
                image={recipe.imgUrl} label={recipe.recipename}
                dishType="TEMP TEST" recipe={recipe}
                handleClick={setDisplaySingle}
                updateIndex={setIndex}
                triggerPopup={togglePopup}
                fromAPI={false}
                setFromAPIPopup={setFromAPIPopup}
                setRecRecipePopup={() => setRecRecipePopup(true)}
              />
            )) :
              <Popup content={<><RecForm closeRecommendationForm={closeRecommendationForm} /></>}></Popup>}
            </div> : ""}
            </div>*/}

        {isOpen && <Popup
          content={<>{!recRecipePopup ? <div> { fromAPIPopup ?
            <SingleRecipe recipe={recipes[currentIndex].recipe} goBack={setBack} fromAPI={true} reGetRecipes={reGetRecipes}></SingleRecipe>
            :
            <SingleRecipe recipe={recipesUser.recipesDb[currentIndex]} goBack={setBack} fromAPI={false} reGetRecipes={reGetRecipes}></SingleRecipe>}</div>
            :
            <SingleRecipe recipe={recStatus.recommendedRecipes[currentIndex]} goBack={setBack} fromAPI={false} reGetRecipes={reGetRecipes}></SingleRecipe>}
          </>}
          handleClose={togglePopup}
        />}


      </div>
    </div>
  );
}

export default Home;