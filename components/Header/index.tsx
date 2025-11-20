'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '@/components/ThemeCheck';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsHidden(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const lastY = lastScrollYRef.current;
      const scrollingDown = currentY > lastY;
      const shouldHide = currentY > 80 && scrollingDown;

      setIsHidden(shouldHide);
      lastScrollYRef.current = currentY < 0 ? 0 : currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md  dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_2px_rgba(0,0,0,0.15)] sticky top-0 z-50 will-change-transform ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'} motion-reduce:transition-none`}
      style={{
        transition:
          'transform 400ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 300ms ease',
      }}
    >
      <div className='max-w-5xl mx-auto px-6'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo 区域 - Google 风格 */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='flex items-center space-x-3 text-[#202124] dark:text-[#e8eaed] hover:opacity-80 transition-opacity duration-200'
            >
              <Image
                src='/image/logo.png'
                alt='Electronic Atlas Logo'
                width={32}
                height={32}
                className='w-8 h-8 object-contain'
                priority
              />
              <span className='text-xl font-normal tracking-tight'>
                Electronic Atlas
              </span>
            </Link>
          </div>

          {/* 桌面端导航菜单和主题切换 - Google 风格 */}
          <div className='hidden md:flex items-center space-x-2'>
            <nav className='flex space-x-1' aria-label='主导航'>
              <Link
                href='/'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d]'
              >
                首页
              </Link>
              <Link
                href='/map'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d]'
              >
                地图
              </Link>
              <Link
                href='/data'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d]'
              >
                数据
              </Link>
              <Link
                href='/about'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d]'
              >
                关于
              </Link>
            </nav>
            {/* <div className='ml-2'>
              <ModeToggle />
            </div> */}
          </div>

          {/* 移动端菜单按钮和主题切换 - Google 风格 */}
          <div className='md:hidden flex items-center space-x-2'>
            {/* <ModeToggle /> */}
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-full text-[#5f6368] dark:text-[#9aa0a6] hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#4285f4] transition-colors duration-200'
              aria-controls='mobile-menu'
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className='sr-only'>打开主菜单</span>
              {!isMenuOpen ? (
                <svg
                  className='h-5 w-5'
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
                  className='h-5 w-5'
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

        {/* 移动端菜单 - Google 风格 */}
        {isMenuOpen && (
          <div className='md:hidden' id='mobile-menu'>
            <div className='px-2 pt-2 pb-3 space-y-1 border-t border-[#e8eaed] dark:border-[#3c4043]'>
              <Link
                href='/'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d] block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href='/map'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d] block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                地图
              </Link>
              <Link
                href='/data'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d] block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                数据
              </Link>
              <Link
                href='/about'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d] block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200'
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
