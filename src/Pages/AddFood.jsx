import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useMutation } from '@tanstack/react-query';

const AddFood = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        foodName: "",
        foodImage: "",
        quantity: "",
        location: "",
        expiry: "",
        notes: "",
        status: "available",
    });

    // Mutation function to POST data
    const addFood = async (newFood) => {
        const res = await fetch('http://localhost:3000/foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newFood),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to add food');
        return data;
    };

    const mutation = useMutation({
        mutationFn: addFood,
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire({
                    title: "Food added successfully!",
                    icon: "success",
                });

                
                setFormData({
                    foodName: "",
                    foodImage: "",
                    quantity: "",
                    location: "",
                    expiry: "",
                    notes: "",
                    status: "available",
                });
            }
        },
        onError: (error) => {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
            });
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const foodData = {
            ...formData,
            donorName: user?.displayName,
            donorEmail: user?.email,
            donorImage: user?.photoURL,
        };

        mutation.mutate(foodData);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md text-black">
            <h2 className="text-2xl font-bold mb-4">Add Food</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="foodName"
                    placeholder="Food Name"
                    value={formData.foodName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="foodImage"
                    placeholder="Image URL"
                    value={formData.foodImage}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Food Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Pickup Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="datetime-local"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="notes"
                    placeholder="Additional Notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                ></textarea>

                <div className="mt-4">
                    <p><strong>Donor Name:</strong> {user?.displayName || "N/A"}</p>
                    <p><strong>Donor Email:</strong> {user?.email || "N/A"}</p>
                    {user?.photoURL && (
                        <img src={user.photoURL} alt="Donor" className="w-12 h-12 rounded-full mt-2" />
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Adding..." : "Add Food"}
                </button>
            </form>
        </div>
    );
};

export default AddFood;
