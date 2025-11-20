import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-[#e8eaed] dark:border-[#3c4043] mt-auto bg-[#f8f9fa] dark:bg-[#1a1a1a]'>
      <div className='max-w-5xl mx-auto py-12 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-10'>
          {/* 品牌信息 - Google 风格 */}
          <div className='md:col-span-2'>
            <h3 className='text-lg font-normal text-[#202124] dark:text-[#e8eaed] mb-3'>
              Electronic Atlas
            </h3>
          </div>

      

        </div>

        {/* 底部信息 - Google 风格 */}
        <div className='pt-6 border-t border-[#e8eaed] dark:border-[#3c4043]'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-[#5f6368] dark:text-[#9aa0a6]'>
              © {currentYear} Electronic Atlas. 保留所有权利。
            </p>

            <div className='flex items-center space-x-3'>
              <a
                href='https://github.com/liuxzzz/Electronic-Atlas'
                className='text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] transition-colors duration-200 p-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#2d2d2d]'
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




            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
