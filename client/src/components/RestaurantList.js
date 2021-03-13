import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import RestaurantFinder from "../axiosApi/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantContext";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        const { restaurants } = response.data.data;

        setRestaurants(restaurants);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (id) => {
    try {
      await RestaurantFinder.delete(`/${id}`);

      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    history.push(`/restaurants/${id}/update`);
  };

  return (
    <div className='list-group'>
      <table className='table'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>Reviews</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(restaurant.id)}
                      className='btn btn-warning'
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
