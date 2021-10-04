import CustomMap from './components/CustomMap.jsx';
import Restaurants from './components/Restaurants.jsx';
import Restaurant from './components/Restaurant.jsx';

import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  useEffect(() => {
    getRestaurants()
  },[]);

   const [restaurants,setRestaurants] = useState([])
   const [singleRestaurant,setSingleRestaurant] = useState({location: {}, desc: '', name: ''})
   const [allRestaurants,setAllRestaurants] = useState([])
   const [selectedRestaurant,setSelectedRestaurant] = useState([])

   const getRestaurants = async () => {
      const restaurants = await axios.get('http://localhost:8000/restaurants');
      const sortedRestaurants = restaurants.data.sort((a,b)=>b.ratings-a.ratings)
      setRestaurants(sortedRestaurants);
      setAllRestaurants(restaurants.data);
   }

  return (
    <Router>
    <div className="App">
    <Switch>
     <Route exact path="/">
      <Restaurants restaurants={restaurants} setData={setSingleRestaurant} setSelectedRestaurant={setSelectedRestaurant}/>
      <CustomMap allRestaurants={allRestaurants} singleRestaurant={singleRestaurant} setSelectedRestaurant={setSelectedRestaurant}/>
    </Route>
    <Route path="/restaurant/:id" component="Restaurant">
    <Restaurant selectedRestaurant={selectedRestaurant}/>
    </Route>  
    </Switch>
    </div>
    </Router>
  );
}

export default App;
