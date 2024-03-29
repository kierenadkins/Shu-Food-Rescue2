import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';

const IngredientInput = ({ value, onChangeText, onRemove, index }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={`Ingredient ${index + 1}`}
        value={value}
        onChangeText={onChangeText}
      />
      {index >= 2 && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButtonContainer}>
          <Text style={styles.removeButton}>x</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const SubmitButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, disabled && styles.disabledSubmitButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  );
};

const Recipes = () => {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [recipes, setRecipes] = useState();

  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 7) {
      setInputs([...inputs, ""]);
    }
  };

  const removeInput = (indexToRemove) => {
    if (indexToRemove >= 2) {
      setInputs(inputs.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${inputs.join(',')}&number=10&limitLicense=true&ranking=1&ignorePantry=true&apiKey=bb669c5585134f0190d176224339c9ed`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data);
      console.log('Recipes:', recipes);
      
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        {inputs.map((value, index) => (
          <IngredientInput
            key={index}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            onRemove={() => removeInput(index)}
            index={index}
          />
        ))}
        {inputs.length < 7 ? (
          <Text style={styles.addIngredientText} onPress={addInput}>
            Add Ingredient
          </Text>
        ) : (
          <Text style={styles.maxIngredientsText}>
            You have reached the max amount of ingredients
          </Text>
        )}
        <SubmitButton onPress={handleSubmit} disabled={inputs.length === 0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '5%',
  },
  borderContainer: {
    width: '95%',
    height: '95%',
    borderWidth: 1,
    borderColor: 'black',
    padding: '5%',
    borderRadius: 10,
    position: 'relative',
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  removeButtonContainer: {
    marginLeft: 10,
  },
  removeButton: {
    fontSize: 20,
    color: 'red',
  },
  submitButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: '50%',
    borderWidth: 1,
    borderColor: 'black',
  },
  disabledSubmitButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  addIngredientText: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  maxIngredientsText: {
    paddingTop: 10,
    color: 'red',
  },
});

export default Recipes;
