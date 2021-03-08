import React, { useContext, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../axiosApi/RestaurantFinder";

const AddRestaurants = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });

      addRestaurants(response.data.data.restaurant);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mb-4'>
      <form action=''>
        <div className='row g-3'>
          <div className='col'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='form-control'
              placeholder='name'
            />
          </div>
          <div className='col'>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type='text'
              className='form-control'
              placeholder='location'
            />
          </div>
          <div className='col'>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className='form-select'
            >
              <option disabled>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$</option>
              <option value='3'>$</option>
              <option value='4'>$</option>
              <option value='5'>$</option>
            </select>
          </div>

          <div className='col'>
            <button
              onClick={handleSubmit}
              type='submit'
              className='btn btn-primary'
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurants;
