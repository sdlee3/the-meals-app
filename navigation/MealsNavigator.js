import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator({
	Categories: CategoriesScreen,
	CategoryMeals: {
		screen: CategoryMealsScreen
	},
	MealDetails: MealDetailScreen
}, {
	defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
	Favourites: FavoritesScreen,
	MealDetails: MealDetailScreen
}, {
	defaultNavigationOptions: defaultStackNavOptions
});

const FiltersNavigator = createStackNavigator({
	Filters: FiltersScreen,
},{
	defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator, navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
			},
			tabBarColor: Colors.primaryColor
		}
	},
	Favourites: {
		screen: FavNavigator, navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
			},
			tabBarColor: Colors.accentColor
		}
	}
}

const MealsFavTabNavigator = Platform.OS === 'android'
	? createMaterialBottomTabNavigator(tabScreenConfig, {
		activeColor: 'white',
		shifting: true,
		barStyle: {
			backgroundColor: Colors.primaryColor
		}
	})
	: createBottomTabNavigator(tabScreenConfig, {
		tabBarOptions: {
			activeTintColor: Colors.accentColor
		}
	});

const MainNavigator = createDrawerNavigator({
	MealsFav: MealsFavTabNavigator,
	Filters: FiltersNavigator
});

export default createAppContainer(MainNavigator);