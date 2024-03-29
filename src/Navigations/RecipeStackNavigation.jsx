import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../Screens/RecipeScreen';
import RecipeSuggestionScreen from '../Screens/RecipeSuggestionScreen';
import RecipeViewScreen from '../Screens/RecipeViewScreen';

const Stack = createStackNavigator();

export default function RecipeStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen  name="Recipes" component={Recipes} />
      <Stack.Screen  name="Suggestions" component={RecipeSuggestionScreen} />
      <Stack.Screen  name="Recipe" component={RecipeViewScreen} />
    </Stack.Navigator>
  );
}