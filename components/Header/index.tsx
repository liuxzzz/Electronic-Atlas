'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '@/components/ThemeCheck';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo 区域 */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='flex items-center space-x-3 text-gray-900 dark:text-white hover:opacity-80 transition-opacity duration-200'
            >
              <Image
                src='/image/logo.png'
                alt='Electronic Atlas Logo'
                width={40}
                height={40}
                className='w-10 h-10 object-contain'
                priority
              />
              <span className='text-2xl font-bold'>Electronic Atlas</span>
            </Link>
          </div>

          {/* 桌面端导航菜单和主题切换 */}
          <div className='hidden md:flex items-center space-x-8'>
            <nav className='flex space-x-8' aria-label='主导航'>
              <Link
                href='/'
                className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
              >
                首页
              </Link>
              <Link
                href='/map'
                className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
              >
                地图
              </Link>
              <Link
                href='/data'
                className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
              >
                数据
              </Link>
              <Link
                href='/about'
                className='text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
              >
                关于
              </Link>
            </nav>
            <ModeToggle />
          </div>

          {/* 移动端菜单按钮和主题切换 */}
          <div className='md:hidden flex items-center space-x-2'>
            <ModeToggle />
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
              aria-controls='mobile-menu'
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className='sr-only'>打开主菜单</span>
              {!isMenuOpen ? (
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className='md:hidden' id='mobile-menu'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700'>
              <Link
                href='/'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href='/map'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                地图
              </Link>
              <Link
                href='/data'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                数据
              </Link>
              <Link
                href='/about'
                className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
