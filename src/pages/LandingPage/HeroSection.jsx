 import React from 'react';
import { ArrowRight, Heart, Star, Instagram, Twitter, Facebook, Search, CheckCircle } from 'lucide-react';

// A small component for the star ratings
const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))}
  </div>
);

const HeroSection = () => {
  return (
    <div className="relative bg-white overflow-hidden" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
          <div className='z-0 absolute top-30 rotate-24 left-[-50px]'>
            <img src='https://res.cloudinary.com/drhcd0bj6/image/upload/v1759162127/mints_sgsvzb.png' alt='Leaf' className='w-60 h-80 left-0' />
          </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-8 sm:py-8 lg:py-16 flex flex-col lg:flex-row items-center">
          
        
          <div className="lg:w-1/2 ml-36 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-800 tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              SIMPLE AND <br /> TASTY RECIPES
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0" style={{ fontFamily: "Crimson Text, serif", fontWeight: 400, fontStyle: "bold" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim eu nunc faucibus sit euismod suspendisse bibendum pellentesque lectus. Feugiat scelerisque montes.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-colors duration-300 transform hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex-shrink-0 p-2 border-2 border-gray-200 rounded-full">
                <Heart size={24} className="text-red-500" />
              </div>
              <div className="text-sm text-gray-500 font-medium">PEOPLE LIKED THE RECIPES</div>
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=2" alt="User 2" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?img=3" alt="User 3" />
              </div>
            </div>
          </div>

          <div className="lg:w-[40%] right-[40px] flex  lg:justify-end">
            <div className="relative right-18 w-full max-w-md lg:max-w-lg">
              <img 
                src="https://res.cloudinary.com/drhcd0bj6/image/upload/v1759168141/thalis_yih7ek.png"
                alt="Fruit bowl" 
                className="rounded-3xl "
              />

              <div className="absolute top-30  -left-4 sm:-left-12 bg-white rounded-lg shadow-xl p-3 flex items-center gap-3 animate-fade-in-up">
                <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=4" alt="Search user" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Search 1 million+</p>
                  <p className="text-xs text-gray-500">simple recipes</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
              </div>

        
              <div className="absolute bottom-4 sm:right-2 bg-white rounded-lg shadow-xl p-4 w-56 animate-fade-in-up animation-delay-3000">
                <div className="flex items-center gap-3">
                  <img className="h-12 w-12 rounded-full" src="https://i.pravatar.cc/150?img=5" alt="Kylie Doe" />
                  <div>
                    <p className="font-bold text-gray-900">Kylie Doe</p>
                    <p className="text-sm text-gray-500">Food Enthusiast</p>
                  </div>
                </div>
                <div className="mt-3">
                  <StarRating rating={5} />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 h-3 w-3 bg-red-400 rounded-full"></div>
              <div className="absolute top-12 left-4 h-2 w-2 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-4 left-1/4 h-3 w-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Elements */}
      <img 
        src="https://www.freepnglogos.com/uploads/mint-png/mint-leaf-transparent-png-stickpng-28.png" // Replace with your mint leaf image
        alt="Mint leaf" 
        className="absolute top-0 -left-20 w-48 opacity-80 -z-0 hidden lg:block" 
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 hidden lg:flex flex-col items-center gap-6">
        <span className="text-gray-500 font-semibold uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Follow Us
        </span>
        <div className="h-16 w-px bg-gray-300"></div>
        <a href="#" className="text-gray-500 hover:text-gray-800"><Instagram size={20} /></a>
        <a href="#" className="text-gray-500 hover:text-gray-800"><Twitter size={20} /></a>
        <a href="#" className="text-gray-500 hover:text-gray-800"><Facebook size={20} /></a>
      </div>
    </div>
  );
};

export default HeroSection;