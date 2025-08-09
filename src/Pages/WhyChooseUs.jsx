import { FaRecycle, FaLeaf, FaUsers } from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <div className="bg-gray-100 py-12 px-6 max-w-7xl mx-auto text-black">
            <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">💡 Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                    <FaRecycle className="text-5xl text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Reduce Food Waste</h3>
                    <p>We help reduce food waste by redistributing surplus to those in need.</p>
                </div>

                <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                    <FaLeaf className="text-5xl text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Sustainable Impact</h3>
                    <p>Support a sustainable environment by donating extra food responsibly.</p>
                </div>

                <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                    <FaUsers className="text-5xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
                    <p>We’re building a strong network of givers and receivers for real impact.</p>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
