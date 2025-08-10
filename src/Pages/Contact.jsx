import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you can integrate EmailJS, Formspree, or your backend API
        console.log("Form submitted:", formData);

        // Reset form
        setFormData({ name: "", email: "", message: "" });

        // SweetAlert success message
        Swal.fire({
            title: "Message Sent!",
            text: "Thank you for contacting us! We'll get back to you soon.",
            icon: "success",
            confirmButtonColor: "#40E0D0", // matches your brand color
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-teal-500 mb-6">
                    Contact Us
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Have questions or feedback? Fill out the form below and we’ll get back
                    to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Your Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Type your message here..."
                            rows="5"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
