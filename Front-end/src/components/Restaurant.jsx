import './Restaurants.css';
import {useEffect, useState} from 'react';
import axios from 'axios'
import {useParams} from "react-router-dom";

const Restaurant = () => {
  useEffect(() => {
    getRestaurant()
  },[]);

  const [restaurant, setRestaurant] = useState({});
  const [feedback, setFeedback] = useState('');
  const { id } = useParams();

  const getRestaurant = async () => {
    const rest = await axios.get(`http://localhost:8000/restaurants/${id}`);
    setRestaurant(rest.data);
  }

  const changeRating = async (event) => {
    let rest = {...restaurant};
    rest.ratings = Number(event.target.value);
    setRestaurant(rest);
    await axios.put(`http://localhost:8000/restaurants/${id}`,{ratings:Number(event.target.value),feedbacks:restaurant.feedbacks});
  }

  const submitFeedback = async (event) => {
    let rest = {...restaurant};
    rest.feedbacks.push(feedback);
    setRestaurant(rest);
    await axios.put(`http://localhost:8000/restaurants/${id}`,{feedbacks:rest.feedbacks, ratings: restaurant.ratings});
  }

  return (
    <div className="restaurant_page">
      <img src={restaurant.image}/>
      <h1>{restaurant.name}</h1>
      <h4>Rating: {restaurant.ratings? restaurant.ratings:'not rated'}</h4>
      <h3>Description</h3>
      <p>{restaurant.description}</p>
      <h4>Rate {restaurant.name} Restaurant</h4>
      <select value={restaurant.ratings} onChange={changeRating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <h4>Feedbacks</h4>
      <div>
      {
        restaurant.feedbacks?.map(item=>
        (
          <p>{item}</p>
        )
      )}
      </div>
      <h4>Add a feedback</h4>
      <textarea onChange={(e)=>setFeedback(e.target.value)}/>
      <button onClick={submitFeedback}>Submit feedback</button>
    </div>
  )
}

export default Restaurant;
