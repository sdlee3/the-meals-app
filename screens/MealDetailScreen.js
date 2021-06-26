import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavourtie } from '../store/actions/meals';

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	)
}
const MealDetailScreen = props => {
	const availableMeals = useSelector(state => state.meals.meals);
	const mealId = props.navigation.getParam('mealId');
	const currentMealIsFavorite = useSelector(state =>
		state.meals.favoriteMeals.some(meal => meal.id === mealId)
	);

	const selectedMeal = availableMeals.find(meal => meal.id === mealId);


	const dispatch = useDispatch();

	const toggleFavouriteHandler = useCallback(() => {
		dispatch(toggleFavourtie(mealId));
	}, [dispatch, mealId])

	useEffect(() => {
		props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
	}, [toggleFavouriteHandler]);

	useEffect(() => {
		props.navigation.setParams({ isFav: currentMealIsFavorite });
	}, [currentMealIsFavorite]);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>

			{selectedMeal.ingredients.map(ingredient => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}

			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map(step => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	);
}

MealDetailScreen.navigationOptions = (navigationData) => {
	// const mealId = navigationData.navigation.getParam('mealId');
	const mealTitle = navigationData.navigation.getParam('mealTitle');
	const toggleFavourtie = navigationData.navigation.getParam('toggleFav');
	const isFavorite = navigationData.navigation.getParam('isFav');
	// const selectedMeal = MEALS.find(meal => meal.id === mealId);

	return {
		headerTitle: mealTitle,
		headerRight: (() =>
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
				<Item title='Favorite'
					iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
					onPress={toggleFavourtie} />
			</HeaderButtons>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
});

export default MealDetailScreen;

