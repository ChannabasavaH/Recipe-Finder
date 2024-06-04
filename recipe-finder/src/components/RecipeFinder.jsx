import React, { useState } from 'react';

const RecipeFinder = () => {
  const [recipe, setRecipe] = useState('');
  const [recipeData, setRecipeData] = useState([]);

  const recipeFinder = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe}&key=8efc9173-0890-4a8d-bfd8-2e85f4d78820&limit=5`);
      const data = await res.json();
      console.log(data);
      setRecipeData(data.data.recipes);
      setRecipe('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='my-2 w-full flex justify-center items-center'>
        <form onSubmit={recipeFinder} className='w-full lg:w-1/2 flex'>
          <input
            type="text"
            placeholder="Search a recipe"
            value={recipe}
            onChange={(event) => setRecipe(event.target.value)}
            className='w-full border-2 border-black rounded-md text-center text-xl'
          />
          <button type="submit" className='ml-2 w-[100px] h-[25-px] flex justify-center items-center text-white bg-black text-md rounded-md'>Search</button>
        </form>
      </div>
      <div className='w-full flex flex-wrap justify-center items-center'>
        {Array.isArray(recipeData) && recipeData.map((item) => (
          <div key={item.id} className='w-full sm:w-1/2 lg:w-1/3 p-2'>
            <div className='border-2 border-black rounded-md flex flex-col justify-center items-center'>
              <img src={item.image_url} alt={item.title} className='w-full h-60 object-cover' />
              <h3 className='text-black text-2xl'>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFinder;
