import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="relative py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="max-w-[570px] mx-auto lg:mx-0">
              <Image
                src="/images/about/shuttle-transportation.png"
                alt="Wellness Transportation minivan"
                width={570}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="max-w-[470px] mx-auto lg:mx-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-lg text-gray-700 mb-6">
                We are a locally based company in Guanacaste and San José, providing fast, reliable, and comfortable minivan shuttle services for up to 8 passengers across Costa Rica. Whether you're traveling between airports, hotels, or any destination of your choice, we ensure a smooth and stress-free experience.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our focus is on punctuality, safety, and customer satisfaction, making every ride a pleasant journey. With easy online reservations and dedicated service, we're here to make your transportation as seamless as possible.
              </p>
              <p className="text-xl font-semibold text-gray-900">
                Let us handle the driving while you enjoy exploring Costa Rica!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;