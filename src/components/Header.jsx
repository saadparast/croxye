import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { 
      name: 'Products', 
      href: '/products',
      dropdown: [
        { name: 'Spices', href: '/products?category=spices' },
        { name: 'Makhana', href: '/products?category=makhana' },
        { name: 'Moringa Powder', href: '/products?category=moringa' },
        { name: 'Other Goods', href: '/products?category=other' }
      ]
    },
    { name: 'Exports', href: '/exports' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Croxy Exim</span>
              <span className="text-xs text-gray-600">Premium Indian Exports</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-orange-600'
                          : 'text-gray-700 hover:text-orange-600'
                      }`}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isProductsOpen && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1"
                        onMouseEnter={() => setIsProductsOpen(true)}
                        onMouseLeave={() => setIsProductsOpen(false)}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-orange-600'
                        : 'text-gray-700 hover:text-orange-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Contact */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="px-3 pb-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <Button asChild className="w-full mx-3 bg-orange-600 hover:bg-orange-700">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

