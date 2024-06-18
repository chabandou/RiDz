import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";

export default function Navbar() {
    return (
        <header className="w-full absolute z-10">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
                <Link href="/" className="flex justify-center items-center">
                    <Image src="/logo.svg" alt="RiDz logo" width={145} height={45} className="object-contain"/>
                </Link>
                <CustomButton 
                    title="Connexion"
                    containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                    btnType="button"

                />
            </nav>
        </header>
    )
}