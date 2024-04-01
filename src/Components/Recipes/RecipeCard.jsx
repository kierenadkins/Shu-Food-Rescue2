import React from 'react';
import { View, Text, Image } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    <View>
      <Image source={{ uri: recipe.image }} style={{ width: 100, height: 100 }} />
      <Text>{recipe.title}</Text>
      <Text>Used Ingredient Count: {recipe.usedIngredientCount}</Text>
    </View>
  );
};

export default RecipeCard;
