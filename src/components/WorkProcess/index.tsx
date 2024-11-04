import React from "react";

const workProcessData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    title: "Pick-up Location",
    description: "We&apos;ll meet you at the airport or your chosen location, ready to start your journey.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: "On-Time Service",
    description: "We prioritize punctuality to ensure a smooth and stress-free travel experience.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    title: "Safe Journey",
    description: "Enjoy a comfortable and secure ride to your destination with our professional drivers.",
  },
];

const WorkProcess = () => {
  return (
    <section id="work-process" className="relative z-10 bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-[690px] text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-gray-700">
            Experience seamless transportation with our easy and reliable service process.
          </p>
        </div>

        <div className="mx-auto max-w-[1090px]">
          <div className="grid gap-8 md:grid-cols-3">
            {workProcessData.map((item, index) => (
              <div key={index} className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay={`${0.2 + index * 0.1}s`}>
                <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-green-800 duration-300 group-hover:bg-green-800 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900 sm:text-[22px] xl:text-[26px]">
                  {item.title}
                </h3>
                <p className="text-base text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <p className="text-lg mb-6 text-gray-700">
            When your pick-up location is Guanacaste Airport (LIR) or Juan Santamaria Airport (SJO), 
            we&apos;ll be waiting for you right outside the main exit, holding a sign with your name, 
            ready to start your journey. If your pick-up location is elsewhere—such as a hotel, 
            Airbnb, house, or any other spot you choose—we&apos;ll be there on time, happy and ready 
            to begin your ride.
          </p>
          <p className="text-md font-semibold text-gray-900">
            Refunds are available for cancellations made at least 24 hours in advance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;