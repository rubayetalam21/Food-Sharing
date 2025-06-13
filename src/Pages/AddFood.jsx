import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";


const AddFood = () => {
    const { user } = useContext(AuthContext); // get logged-in user info

    const [formData, setFormData] = useState({
        foodName: "",
        foodImage: "",
        quantity: "",
        location: "",
        expiry: "",
        notes: "",
        status: "available", // default
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

        console.log("Food Submitted:", foodData);
        // TODO: Send `foodData` to backend or Firestore


        fetch('http://localhost:3000/foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(foodData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('added successfully.')

                    Swal.fire({
                        title: "Hobby added successfully!",
                        icon: "success",
                        draggable: true
                    });

                    // Optionally reset the form
                    setFormData({
                        foodName: "",
                        foodImage: "",
                        quantity: "",
                        location: "",
                        expiry: "",
                        notes: "",
                    });
                }
            })

        console.log({ ...formData, userName: user?.displayName, userEmail: user?.email });

    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Food</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="foodName"
                        placeholder="Food Name"
                        value={formData.foodName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="foodImage"
                        placeholder="Image URL"
                        value={formData.foodImage}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Food Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="location"
                        placeholder="Pickup Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <input
                        type="datetime-local"
                        name="expiry"
                        placeholder="Expired Date/Time"
                        value={formData.expiry}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <textarea
                        name="notes"
                        placeholder="Additional Notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    ></textarea>
                </div>

                {/* Hidden Fields (Auto Filled) */}
                <div className="mt-4">
                    <p><strong>Donor Name:</strong> {user?.displayName || "N/A"}</p>
                    <p><strong>Donor Email:</strong> {user?.email || "N/A"}</p>
                    {user?.photoURL && (
                        <img src={user.photoURL} alt="Donor" className="w-12 h-12 rounded-full mt-2" />
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Add Food
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFood;
