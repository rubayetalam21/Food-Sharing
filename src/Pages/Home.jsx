import React from 'react';
import Slider from '../components/Slider';
import AvailableFoods from './AvailableFoods';
import { Fade, Slide } from 'react-awesome-reveal';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className='py-5'>
                <Fade direction="up" duration={800} triggerOnce>
                    <Slider />
                </Fade>
            </div>

            <Slide direction="up" triggerOnce>
                <AvailableFoods></AvailableFoods>
            </Slide>
           
        </div>
    );
};

export default Home;