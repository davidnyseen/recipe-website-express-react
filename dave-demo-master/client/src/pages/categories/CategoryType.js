import React, { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import fetchGet from '../../utils/fetchGet'
import fetchPost from '../../utils/fetchPost';
import { useParams } from "react-router-dom";
import HomeBody from "../../components/homeBody/HomeBody";
import { useLocation } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';
import SingleRecipe from "../singleRecipe/SingleRecipe";





const CategoryType = () => {

    let params = useParams();
    const location = useLocation();

    const [displaySingle, setDisplaySingle] = useState(false);
    const [currentIndex, setIndex] = useState(-1);
    const [fromAPIPopup, setFromAPIPopup] = useState(false);
    const [recRecipePopup, setRecRecipePopup] = useState(false);



    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    function setBack() {
        setDisplaySingle(false);
        togglePopup();
      }


    console.log(location.state);

    const [result, setResult] = useState([]);

    function getCategory(cat, func) {
        fetchPost('/getCategory', cat)
            .then(res => res.json())
            .then((res) => {
                //console.log(res);
                //setTest(res.result)
                if(res)
                    func(res.result)
            })
            .catch(err => (console.log("error getting recipes in home. err msg: " + err.message)))
    }

    useEffect(() => {
        getCategory(location.state, setResult);

    }, []);

    return (
        <div className="CategoryType">
            <div className="container-recipes">
                <div className="recipe">
                    {result && result.map((cat, i) =>
                    (
                        <HomeBody key={i} index={i}
                            image={cat.imgUrl} label={cat.recipename}
                            dishType={cat.mealType} recipe={cat}
                            handleClick={setDisplaySingle}
                            updateIndex={setIndex}
                            triggerPopup={togglePopup}
                            setFromAPIPopup={setFromAPIPopup}
                            setRecRecipePopup={() => setRecRecipePopup(true)}
                            />

                    ))}
                </div>
                {isOpen && <Popup
                    content={<>
                        <SingleRecipe recipe={result[currentIndex]} goBack={setBack} fromAPI={false} reGetRecipes={getCategory}></SingleRecipe>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
        </div>
    );
}

export default CategoryType;