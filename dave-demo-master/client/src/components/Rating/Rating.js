
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles"
import { useDispatch, useSelector } from "react-redux";
import { saveRate } from "../../store/ratingReducer";
import { useRef } from "react";
import { getRecipes } from "../../store/homeReducer";


const Rate = ({ curr_recipe, curr_ID, updateRate, currentRate, setDone, confirm, currentUser, currentUserID, updateCartRate, reGetRecipes }) => {
  const [rate, setRate] = useState(0);
  //console.log(curr_ID);
  const dispatch = useDispatch();
  //const rate = useSelector((state) => state.rate);
  //console.log(rate);
  console.log(currentRate);
  console.log(currentUserID);


  let object = { id: 0, name: "", rate: 0, comment: "" }


  console.log(curr_recipe);

  function submitRateToServer(userRating) {
    const rateValue = JSON.stringify({ userRating, curr_ID });
    console.log(userRating);

    fetch('/submitRating', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: rateValue,
    })
      .then((response) => {
        if (response.ok) {
          console.log("wola");
          return response.json();
        }
        else {
          throw new Error('Something went wrong when saving the rate');
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleRating(givenRating) {
    if (givenRating == rate) {
      setRate(0);//UPDATE STARS
      //updateCartRate(0);//UPDATE RATING AVERAGE
      /*object.name = currentUser;
      object.rate = 0;
      object.id = currentUserID;
      submitRateToServer(object);*/

    }
    else {
      setRate(givenRating);//UPDATE STARS
      //updateCartRate(givenRating);//UPDATE RATING AVERAGE
      /*object.name = currentUser;
      object.rate = givenRating;
      object.id = currentUserID;
      submitRateToServer(object);*/


    }
    /*setDone(false);
    confirm(true);*/
    //setRate(givenRating);
    //dispatch(saveRate(givenRating));
  }

  console.log(rate);

  //ADDED SINCE 16/05/22

  /*useEffect(() => {
    dispatch(saveRate(0));
  }, []);*/

  const [directions, setdirections] = useState(' ');

  console.log(directions);


  function sendRate() {
    console.log("SENT FROM USER" + currentUserID);
    object.name = currentUser;
    object.rate = rate;
    object.id = currentUserID;
    object.comment = directions;
    submitRateToServer(object);
    confirm(true);
    setDone(false);
    reGetRecipes();
  }



  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={(e) => {
                handleRating(givenRating)
                console.log("Rate updated");
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "000"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>

          </label>
        );

      })}
      <textarea rows="5" cols="50" name="comment" form="usrform"
        value={directions} placeholder="pizza"
        onChange={(e) => setdirections(e.target.value)}>
      </textarea>
      <button onClick={sendRate}>Send</button>
    </Container>
  );
};

export default Rate;