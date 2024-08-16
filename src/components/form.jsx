import React from 'react';

function Form({ search, setSearch, addRecipe, setNewRecipe }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe(); // Ensure this function is called on form submit
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevRecipe => ({ ...prevRecipe, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <input 
          type="text" 
          name="label" 
          placeholder="Label" 
          onChange={handleRecipeChange}
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          onChange={handleRecipeChange}
        />
        <input 
          type="text" 
          name="source" 
          placeholder="Source" 
          onChange={handleRecipeChange}
        />
        <textarea 
          name="ingredients" 
          placeholder="Ingredients (comma separated)" 
          onChange={(e) => handleRecipeChange({ target: { name: 'ingredients', value: e.target.value.split(',') } })}
        />
        <button type="button" onClick={addRecipe}>Add Recipe</button>
      </div>
    </div>
  );
}

export default Form;
