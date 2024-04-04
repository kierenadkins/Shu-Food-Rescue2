import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Linking } from 'react-native';
import RecipeCard from '../Components/Recipes/RecipeCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RecipeSuggestionScreen({ route }) {
  const { Suggestions } = route.params;
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractData = async () => {
      try {
        const extract = Suggestions.map(recipe => ({
          id: recipe.id,
          title: recipe.title,
          usedIngredientCount: recipe.usedIngredientCount,
          image: recipe.image
        }));
        setExtractedData(extract);
        setLoading(false);
      } catch (error) {
        console.error('Error extracting data:', error);
      }
    };

    if (Suggestions.length > 0) {
      extractData();
    }
  }, [Suggestions]);

  const handleSubmit = async (index) => {
    try {
      const selectedRecipeId = extractedData[index].id;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${selectedRecipeId}/information?includeNutrition=false&apiKey=bb669c5585134f0190d176224339c9ed`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      const data = await response.json();

      if (data != null) {
        openURL(data.sourceUrl);
      }

    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <ScrollView>
      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>
        Based on your leftover food, please find attached the best recipes
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        extractedData.map((recipe, index) => (
          <TouchableOpacity key={recipe.id} onPress={() => handleSubmit(index)}>
            <RecipeCard recipe={recipe} />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
