import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from '../actions/meals'

const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: []
}

const mealsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
			if (existingIndex >= 0) {
				const updatedFavMeals = [...state.favoriteMeals];
				updatedFavMeals.splice(existingIndex, 1);
				return { ...state, favoriteMeals: updatedFavMeals };
			} else {
				const meal = state.meals.find(meal => meal.id === action.mealId);
				return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
			}
		case SET_FILTERS:
			const appliiedFilters = actions.filters;
			const updatedFilteredMeals = state.meals.filter(meal => {
				if (appliiedFilters.glutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (appliiedFilters.lactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (appliiedFilters.vegan && !meal.isVegan) {
					return false;
				}
				if (appliiedFilters.vegetarian && !meal.isVegetarian) {
					return false;
				}
				return true;
			});
			return { ...state, filteredMeals: updatedFilteredMeals };

		default: return state;

	}
	return state;
}

export default mealsReducer;