const Recipes = require('./../models/recipe');
const fetch = require('node-fetch');

const findRecipe = async (serchVal) => {
    return await Recipes.find({ recipename: {"$regex": String(serchVal)} }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        return data;
      }
    });
  }
module.exports.getrecipe_post =  (req, res) => {
        console.log(req.body.value)
        let api = [];

          const serchVal = req.body.value;
        
        try {
          fetch(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${serchVal}&app_id=c08ba36f&app_key=2e5c98200b0dd0211ff9f285f249efb6`
          )
            .then((response) => response.json())
            .then (async (data) => {
              api = data;
              let recipesDb = [];
              recipesDb = await findRecipe(serchVal);

              recipesDb = recipesDb.sort(function(a,b)//WE SORT THE ARRAY IN DECREASING ORDER OF RATING
              {
                if(a.ratingAverage < b.ratingAverage) return 1;
                if(a.ratingAverage > b.ratingAverage) return -1;
                return 0;
              });
                            
              res.send({api, recipesDb}).status(200);
              return;
            }).catch(err => {throw new Error(err)});
        }
        catch (err) {
          res.status(400).send(err.message)
          return;
        }
}
