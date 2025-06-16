import React from 'react';
import Slider from '../components/Slider';
import AvailableFoods from './AvailableFoods';
import { Fade, Slide } from 'react-awesome-reveal';
import FeaturedFoods from './FeaturedFoods';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className='py-5'>
                <Fade direction="up" duration={800} triggerOnce>
                    <Slider />
                </Fade>
            </div>

            <Slide direction="up" triggerOnce>
                <FeaturedFoods />
            </Slide>

            {/* ✅ Framer Motion Animation */}
            <motion.div
                initial={{ opacity: 0, x: -150 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2.5 }}
                // viewport={{ once: true }}
            >
                <HowItWorks />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2.5 }}
                // viewport={{ once: true }}
            >
                 <WhyChooseUs />
            </motion.div>

           
        </div>
    );
};

export default Home;
