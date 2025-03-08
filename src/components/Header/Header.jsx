import React, { useState } from 'react';
import { Container, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaUserPlus, FaBlog, FaPlus } from 'react-icons/fa';
import logo from '../../assets/logo4.png';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true, icon: <FaHome /> },
    { name: 'Login', slug: '/login', active: !authStatus, icon: <FaSignInAlt /> },
    { name: 'Signup', slug: '/signup', active: !authStatus, icon: <FaUserPlus /> },
    { name: 'All Posts', slug: '/all-posts', active: authStatus, icon: <FaBlog /> },
    { name: 'Add Post', slug: '/add-post', active: authStatus, icon: <FaPlus /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className='py-6 shadow-md bg-gray-800'>
      <Container>
        <nav className='flex items-center justify-between'>
         
          <Link to='/' className='flex items-center'>
            <img
              src={logo} 
              alt='Logo'
              className='w-22 h-20 rounded-full'
            />
          </Link>

          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-white focus:outline-none'>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <ul
            className={`${
              isOpen ? 'flex' : 'hidden'
            } flex-col md:flex-row md:flex md:items-center md:space-x-4 absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-20 md:top-0 p-4 md:p-0 z-10`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='mb-2 md:mb-0'>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false); 
                    }}
                    className='w-full md:w-auto px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200 flex items-center space-x-2'
                  >
                    {item.icon} 
                    <span>{item.name}</span> 
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='mb-2 md:mb-0'>
                <LogoutBtn className='w-full md:w-auto px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-200 flex items-center space-x-2' /> 
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;