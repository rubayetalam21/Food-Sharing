import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

// Fetch function for available foods
const fetchAvailableFoods = async () => {
    const res = await fetch('http://localhost:3000/foods');
    const data = await res.json();
    return data.filter((food) => food.status === 'available');
};

const AvailableFoods = () => {
    // Use TanStack Query to fetch available foods
    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ['availableFoods'],
        queryFn: fetchAvailableFoods,
    });

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Available Foods</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
                    <div key={food._id} className="border p-4 rounded shadow hover:shadow-lg transition">
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-48 object-cover rounded mb-3"
                        />
                        <h3 className="text-xl font-bold mb-2">{food.foodName}</h3>
                        <p><strong>Quantity:</strong> {food.quantity}</p>
                        <p><strong>Location:</strong> {food.location}</p>
                        <p><strong>Expires:</strong> {new Date(food.expiry).toLocaleString()}</p>

                        <Link to={`/foodDetails/${food._id}`}>
                            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
