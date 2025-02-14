"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/list", label: "모임 찾기" },
  { href: "/liked", label: "찜한 모임" },
  { href: "/review", label: "모든 리뷰" },
];

function UserProfile() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = !!cookies.token;
  const profileImageSrc = "/image/img-profile-large-default.svg";
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    removeCookie("token");
    setIsDropdownOpen(false);
    router.push("/");
  };

  if (!isMounted) {
    return null;
    // TODO 데이터 로딩 표시를 추가할 지 말 지 데이터 확인 후 작업 예정
  }

  return isLoggedIn ? (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center focus:outline-none"
      >
        <Image
          src={profileImageSrc}
          alt="user profile image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 flex w-fit flex-col gap-y-2 whitespace-nowrap rounded-md bg-white px-3 py-2 text-base font-medium text-gray-800 shadow-md lg:left-0">
          <Link
            href="/mypage"
            className="block hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            마이페이지
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full text-left hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link href="/signin">로그인</Link>
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
  return (
    <nav className="flex h-14 flex-row items-center justify-between border-b-2 border-gray-300 bg-white px-6 text-sm font-medium sm:h-[3.75rem] sm:text-base lg:px-[15%]">
      <div className="flex">
        <Link href="/list" className="rounded-md border border-black">
          로고
        </Link>
        <NavLinks />
      </div>
      <UserProfile />
    </nav>
  );
}
