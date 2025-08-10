import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const FoodDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://b11a11-server-side-rubayetalam21.vercel.app/foods/user/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data));
    }, [id]);

    const handleRequest = async () => {
        if (!user?.email || !food?._id) {
            alert("User not logged in or food not loaded");
            return;
        }

        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            foodImage: food.foodImage,
            donorName: food.donorName,
            donorEmail: food.donorEmail,
            userEmail: user.email,
            requestDate: new Date().toISOString(),
            pickupLocation: food.location,
            expireDate: food.expiry,
            additionalNotes: notes,
            status: "requested",
        };

        const requestRes = await fetch("https://b11a11-server-side-rubayetalam21.vercel.app/requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const requestResult = await requestRes.json();

        if (!requestResult.success) {
            alert("Failed to submit request.");
            return;
        }


        const updateRes = await fetch(`https://b11a11-server-side-rubayetalam21.vercel.app/foods/${food._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "requested" }),
        });

        if (!updateRes.ok) {
            alert("Failed to update food status.");
            return;
        }

        setShowModal(false);
        Swal.fire({
            title: "Success!",
            text: "Request submitted successfully!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });

        navigate("/availableFoods");
    };

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


            {food.status !== "requested" && (
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
                >
                    Request
                </button>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-lg shadow-lg relative">
                        <h3 className="text-xl font-semibold mb-4">Request Food</h3>

                        <div className="space-y-2 text-sm">
                            <p><strong>Food Name:</strong> {food.foodName}</p>
                            <p><strong>Food ID:</strong> {food._id}</p>
                            <img src={food.foodImage} alt="" className="w-40 h-32 object-cover rounded" />
                            <p><strong>Donator Name:</strong> {food.donorName}</p>
                            <p><strong>Donator Email:</strong> {food.donorEmail}</p>
                            <p><strong>Your Email:</strong> {user.email}</p>
                            <p><strong>Request Date:</strong> {new Date().toLocaleString()}</p>
                            <p><strong>Pickup Location:</strong> {food.location}</p>
                            <p><strong>Expire Date:</strong> {new Date(food.expiry).toLocaleString()}</p>

                            <textarea
                                placeholder="Additional Notes"
                                className="w-full border p-2 mt-2"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRequest}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
