import { FaUserPlus, FaHandHoldingHeart, FaTruck } from 'react-icons/fa';

const HowItWorks = () => {
    return (
        <div className="bg-white py-12 px-6 max-w-7xl mx-auto text-black">
            <h2 className="text-3xl font-bold text-center mb-10">🎯 How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                    <FaUserPlus className="text-5xl text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">1. Register</h3>
                    <p>Create an account to start donating or requesting food with ease.</p>
                </div>

                <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                    <FaHandHoldingHeart className="text-5xl text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">2. Donate / Request</h3>
                    <p>Post available food or request items that you or others may need.</p>
                </div>

                <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                    <FaTruck className="text-5xl text-yellow-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">3. Pickup / Delivery</h3>
                    <p>Get matched and receive/deliver food items in your area.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
