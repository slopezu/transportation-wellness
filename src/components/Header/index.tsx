'use client'

import React, { useEffect, useState } from "react";
import { Menu } from "@/types/menu";
import { onScroll } from "@/utils/scrollActive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";

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
    label: "Contact Us (Last minute)",
    route: "/#contact",
  },
];

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathUrl = usePathname();

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

  return (
    <header
      className={`navbar left-0 top-0 z-50 w-full border-stroke bg-white dark:border-stroke-dark dark:bg-black ${
        sticky
          ? "fixed border-b bg-opacity-95 backdrop-blur-sm dark:bg-opacity-95"
          : "absolute"
      }`}
    >
      <div className="container relative max-w-[1400px]">
        <div className="flex items-center justify-between">
          <div className="block py-4 lg:py-0">
            <Link href="/" className="block max-w-[145px] sm:max-w-[180px]">
              <Image
                width={70}
                height={34}
                src={"/images/logo/logo.png"}
                alt="Logo"
                priority
                className="block dark:hidden"
                style={{ width: "auto", height: "auto" }}
              />
              <Image
                width={70}
                height={34}
                src={"/images/logo/logo.png"}
                alt="Logo"
                priority
                className="hidden dark:block"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>

          <button
            onClick={navbarToggleHandler}
            className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
            aria-label="navbarOpen"
            name="navbarOpen"
          >
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
          </button>

          <div
            className={`${
              navbarOpen ? "" : "hidden"
            } menu-wrapper relative justify-between lg:flex`}
          >
            <button
              onClick={() => setNavbarOpen(false)}
              className="navbarClose fixed right-10 top-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
              name="navbarClose"
              aria-label="navbarClose"
            >
              <span className="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
              <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
            </button>

            <nav className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent lg:bg-opacity-100 lg:backdrop-blur-0 lg:backdrop-blur-none lg:dark:bg-transparent dark:lg:bg-opacity-100">
              <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
                {menuData.map((item, index) => (
                  <li key={index} className="menu-item">
                    <Link
                      href={item.route}
                      onClick={(e) => scrollToSection(e, item.route.replace('/#', ''))}
                      className={`${
                        sticky ? "lg:py-[21px]" : "lg:py-7"
                      } ud-menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mr-[60px] flex items-center justify-end lg:mr-0">
            <DarkModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}