import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { getAuth } from "firebase/auth";

const ManageFoods = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const [editingFood, setEditingFood] = useState(null);

    useEffect(() => {
        const fetchMyFoods = async () => {
            if (!user) return;

            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (currentUser) {
                const token = await currentUser.getIdToken();

                const res = await fetch(`http://localhost:3000/foods/user?email=${user.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, 
                    },
                });

                const data = await res.json();
                setMyFoods(data);
            }
        };

        fetchMyFoods();
    }, [user?.email]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete the food item.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            const res = await fetch(`http://localhost:3000/foods/${id}`, {
                method: "DELETE"
            });

            if ((await res.json()).deletedCount > 0) {
                Swal.fire('Deleted!', 'The food has been deleted.', 'success');
                setMyFoods(myFoods.filter(food => food._id !== id));
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const updatedFood = {
            foodName: form.foodName.value,
            quantity: form.quantity.value,
            location: form.location.value,
            expiry: form.expiry.value,
            notes: form.notes.value
        };

        const res = await fetch(`http://localhost:3000/foods/${editingFood._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFood)
        });

        if ((await res.json()).modifiedCount > 0) {
            Swal.fire("Success", "Food updated successfully", "success");
            
            const updatedList = myFoods.map(food =>
                food._id === editingFood._id ? { ...food, ...updatedFood } : food
            );
            setMyFoods(updatedList);
            setEditingFood(null);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage My Foods</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Food Name</th>
                            <th>Quantity</th>
                            <th>Expires</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myFoods.map((food, index) => (
                            <tr key={food._id}>
                                <td>{index + 1}</td>
                                <td><img src={food.foodImage} className="w-14 h-14 object-cover rounded" /></td>
                                <td>{food.foodName}</td>
                                <td>{food.quantity}</td>
                                <td>{new Date(food.expiry).toLocaleDateString()}</td>
                                <td>{food.location}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded text-white text-xs ${food.status === 'requested' ? 'bg-red-500' : 'bg-green-500'
                                        }`}>
                                        {food.status || "available"}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => setEditingFood(food)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(food._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {editingFood && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Update Food</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input type="text" name="foodName" defaultValue={editingFood.foodName} className="input input-bordered w-full" required />
                            <input type="text" name="quantity" defaultValue={editingFood.quantity} className="input input-bordered w-full" required />
                            <input type="text" name="location" defaultValue={editingFood.location} className="input input-bordered w-full" required />
                            <input type="date" name="expiry" defaultValue={editingFood.expiry?.split('T')[0]} className="input input-bordered w-full" required />
                            <textarea name="notes" defaultValue={editingFood.notes} className="textarea textarea-bordered w-full" rows="3" />
                            <div className="flex justify-end space-x-2">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" onClick={() => setEditingFood(null)} className="btn btn-outline">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageFoods;
