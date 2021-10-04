import './Restaurants.css';
import RestaurantList from './RestaurantList.jsx';

const Restaurants = ({restaurants, setData, setSelectedRestaurant}) => {
  return (
     <div className="restaurants_list">
         {
           restaurants.map(item =>
              (
                <RestaurantList item={item} key={item._id} setData={setData} setSelectedRestaurant={setSelectedRestaurant}/>
              )
           )
         }
     </div>
  )
}

export default Restaurants;
