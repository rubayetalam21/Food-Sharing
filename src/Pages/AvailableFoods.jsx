import { useEffect, useState } from "react";
import { Link } from "react-router";

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [sortedFoods, setSortedFoods] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        // Fetching food data
        fetch('http://localhost:3000/foods')
            .then((res) => res.json())
            .then((data) => {
                const availableFoods = data.filter((food) => food.status === "available");
                setFoods(availableFoods);
                setSortedFoods(availableFoods);
            });
    }, []);

    const handleSort = (order) => {
        const sorted = [...foods].sort((a, b) => {
            const dateA = new Date(a.expiry);
            const dateB = new Date(b.expiry);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
        setSortedFoods(sorted);
        setSortOrder(order);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Available Foods</h2>

            {/* Sorting */}
            <div className="mb-4 flex gap-4 items-center">
                <p className="font-semibold">Sort by Expire Date:</p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleSort("asc")}
                >
                    Ascending
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleSort("desc")}
                >
                    Descending
                </button>
            </div>

            {/* Foods Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(sortedFoods.length > 0 ? sortedFoods : foods).map((food) => (
                    <div
                        key={food.id}
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
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
