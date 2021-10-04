import { useHistory } from "react-router-dom";

function Restaurant ({item, setData, setSelectedRestaurant}) {
  const history = useHistory();

	const clickHandler = () => {
	    setSelectedRestaurant(item)
	    history.push(`/restaurant/${item._id}`);
	}

	return (
	    <div className="restaurant" onClick={()=>setData({location: item.address, desc: item.short_description, name: item.name})}>
        	<h3>{item.name}</h3>
        	<button onClick={() => clickHandler()}>View Restaurant</button>
      	</div>
    )
}

export default Restaurant