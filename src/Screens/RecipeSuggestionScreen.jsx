import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import RecipeCard from '../Components/Recipes/RecipeCard';

export default function RecipeSuggestionScreen({ route }) {
  // Extracting Suggestions array from route params
  const { Suggestions } = route.params;
  const [extactData, setExtactData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Log the suggestions array received from navigation
    const extract = Suggestions.map(recipe => ({
      title: recipe.title,
      usedIngredientCount: recipe.usedIngredientCount,
      image: recipe.image
    }));
  
    setExtactData(extract);
  }, [Suggestions]);
  
  useEffect(() => {
    console.log(extactData);
    if(extactData != null){
      setLoading(true);
    }
  }, [extactData]);
  

  return (
    <ScrollView>
      <Text className="text-sm text-balance text-center font-bold break-words">
        Based on your leftover food, please find attached the best recipes
      </Text> 
{!loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {extactData.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </>
      )}
    </ScrollView>
  );
  
}
