"use client";

import { Link } from "@heroui/react";
import clsx from "clsx";
import NextLink from "next/link";
import { useState } from "react";

import { GithubIcon, Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky bg-black/80 top-0 z-40 w-full border-b border-separator backdrop-blur-lg dark:bg-background/70 font-mono">
      <header className="mx-auto flex h-14 md:h-16 max-w-[1280px] items-center justify-between px-4 md:px-6">
        {/* LEFT — logo */}
        <NextLink className="flex items-center gap-2 shrink-0" href="/">
          <Logo />
          <p className="font-thin text-white hover:text-success tracking-widest text-sm md:text-base">
            LENSTEXT
            <span className="animate-[blink_1.1s_step-end_infinite] ml-0.5">
              █
            </span>
          </p>
        </NextLink>

        {/* CENTER — nav items (desktop only) */}
        <ul className="hidden lg:flex items-center justify-center gap-6">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <NextLink
                className={clsx(
                  "text-white hover:text-success font-thin dark:text-foreground transition-colors text-sm tracking-widest",
                  "data-[active=true]:text-accent data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>

        {/* RIGHT — icons + theme + hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          {/* GitHub — hidden on mobile */}
          <Link
            aria-label="Github"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
            target="_blank"
            className="hidden sm:flex"
          >
            <GithubIcon className="text-muted" />
          </Link>

          {/* <ThemeSwitch /> */}

          {/* Hamburger — visible below lg */}
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="p-1.5 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile/tablet dropdown menu */}
      {isMenuOpen && (
        <div className="border-t border-separator lg:hidden">
          {/* Nav links */}
          <ul className="flex flex-col px-4 pt-2 pb-3">
            {siteConfig.navMenuItems.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <Link
                  className={clsx(
                    "block hover:text-success tracking-widest py-2.5 text-sm md:text-base no-underline border-b border-zinc-800/50 last:border-0",
                    index === 2
                      ? "text-accent"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "text-danger"
                        : "text-foreground",
                  )}
                  href="#"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* GitHub in mobile menu (since it's hidden in header on xs) */}
          <div className="flex items-center gap-3 px-4 pb-4 sm:hidden">
            <Link
              aria-label="Github"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center gap-2 text-xs tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              <GithubIcon className="text-muted" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
