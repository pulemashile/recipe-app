import React from 'react'

function Form(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.getRecipe();
  }

  const handleInputChange = (e) => {
    props.setSearch(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={props.search} onChange={handleInputChange} />
        <button type="submit">search</button>
      </form>
    </div>
  )
}

export default Form