import React from 'react';
import errorImg from '../assets/error_page.png';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <>
            {/* Inline styles for animation */}
            <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation-name: fadeInScale;
          animation-duration: 0.8s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
      `}</style>

            <div className="min-h-screen my-13 flex flex-col bg-gradient-to-br from-teal-50 to-teal-100">
                <Navbar />

                <main className="flex-grow flex flex-col items-center justify-center px-6 text-center space-y-8 max-w-xl mx-auto">
                    <img
                        src={errorImg}
                        alt="404 Page Not Found"
                        className="w-full max-w-sm rounded-3xl shadow-lg animate-fadeInScale"
                    />

                    <h1 className="text-6xl font-extrabold text-teal-600 drop-shadow-md animate-fadeInScale" style={{ animationDelay: '0.3s' }}>
                        404
                    </h1>

                    <p className="text-xl text-teal-800 max-w-md mx-auto leading-relaxed animate-fadeInScale" style={{ animationDelay: '0.6s' }}>
                        Oops! The page you’re looking for doesn’t exist or has been moved.
                        Let’s get you back home safely.
                    </p>

                    <button
                        onClick={handleGoHome}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full px-12 py-3 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 animate-fadeInScale"
                        style={{ animationDelay: '0.9s' }}
                    >
                        Go to Homepage
                    </button>
                </main>
            </div>
        </>
    );
};

export default ErrorPage;
