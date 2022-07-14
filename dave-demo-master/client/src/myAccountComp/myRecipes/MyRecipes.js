import HomeBody from '../../components/homeBody/HomeBody';
import './myRecipes.css';
const MyRecipes = ({recipes}) => {
    return ( 
        <div className="container-recipes">
  
        <div className="recipe">
          {recipes && recipes.map((recipe, i) =>
          (
            <HomeBody key={i} index={i}
              image={recipe.imgUrl} label={recipe.recipename} dishType={recipe.mealType} recipe={recipe}
            />
          ))}
        </div>
      </div>
     );
}



export default MyRecipes;