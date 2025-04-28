import Link from "next/link";
import Image from "next/image";
import SearchBar from "./searchbar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-color-a shadow-md z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-16">
          {/* Logo and Company Name  */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png" // Replace with your logo in public/logo.png
                alt="AI Essay Reviewer Logo"
                width={25}
                height={25}
                className="object-contain"
              />
              <span className="text-xl font-medium font-arial text-gray-800">
                AI Essay Reviewer
              </span>
            </Link>
          </div>

          <SearchBar />

          {/* Additional Links */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/upload"
              className="text-gray-600 hover:text-blue-500 hidden"
            >
              Upload Essay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
