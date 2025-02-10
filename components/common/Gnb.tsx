"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/list", label: "모임 찾기" },
  { href: "/liked", label: "찜한 모임" },
  { href: "/review", label: "모든 리뷰" },
];

function UserProfile({
  isLoggedIn,
  profileImageSrc,
}: {
  isLoggedIn: boolean;
  profileImageSrc: string;
}) {
  return isLoggedIn ? (
    <Image
      src={profileImageSrc}
      alt="user profile image"
      width={40}
      height={40}
    />
  ) : (
    <Link href="auth">로그인</Link>
  );
}

function NavLinks() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <ul className="flex gap-x-6 pl-5">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`transition-colors ${isActive(link.href) ? "font-bold text-mint-600" : "text-black"} hover:text-mint-600`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Gnb() {
  const isLoggedIn = false;
  const profileImageSrc = "/image/img-profile-large-default.svg";

  return (
    <nav className="flex h-14 flex-row items-center justify-between border-b-2 border-gray-300 bg-white px-6 text-sm font-medium sm:h-[3.75rem] sm:text-base lg:px-[22.5rem]">
      <div className="flex">
        <Link href="/list" className="rounded-md border border-black">
          로고
        </Link>
        <NavLinks />
      </div>
      <UserProfile isLoggedIn={isLoggedIn} profileImageSrc={profileImageSrc} />
    </nav>
  );
}
