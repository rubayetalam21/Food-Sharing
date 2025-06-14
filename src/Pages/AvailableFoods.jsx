import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [sortedFoods, setSortedFoods] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [isThreeColumn, setIsThreeColumn] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/foods")
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

    const toggleLayout = () => {
        setIsThreeColumn((prev) => !prev);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                <h2 className="text-3xl font-bold">Available Foods</h2>
                <div className="flex gap-4 items-center">
                    {/* Sort Controls */}
                    <p className="font-semibold">Sort by Expire Date:</p>
                    <button
                        className={`px-4 py-2 rounded ${sortOrder === "asc"
                                ? "bg-blue-700 text-white"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        onClick={() => handleSort("asc")}
                    >
                        Ascending
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${sortOrder === "desc"
                                ? "bg-blue-700 text-white"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        onClick={() => handleSort("desc")}
                    >
                        Descending
                    </button>

                    {/* Layout Toggle Button */}
                    <button
                        onClick={toggleLayout}
                        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                        Layout: {isThreeColumn ? "3 Columns" : "2 Columns"}
                    </button>
                </div>
            </div>

            {/* Foods Section */}
            <div
                className={`grid gap-6 grid-cols-1 ${isThreeColumn ? "md:grid-cols-3" : "md:grid-cols-2"
                    }`}
            >
                {(sortedFoods.length > 0 ? sortedFoods : foods).map((food) => (
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
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
