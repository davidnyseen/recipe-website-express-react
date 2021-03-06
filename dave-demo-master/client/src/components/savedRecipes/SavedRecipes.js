import CreateRecipe from "../../myAccountComp/createRecipe/CreateRecipe";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import UseProtectedFetch from '../../customHooks/UseProtectedFetch'
import fetchGet from '../../utils/fetchGet'
import "./savedRecipes.css";
import MyRecipes from '../../myAccountComp/myRecipes/MyRecipes';
import HomeBody from "../../components/homeBody/HomeBody";
import Popup from "../../components/Popup/Popup";
import SingleRecipe from "../../pages/singleRecipe/SingleRecipe";

const SavedRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const [log, setlog] = useState(false)
    let navigate = useNavigate(); // like href
    const { login } = useSelector((state) => state.login);
    let logd = false;

    // UseProtectedFetch(); // this is a protected route

    useEffect(() => {
        let cancel = false;
        fetchGet('/myAccount/savedRecipes')
            .then((res) => {
                if (cancel) return;
                if(res) setRecipes([...res]);
            })
        return () => {
            cancel = true
        }
    }, [])

    function getSavedRecipes() {
        let cancel = false;
        fetchGet('/myAccount/savedRecipes')
            .then((res) => {
                if (cancel) return;
                setRecipes([...res]);
                console.log(recipes);
            })
        return () => {
            cancel = true
        }
    }

    // console.log(recipes);

    //ADDED SINCE 06/04/2022
    const [displaySingle, setDisplaySingle] = useState(false);
    const [currentIndex, setIndex] = useState(-1);
    //   console.log(recipes);

    function setBack() {
        setDisplaySingle(false);
        togglePopup();
    }

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const [fromAPIPopup, setFromAPIPopup] = useState(false);
    const [recRecipePopup, setRecRecipePopup] = useState(false);




    return (
        <div className="myuploads">
            <div className="container-recipes">

                <div className="recipe">
                    {recipes[0] && recipes.map((recipe, i) =>
                    (
                        <HomeBody key={i} index={i}
                            image={recipe.imgUrl} 
                            label={recipe.recipename}
                            dishType={recipe.mealType} recipe={recipe}
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
                        <SingleRecipe recipe={recipes[currentIndex]} goBack={setBack} fromAPI={false} reGetRecipes={getSavedRecipes}></SingleRecipe>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
        </div>
    );
}

export default SavedRecipes;