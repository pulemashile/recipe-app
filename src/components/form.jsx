import React, { useState } from 'react';
import { RiAddLargeLine, RiAddLine, RiDeleteBin7Line, RiPencilLine, RiSearchEyeLine} from '@remixicon/react'

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
    <div className='loginform1'>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          value={search} 
          onChange={handleInputChange} 
          placeholder="Search..."
        />
        <button  className="search" type="submit"><RiSearchEyeLine/></button>
      </form>

      <div className='loginform1'>
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
          <div ><input className='loginform1'
          type="text"
            name="ingredients" 
            value={newRecipe.ingredients}
            onChange={handleNewRecipeChange}
            placeholder="Ingredients (comma separated)"
          />
            </div>
          <button className="search"type="submit"><RiAddLargeLine></RiAddLargeLine></button>
        </form>
      </div>
    </div>
  );
}

export default Form;
