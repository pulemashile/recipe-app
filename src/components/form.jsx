import React, { useState } from 'react';

function Form({ search, setSearch, setFilteredRecipes, addRecipe }) {
  const [newRecipe, setNewRecipe] = useState({ label: '', image: '', source: '', ingredients: '' });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Notify parent component to filter recipes
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
    // Add new recipe using the passed down function
    addRecipe(newRecipe);
    // Reset form
    setNewRecipe({ label: '', image: '', source: '', ingredients: '' });
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          value={search} 
          onChange={handleInputChange} 
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h2>Add New Recipe</h2>
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
          <textarea 
            name="ingredients" 
            value={newRecipe.ingredients}
            onChange={handleNewRecipeChange}
            placeholder="Ingredients (comma separated)"
          />
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
