import mainLogo from "@/assets/img/main_logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaSquareFacebook } from "react-icons/fa6";
import NavItem from "./NavItem";
import { usePathname, useRouter } from "next/navigation";


const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/dashboard');

  return isAdmin ? (
    <div className="bg-primary-yellow py-3">
      <div className="container mx-auto flex justify-between">
        <section className="space-y-2">
          <div className="flex">
            <nav className="flex gap-2">
              <NavItem text="商品上傳" href="/dashboard/upload" />
              <NavItem text="商品列表" href="/dashboard/list" />
            </nav>
          </div>
        </section>
      </div>
    </div>
  ): (
    <div className="bg-primary-yellow py-3">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <Image src={mainLogo} width={300} height={115} alt="神龍變裝" />
        </Link>
        <section className="space-y-2">
          <div className="flex gap-2 text-black text-4xl cursor-pointer">
            <a href="">
              <FaSquareFacebook />
            </a>
            <a href="">
              <FaInstagram />
            </a>
          </div>
          <div className="flex">
            <input type="text" />
            <nav className="flex gap-2">
              <NavItem text="商品販售" href="/product-sale" />
              <NavItem text="租借流程" href="/rental-process" />
            </nav>
          </div>
        </section>
      </div>
    </div>
  )
};

export default Header;
