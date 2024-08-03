import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href={"/"}>
      <div className="items-center hidden lg:flex gap-1">
        <Image
          src={"/branding/logo.svg"}
          height={28}
          width={28}
          alt="logo"
          className="w-full h-full"
        />
        <p className="font-semibold text-white text-xl ml-2">Finance</p>
      </div>
    </Link>
  );
};
