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
    <header className='bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo 区域 */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='flex items-center space-x-3 text-foreground hover:opacity-80 transition-all duration-200'
            >
              <Image
                src='/image/logo.png'
                alt='Electronic Atlas Logo'
                width={32}
                height={32}
                className='w-8 h-8 object-contain'
                priority
              />
              <span className='text-xl font-semibold tracking-tight'>
                Electronic Atlas
              </span>
            </Link>
          </div>

          {/* 桌面端导航菜单和主题切换 */}
          <div className='hidden md:flex items-center space-x-1'>
            <nav className='flex space-x-1' aria-label='主导航'>
              <Link
                href='/'
                className='text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-accent'
              >
                首页
              </Link>
              <Link
                href='/map'
                className='text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-accent'
              >
                地图
              </Link>
              <Link
                href='/data'
                className='text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-accent'
              >
                数据
              </Link>
              <Link
                href='/about'
                className='text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-accent'
              >
                关于
              </Link>
            </nav>
            <div className='ml-4'>
              <ModeToggle />
            </div>
          </div>

          {/* 移动端菜单按钮和主题切换 */}
          <div className='md:hidden flex items-center space-x-2'>
            <ModeToggle />
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200'
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

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className='md:hidden' id='mobile-menu'>
            <div className='px-2 pt-2 pb-3 space-y-1 border-t border-border'>
              <Link
                href='/'
                className='text-muted-foreground hover:text-foreground hover:bg-accent block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href='/map'
                className='text-muted-foreground hover:text-foreground hover:bg-accent block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                地图
              </Link>
              <Link
                href='/data'
                className='text-muted-foreground hover:text-foreground hover:bg-accent block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}
              >
                数据
              </Link>
              <Link
                href='/about'
                className='text-muted-foreground hover:text-foreground hover:bg-accent block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200'
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
