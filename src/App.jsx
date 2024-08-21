import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import RecipeCard from './components/recipecard'; // Import the RecipeCard component
import { RiAddLine, RiDeleteBin7Line, RiPencilLine, RiSaveLine } from '@remixicon/react';

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
      setFilteredRecipes(response.data);
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

  const openModal = (image) => {
    // Implement modal opening logic here if needed
    console.log('Open modal for image:', image);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <h1 className="app-title">Recipe App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Form search={search} setSearch={setSearch} setFilteredRecipes={filterRecipes} addRecipe={addRecipe} />
                <div className="recipes-container">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      updateRecipe={updateRecipe} 
                      deleteRecipe={deleteRecipe} 
                      openModal={openModal} // Pass openModal function to RecipeCard
                    />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
