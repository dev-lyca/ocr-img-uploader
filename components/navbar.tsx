"use client";

import { Link } from "@heroui/react";
import clsx from "clsx";
import NextLink from "next/link";
import { useState } from "react";

import { DiscordIcon, GithubIcon, Logo, TwitterIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto grid h-16 max-w-[1280px] grid-cols-3 items-center px-6">
        {/* LEFT — logo */}
        <div className="flex items-center">
          <NextLink className="flex items-center gap-2" href="/">
            <Logo />
            <p className="font-bold text-success tracking-widest">
              LENSTEXT
              <span className="animate-[blink_1.1s_step-end_infinite] ml-0.5">
                █
              </span>
            </p>
          </NextLink>
        </div>

        {/* CENTER — nav items */}
        <ul className="hidden lg:flex items-center justify-center gap-6">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <NextLink
                className={clsx(
                  "text-foreground hover:text-accent transition-colors text-sm",
                  "data-[active=true]:text-accent data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>

        {/* RIGHT — social icons + theme switch */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <Link
              aria-label="Twitter"
              href={siteConfig.links.twitter}
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterIcon className="text-muted" />
            </Link>
            <Link
              aria-label="Discord"
              href={siteConfig.links.discord}
              rel="noopener noreferrer"
              target="_blank"
            >
              <DiscordIcon className="text-muted" />
            </Link>
            <Link
              aria-label="Github"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="text-muted" />
            </Link>
          </div>

          {/* mobile: github + theme only */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              aria-label="Github"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="text-muted" />
            </Link>
          </div>

          <ThemeSwitch />

          {/* mobile hamburger */}
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="p-2 sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
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

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-separator sm:hidden">
          <ul className="flex flex-col gap-2 px-4 pb-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <Link
                  className={clsx(
                    "block py-2 text-lg no-underline",
                    index === 2
                      ? "text-accent"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "text-danger"
                        : "text-foreground",
                  )}
                  href="#"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
