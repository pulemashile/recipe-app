import React, { useState } from 'react';
import { RiPencilLine, RiDeleteBin7Line } from '@remixicon/react';

const RecipeCard = ({ recipe, updateRecipe, deleteRecipe, openModal }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{recipe.label}</h3>
      <img 
        className="recipe-image" 
        src={recipe.image} 
        alt={recipe.label} 
        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
        onClick={() => openModal(recipe.image)} // Implement this function to show enlarged image
      />
      <p className="recipe-source">Source: {recipe.source}</p>
      <div className="recipe-ingredients">
        <strong>Ingredients:</strong> 
        {showMore ? recipe.ingredients : `${recipe.ingredients.slice(0, 50)}...`}
        {recipe.ingredients.length > 50 && (
          <a onClick={handleToggle}
      
          >
          {showMore ? 'Show Less' : 'Read More'}</a>
        )}
      </div>
      <div className="buttons">
        <button 
          className="update-button" 
          onClick={() => updateRecipe(recipe.id, { ...recipe, label: 'Updated Recipe' })}
        >
          <RiPencilLine />
        </button>
        <button 
          className="delete-button" 
          onClick={() => deleteRecipe(recipe.id)}
        >
          <RiDeleteBin7Line />
        </button>
      </div >
      
    </div>
  );
};

export default RecipeCard;
