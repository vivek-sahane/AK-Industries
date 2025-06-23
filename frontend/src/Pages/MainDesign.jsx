import React from 'react'
import Murukku_chakali from "../assets/Murukku_chakali.JPG"

const MainDesign = () => {
  return (
    <div className="p-4">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl p-6 shadow-2xl bg-white">

        {/* Left Text */}
        <div className="md:w-1/2 w-full p-4 text-center md:text-left">
          <div className="font-bold text-amber-700 text-3xl md:text-xl">AK's Special</div>
          <div className="font-bold text-4xl md:text-6xl mt-2 leading-tight">
            Taste the tradition <br />
            <span className="text-indigo-700">with every crunch.</span>
          </div>

          <div className="mt-6 text-gray-700 text-sm md:text-base w-full md:w-4/5 mx-auto md:mx-0">
            Our snacks are crafted using age-old recipes, premium ingredients, and a passion for perfection. From our kitchen to your plate — pure, home-style goodness that brings joy to every bite.
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center">
          <img
            src={Murukku_chakali}
            alt="Murukku Chakali"
            className="rounded-2xl w-full sm:w-[80%] md:w-[500px] lg:w-[600px] h-auto object-cover"
          />
        </div>

      </div>
    </div>
  )
}

export default MainDesign
