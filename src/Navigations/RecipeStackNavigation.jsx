import { createStackNavigator } from '@react-navigation/stack';
import Recipes from '../Screens/RecipeScreen';
import RecipeSuggestionScreen from '../Screens/RecipeSuggestionScreen';

const Stack = createStackNavigator();

export default function RecipeStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecipesScreen" component={Recipes} />
      <Stack.Screen name="Suggestions" component={RecipeSuggestionScreen} initialParams={{ Suggestions: [] }}/>
    </Stack.Navigator>
  );
}
