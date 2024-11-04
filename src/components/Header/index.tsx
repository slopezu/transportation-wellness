'use client'

import React, { useEffect, useState } from "react";
import { Menu } from "@/types/menu";
import { onScroll } from "@/utils/scrollActive";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { Menu as MenuIcon, X } from 'lucide-react';

const menuData: Menu[] = [
  {
    label: "Features",
    route: "/#features",
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
  const router = useRouter();

  useEffect(() => {
    if (pathUrl === "/") {
      window.addEventListener("scroll", onScroll);
    }

    window.addEventListener("scroll", handleStickyNavbar);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, [pathUrl]);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.refresh();
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b border-stroke bg-white bg-opacity-80 backdrop-blur-sm transition-all duration-300 dark:border-stroke-dark dark:bg-black dark:bg-opacity-80 ${
        sticky ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="flex items-center justify-between py-2">
          <a href="/" onClick={handleLogoClick} className="block">
            <Image
              width={70}
              height={34}
              src="/images/logo/logo.png"
              alt="Logo"
              priority
              className="h-8 w-auto dark:hidden"
            />
            <Image
              width={70}
              height={34}
              src="/images/logo/logo.png"
              alt="Logo"
              priority
              className="hidden h-8 w-auto dark:block"
            />
          </a>

          <button
            onClick={navbarToggleHandler}
            className="block lg:hidden"
            aria-label="Toggle menu"
          >
            {navbarOpen ? (
              <X className="h-6 w-6 text-black dark:text-white" />
            ) : (
              <MenuIcon className="h-6 w-6 text-black dark:text-white" />
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
                  <a
                    href={item.route}
                    onClick={(e) => scrollToSection(e, item.route.replace('/#', ''))}
                    className="text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    {item.label}
                  </a>
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