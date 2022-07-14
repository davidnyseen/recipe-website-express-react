import React, { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import fetchGet from '../../utils/fetchGet'
import  fetchPost  from '../../utils/fetchPost';
import HomeBody from "../../components/homeBody/HomeBody";
import Popup from "../../components/Popup/Popup";
import SingleRecipe from "../singleRecipe/SingleRecipe";
import "./Categories.css"
import { useNavigate } from "react-router-dom";








const Categories = () => {

    let breakfest = "breakfest";
    let lunch = "lunch";

    const [test, setTest] = useState([]);
    const [lunchList, setLunchList] = useState([]);


    function getCategory (cat, func) {
        fetchPost('/getCategory', cat)
        .then(res => res.json())
        .then((res) => (
            //console.log(res);
            //setTest(res.result)
            func(res.result)
            ))
        .catch(err => (console.log("error getting recipes in home. err msg: "+ err.message))) 
    }

    useEffect(() => {
          getCategory(breakfest, setTest);
          
    }, []);

    useEffect(() => {
        getCategory(lunch, setLunchList);
    }, []);

    console.log(test);

    const [displaySingle, setDisplaySingle] = useState(false);
    const [currentIndex, setIndex] = useState(-1);
  
    function setBack() {
      setDisplaySingle(false);
      togglePopup();
    }
  
    const [isOpen, setIsOpen] = useState(false);
   
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const [fromAPIPopup, setFromAPIPopup] = useState(false);

    //ADDED SINCE 18/05/22

    let navigate = useNavigate();

    function redirect (type) {
      navigate(type, {state: type});
    }

    
    return ( 
        <div className="Categories">
        {/*<h1>Categories</h1>
        <div><h2>Breakfast</h2>
        </div>
        <div className="container-recipes">

            <div className="recipe">
                {test && test.map((breakfast, i) => 
                (
                    <HomeBody key={i} index={i}
                    image={breakfast.imgUrl} label={breakfast.recipename}
                    dishType={breakfast.mealType} recipe={breakfast}
                    handleClick={setDisplaySingle}
                    updateIndex={setIndex}
                    triggerPopup={togglePopup}
                    setFromAPIPopup={setFromAPIPopup}/>
                ))}
            </div>
        </div>
        
        <div><h2>Lunch</h2></div>
        <div className="container-recipes">

        <div className="recipe">
            {lunchList && lunchList.map((breakfast, i) => 
            (
                <HomeBody key={i} index={i}
                image={breakfast.imgUrl} label={breakfast.recipename}
                dishType={breakfast.mealType} recipe={breakfast}
                handleClick={setDisplaySingle}
                updateIndex={setIndex}
                triggerPopup={togglePopup}
                setFromAPIPopup={setFromAPIPopup}/>
            ))}
        </div>
        {isOpen && <Popup
            content={<>
                <SingleRecipe recipe={lunchList[currentIndex]} goBack={setBack} fromAPI={false}></SingleRecipe>
                </>}
            handleClose={togglePopup}
            />}
            </div>*/}
            <div className="row">
                <div className="column1" onClick={() => redirect(`breakfest`)}>
                    <h1>Breakfast</h1>
                </div>
                <div className="column2" onClick={() => redirect(`lunch`)}>
                    <h1>Lunch</h1>
                </div>
                <div className="column3" onClick={() => redirect(`dinner`)}>
                    <h1>Dinner</h1>
                </div>
          </div>
        </div>
     );
}
 
export default Categories;