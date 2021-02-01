import './App.css';
import Breadcrumb from './components/Breadcrumb';
import Recipe from './components/Recipe';
import searchIcon from './images/search-icon.png';
import { AUTH } from './config';
import { useEffect, useState } from 'react';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [search, setSearch] = useState('chicken');

  useEffect(() => {
    const APP_ID = AUTH.APP_ID;
    const APP_KEY = AUTH.APP_KEY;
    
    const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
    }
    getRecipes()
  }, [search])

  const getSearchValue = e => {
    setSearchTxt(e.target.value);
  }

  const submitForm = e => {
    e.preventDefault();
    setSearch(searchTxt)
    setSearchTxt('');
  }

  return (
    <div>
      <Breadcrumb title="Recipe Search with EDAMAM API" />
      <div className="mainWrap">
        <div className="container">
          <form className="searchForm" onSubmit={submitForm}>
            <input
              type="Search"
              value={searchTxt}
              placeholder="Search Here"
              onChange={getSearchValue}
            />
            <button type="submit">
              Search <img src={searchIcon} width="15" alt="" />
            </button>
          </form>

          {search && <div className="overview row">
            <h4>Search Result for: "{search}"</h4>
            <select>
              <option>Default Sorting</option>
              <option>By Name</option>
              <option>By Date</option>
            </select>
          </div>}

          <div className="recipeWrap">
            <div className="row">
              {recipes.map(recipe => (
                <Recipe
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  image={recipe.recipe.image}
                  dietLabels={recipe.recipe.dietLabels}
                  calories={recipe.recipe.calories}
                  ingredients={recipe.recipe.ingredients}
                  totalTime={recipe.recipe.totalTime}
                  column="3"
                  quantity={recipe.recipe.quantity}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
