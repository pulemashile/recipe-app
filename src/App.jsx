import { useState, useEffect } from 'react';
import Form from './components/Form'; // Ensure the path is correct
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      setRecipes(response.data);
      setFilteredRecipes(response.data); // Initially, display all recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const addRecipe = async (newRecipe) => {
    try {
      const response = await axios.post('http://localhost:3000/recipes', newRecipe);
      setRecipes([...recipes, response.data]);
      setFilteredRecipes([...recipes, response.data]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      await axios.put(`http://localhost:3000/recipes/${id}`, updatedRecipe);
      const updatedRecipes = recipes.map(recipe => (recipe.id === id ? updatedRecipe : recipe));
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const filterRecipes = (query) => {
    if (!query) {
      setFilteredRecipes(recipes);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filtered = recipes.filter(recipe =>
      recipe.label.toLowerCase().includes(lowerCaseQuery) ||
      recipe.source.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Recipe App</h1>
      <Form search={search} setSearch={setSearch} setFilteredRecipes={filterRecipes} addRecipe={addRecipe} />
      <div className="recipes-container">
        {filteredRecipes.map((recipe) => (
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
