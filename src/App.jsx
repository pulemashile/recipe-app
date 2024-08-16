import { useState } from 'react';
import Form from './components/form';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipe = async () => {
    try {
      console.log(search);
      const response = await axios.get(`http://localhost:3000/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Recipe App</h1>
      <Form getRecipe={getRecipe} search={search} setSearch={setSearch} />
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
