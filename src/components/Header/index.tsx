'use client'

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { MenuIcon, X } from 'lucide-react';

const menuData = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/#about",
  },
  {
    label: "How It Works",
    route: "/#work-process",
  },
  {
    label: "Contact Us",
    route: "/#contact",
  },
];

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathUrl = usePathname();

  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleStickyNavbar);

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Section with id '${sectionId}' not found`);
    }
    closeMenu();
  };

  const handleReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b border-stroke bg-white bg-opacity-80 backdrop-blur-sm transition-all duration-300 dark:border-stroke-dark dark:bg-black dark:bg-opacity-80 ${
        sticky ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" onClick={handleReload} className="block">
            <Image
              width={140}
              height={68}
              src="/images/logo/logo.png"
              alt="Wellness Transportation Logo"
              priority
              className="h-16 w-auto dark:hidden"
            />
            <Image
              width={140}
              height={68}
              src="/images/logo/logo.png"
              alt="Wellness Transportation Logo"
              priority
              className="hidden h-16 w-auto dark:block"
            />
          </Link>

          <button
            onClick={navbarToggleHandler}
            className="block lg:hidden"
            aria-label="Toggle menu"
          >
            {navbarOpen ? (
              <X className="h-8 w-8 text-black dark:text-white" />
            ) : (
              <MenuIcon className="h-8 w-8 text-black dark:text-white" />
            )}
          </button>

          <nav
            className={`${
              navbarOpen ? "block" : "hidden"
            } absolute left-0 top-full w-full bg-white px-4 py-4 shadow-md dark:bg-black lg:static lg:block lg:w-auto lg:shadow-none`}
          >
            <ul className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
              {menuData.map((item, index) => (
                <li key={index}>
                  {item.route === "/" ? (
                    <a
                      href={item.route}
                      onClick={handleReload}
                      className="text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={item.route}
                      onClick={(e) => scrollToSection(e, item.route.replace('/#', ''))}
                      className="text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center">
            <DarkModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
