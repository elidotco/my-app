import { useState } from "react";
import Link from "next/link";
import ClickOutside from "./ClickOutside";

interface DropdownUserProps {
  name: string;
  role: string;
  image: string;
}

const DropdownUser: React.FC<DropdownUserProps> = ({ name, role, image }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  return (
    <ClickOutside handler={() => setDropdownOpen(false)}>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2"
        >
          <img
            src={image}
            alt={`${name}'s profile`}
            className="w-8 h-8 rounded-full"
          />
          <span>{name}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
            <div className="px-4 py-2 text-sm text-gray-700">
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
            <div className="border-t">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  // Handle logout logic
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownUser;
