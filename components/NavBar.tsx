import AuthButton from "./AuthButton";
import {AiFillCar} from 'react-icons/ai'

export default function NavBar() {
  return (
    <nav className="sticky top-0 left-0 z-50 w-full border-b border-gray-200 bg-white px-2 py-2.5 sm:px-4">
      {/* Logo & Name */}
      <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-2">
        <a href="#" className="flex items-center gap-3">
          {/* IMAGE */}
          <span className="self-center whitespace-nowrap text-3xl italic font-black">
            Carbee
          </span>
          <AiFillCar size={36}/>
        </a>

        {/* Authbutton & Greeting*/}
        <div className="flex md:order-2 content-end">
          <AuthButton />
        </div>

      </div>
    </nav>
  );
}
