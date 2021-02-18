import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://burgerbuilderfun-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((obj) => {
        dispatch(setIngredients(obj.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
