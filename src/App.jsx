import { useState } from 'react'
import Form from './components/form'
import axios from 'axios';
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const api_key = "50c88861438463d12cb1a85da4a020f2";
  const app_id = "e082e682";

  const getRecipe = async () => {
    try {
      console.log(search);
      const response = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
        params: {
          type: 'public',
          q: search,
          app_id: app_id,
          app_key: api_key,
        },
      });
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Recipe App</h1>
        <Form getRecipe={getRecipe} search={search} setSearch={setSearch} />
        <div>
          {recipes.map((recipe, index) => (
            <div key={index}>
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>{recipe.recipe.source}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;