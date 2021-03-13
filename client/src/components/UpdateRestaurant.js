import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import RestaurantFinder from "../axiosApi/RestaurantFinder";

const UpdateRestaurant = () => {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      const { name, location, price_range } = response.data.data.restaurant;

      setName(name);
      setLocation(location);
      setPriceRange(price_range);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });

    history.push("/");
  };

  return (
    <div>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            type='number'
            className='form-control'
          />
        </div>

        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-primary mt-4'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
