export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavourtie = (id) => {
	return { type: TOGGLE_FAVORITE, mealId: id };
}