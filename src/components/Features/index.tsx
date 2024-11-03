'use client';

import React from "react";
import Graphics from "@/components/Features/Graphics";
import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    title: "Online Booking",
    description: "Easy-to-use reservation system through a mobile app or website.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
      </svg>
    ),
    title: "Optimized Routes",
    description: "Utilizing GPS technology to find the most efficient and comfortable routes for passengers.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    ),
    title: "Real-Time Monitoring",
    description: "Live tracking of vehicles for peace of mind of clients and their families.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
      </svg>
    ),
    title: "Comfortable Environment",
    description: "Vehicles equipped with temperature control, ergonomic seats, and relaxing music.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "Trained Drivers",
    description: "Staff specialized in customer service and first aid, with knowledge of health and wellness needs.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
    title: "Reliable Service",
    description: "Consistent, punctual, and dependable transportation you can count on for all your wellness needs.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 pt-[110px]">
      <div className="container">
        <div
          className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Our Wellness Transportation Features
          </h2>
          <p className="text-base text-body">
            Experience comfort, safety, and care with our specialized transportation services designed for your health and wellness needs.
          </p>
        </div>
      </div>

      <div className="container max-w-[1390px]">
        <div className="rounded-2xl bg-white px-5 pb-14 pt-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pb-5 lg:pt-20 xl:px-10">
          <div className="-mx-4 flex flex-wrap">
            {featuresData.map((item, index) => (
              <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".2s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-green-800 duration-300 group-hover:bg-green-800 group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-green-800">
                    {item.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    {item.title}
                  </h3>
                  <p className="text-base text-body">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Graphics />
    </section>
  );
}