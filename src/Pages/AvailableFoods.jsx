import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';



const fetchAvailableFoods = async () => {
    const res = await fetch('https://b11a11-server-side-rubayetalam21.vercel.app/foods');
    const data = await res.json();
    return data.filter((food) => food.status === 'available');
};

const AvailableFoods = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ['availableFoods'],
        queryFn: fetchAvailableFoods,
    });

    const filteredFoods = foods.filter((food) =>
        food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="w-11/12 mx-auto py-6">
            <h2 className="text-3xl font-bold mb-6">Available Foods</h2>

            {/* Search bar */}
            <div className="mb-6 relative w-full md:w-1/2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FiSearch />
                </span>
                <input
                    type="text"
                    placeholder="Search Food by Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>


            {/* Food grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                        <div
                            key={food._id}
                            className="border p-4 rounded shadow hover:shadow-lg transition"
                        >
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
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">
                        No food matched your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AvailableFoods;
