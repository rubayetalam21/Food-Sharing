import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { AuthContext } from "../Provider/AuthProvider";

const MyFoodRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (user?.email) {
                try {
                    const token = await user.getIdToken();
                    const res = await fetch(`https://b11a11-server-side-rubayetalam21.vercel.app/requests?email=${user.email}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = await res.json();
                    setRequests(data);
                } catch (error) {
                    console.error("Failed to fetch requests:", error);
                }
            }
        };

        fetchRequests();
    }, [user?.email]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">My Food Requests</h1>
            {requests.length === 0 ? (
                <p className="text-center">No food requests yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>#</th>
                                <th>Food</th>
                                <th>Donor Name</th>
                                <th>Pickup Location</th>
                                <th>Request Date</th>
                                <th>Expire Date</th>
                                <th>Status</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, idx) => (
                                <tr key={req._id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-2">
                                            <img src={req.foodImage} alt="food" className="w-12 h-12 object-cover rounded" />
                                            <span>{req.foodName}</span>
                                        </div>
                                    </td>
                                    <td>{req.donorName}</td>
                                    <td>{req.pickupLocation}</td>
                                    <td>{moment(req.requestDate).format("YYYY-MM-DD HH:mm")}</td>
                                    <td>{moment(req.expireDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <span className={`text-xs px-2 py-1 rounded ${req.status === "requested" ? "bg-yellow-300" : "bg-green-400"
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>{req.notes || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFoodRequests;
