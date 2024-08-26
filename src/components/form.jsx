import React, { useState } from 'react';
import { RiAddLargeLine, RiSearchEyeLine } from '@remixicon/react';

function Form({ search, setSearch, setFilteredRecipes, addRecipe }) {
  const [newRecipe, setNewRecipe] = useState({ label: '', image: '', source: '', ingredients: '' });
  const [error, setError] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilteredRecipes(search);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleNewRecipeChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (!newRecipe.label || !newRecipe.image || !newRecipe.source || !newRecipe.ingredients) {
      setError('All fields are required.');
      return;
    }
    setError('');
    addRecipe(newRecipe);
    setNewRecipe({ label: '', image: '', source: '', ingredients: '' });
  };

  return (
    <div className='loginform1'>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          value={search} 
          onChange={handleInputChange} 
          placeholder="Search..."
        />
        <button className="search" type="submit"><RiSearchEyeLine/></button>
      </form>

      <div className='loginform1'>
        <h2>Show us what you can do! Add your recipes here and find them later on. Have fun while you are at it!</h2>
        <form onSubmit={handleAddRecipe}>
          <input 
            type="text" 
            name="label" 
            value={newRecipe.label}
            onChange={handleNewRecipeChange}
            placeholder="Label" 
          />
          <input 
            type="text" 
            name="image" 
            value={newRecipe.image}
            onChange={handleNewRecipeChange}
            placeholder="Image URL" 
          />
          <input 
            type="text" 
            name="source" 
            value={newRecipe.source}
            onChange={handleNewRecipeChange}
            placeholder="Source" 
          />
          <input 
            type="text" 
            name="ingredients" 
            value={newRecipe.ingredients}
            onChange={handleNewRecipeChange}
            placeholder="Ingredients (comma separated)" 
          />
          {error && <p className="error">{error}</p>}
          <button className="search" type="submit"><RiAddLargeLine /></button>
        </form>
      </div>
    </div>
  );
}

export default Form;
