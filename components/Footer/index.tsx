import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* 品牌信息 */}
          <div className='md:col-span-2'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Electronic Atlas
            </h3>
            <p className='text-gray-600 dark:text-gray-400 text-sm leading-6 max-w-md'>
              一个现代化的电子地图集应用，为您提供详细的地理信息和交互式地图体验。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4'>
              快速链接
            </h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href='/map'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                >
                  地图
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系信息 */}
          <div>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4'>
              联系我们
            </h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='mailto:contact@electronic-atlas.com'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                >
                  邮箱联系
                </a>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                >
                  隐私政策
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                >
                  服务条款
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 社交媒体链接 */}
        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              © {currentYear} Electronic Atlas. 保留所有权利。
            </p>

            <div className='flex space-x-6'>
              <a
                href='https://github.com'
                className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
                aria-label='GitHub'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>

              <a
                href='https://twitter.com'
                className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
                aria-label='Twitter'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </a>

              <a
                href='https://linkedin.com'
                className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
                aria-label='LinkedIn'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
