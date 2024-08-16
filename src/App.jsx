import { useState, useEffect } from 'react';
import Form from './components/Form'; // Ensure the path is correct
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ label: '', image: '', source: '', ingredients: [] });

  // Fetch recipes when component mounts
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const addRecipe = async () => {
    if (!newRecipe.label || !newRecipe.image || !newRecipe.source) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/recipes', newRecipe);
      setRecipes([...recipes, response.data]);
      setNewRecipe({ label: '', image: '', source: '', ingredients: [] }); // Reset form
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      await axios.put(`http://localhost:3000/recipes/${id}`, updatedRecipe);
      setRecipes(recipes.map(recipe => (recipe.id === id ? updatedRecipe : recipe)));
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Recipe App</h1>
      <Form search={search} setSearch={setSearch} addRecipe={addRecipe} setNewRecipe={setNewRecipe} />
      <button className="add-recipe-button" onClick={addRecipe}>Add Recipe</button>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <h3 className="recipe-title">{recipe.label}</h3>
            <img 
              className="recipe-image" 
              src={recipe.image} 
              alt={recipe.label} 
              onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
            />
            <p className="recipe-source">Source: {recipe.source}</p>
            <button className="update-button" onClick={() => updateRecipe(recipe.id, { ...recipe, label: 'Updated Recipe' })}>Update</button>
            <button className="delete-button" onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
