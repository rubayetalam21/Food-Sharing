import { useEffect, useState } from "react";
import { useParams } from "react-router";

const FoodDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/foods/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data));
    }, [id]);

    if (!food) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">{food.foodName}</h2>
            <p><strong>Quantity:</strong> {food.quantity}</p>
            <p><strong>Location:</strong> {food.location}</p>
            <p><strong>Expires:</strong> {new Date(food.expiry).toLocaleString()}</p>
            <p><strong>Notes:</strong> {food.notes}</p>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Donor Info:</h3>
                <p>{food.donorName}</p>
                <p>{food.donorEmail}</p>
                {food.donorImage && (
                    <img src={food.donorImage} alt="Donor" className="w-16 h-16 rounded-full mt-2" />
                )}
            </div>
        </div>
    );
};

export default FoodDetails;
