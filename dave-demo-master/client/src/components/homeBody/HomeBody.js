import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, ListItem } from '@mui/material';
import './HomeBody.css'
import Rating from "../Rating/Rating"
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { saveRate } from "../../store/ratingReducer";
import { useState, useEffect } from 'react'




const HomeBody = ({ index, image, label, dishType, recipe, handleClick, updateIndex, triggerPopup, fromAPI, setFromAPIPopup, setRecRecipePopup }) => {
  let navigate = useNavigate(); // like href
  function goToSinglePage() {
    navigate(`/singlerecipe/${index}`);
  }
  // image, label, dishType
  //  recipe.recipe.image, recipe.recipe.label, recipe.recipe.dishType

  //ADDED SINCE 04/04/2022

  function updateContent() {
    handleClick(true);
    updateIndex(index);
    triggerPopup();
    setFromAPIPopup(fromAPI);
    setRecRecipePopup();
  }

  //ADDED SINCE 12/05/2022

  const dispatch = useDispatch();
  const rate = useSelector((state) => state.rate);

  const [cartRate, setCartRate] = useState(0);


  useEffect(() => {
    if (!fromAPI) {
      //dispatch(saveRate(recipe.ratingAverage));
      setCartRate(recipe.ratingAverage);
    }
  }, [cartRate])


  return (
    <div className="recipe">

      <div className="recipe-preview" >
        {/* <span>{recipe._links.self.href}</span> */}
        <Card sx={{ maxWidth: 340, height: 600 }}>
          <CardActionArea onClick={updateContent}>

            <CardMedia

              component="img"
              height="340"
              image={recipe.image ? recipe.image : recipe.imgUrl}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {recipe.label ? (recipe.label.substring()) : recipe.recipename}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <p>Cuisine type: {recipe.cuisineType ? recipe.cuisineType : ""}</p>
                <p>Meal type: {recipe.mealType}</p>
                <p>Author: { recipe.author ? recipe.author : recipe.source}</p>
                <p className="ratingSec">{fromAPI ? "" : <FaStar fontSize={25} />}{fromAPI ? "" : recipe.ratingAverage}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>);
}


export default HomeBody;