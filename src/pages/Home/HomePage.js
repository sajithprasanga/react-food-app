import React, { useEffect, useReducer } from 'react'
import { getAll, getAllBytag, getAllTags, search } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tag from '../../components/Tags/Tag';

const initialState = { foods: [], tags: []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return {...state, foods: action.playload };
    case 'TAGS_LOADED':
      return {...state, tags: action.playload };
    default:
      return state;
  }
}
function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {foods, tags} = state;
  const {searchTerm, tag} = useParams();

  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED' , playload: tags}));

    const loadedFoods = tag ? getAllBytag(tag) : searchTerm ? search(searchTerm) : getAll();

    loadedFoods.then(foods => dispatch({
      type: 'FOODS_LOADED',
      playload: foods
    }));
  },[searchTerm,tag])
  return (
    <>
      <Search />
      <Tag tags={tags} />
      <Thumbnails foods={foods} />
    </>
  )
}

export default HomePage
