
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAppContext } from '@/context/AppContext';

const Header: React.FC = () => {
  const { currentUser } = useAppContext();

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg className="h-8 w-8 text-heatpump-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V7M12 7L9 5M12 7L15 5M5 8L7 9M7 9V13M7 9L4 11M19 8L17 9M17 9V13M17 9L20 11M12 21V17M12 17L9 19M12 17L15 19M7 13V17L12 21L17 17V13L12 9L7 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-900">WärmepumpenProfi</span>
            </Link>

            <nav className="hidden md:flex ml-10">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                Dashboard
              </Link>
              <Link to="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                Projekte
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            {currentUser && (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 20C18 17.7909 15.3137 16 12 16C8.68629 16 6 17.7909 6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
