import React from "react";

const reviews = [
    {
        id: 1,
        name: "Tamim Ahmed",
        photo: "https://i.pravatar.cc/60?img=1",
        rating: 5,
        comment:
            "Amazing platform! I found so many great food sharing opportunities here. Highly recommend!",
    },
    {
        id: 2,
        name: "Sofia Rahman",
        photo: "https://i.pravatar.cc/60?img=2",
        rating: 4,
        comment:
            "Very user-friendly and efficient. The community is helpful and supportive.",
    },
    {
        id: 3,
        name: "Sujon Mahmud",
        photo: "https://i.pravatar.cc/60?img=3",
        rating: 5,
        comment:
            "I love how easy it is to add and request food. The team is responsive and caring.",
    },
];

const StarRating = ({ rating }) => {
    return (
        <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < rating ? "fill-current" : "stroke-current"}`}
                    fill={i < rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
};

const ReviewSection = () => {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
                    What Our Users Say
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {reviews.map(({ id, name, photo, rating, comment }) => (
                        <div
                            key={id}
                            className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center"
                        >
                            <img
                                src={photo}
                                alt={name}
                                className="w-16 h-16 rounded-full mb-4 object-cover"
                            />
                            <StarRating rating={rating} />
                            <p className="mt-4 text-gray-700 italic">"{comment}"</p>
                            <h3 className="mt-4 font-semibold text-teal-600">{name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
