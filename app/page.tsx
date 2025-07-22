import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen'>
      {/* 英雄区域 */}
      <section className='bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
              欢迎来到
              <span className='text-blue-600 dark:text-blue-400 block'>
                Electronic Atlas
              </span>
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto'>
              探索世界的全新方式，通过交互式电子地图集发现地理之美
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/map'
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg'
              >
                开始探索地图
              </Link>
              <Link
                href='/about'
                className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg'
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性区域 */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              强大功能
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              为您提供最完整的地理信息体验
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl'>
              <div className='bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-blue-600 dark:text-blue-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                交互式地图
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                高清晰度的世界地图，支持缩放和平移操作
              </p>
            </div>

            <div className='text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl'>
              <div className='bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-600 dark:text-green-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                详细信息
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                提供国家地区的详细地理和文化信息
              </p>
            </div>

            <div className='text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl'>
              <div className='bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-purple-600 dark:text-purple-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                现代设计
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                响应式设计，支持深色模式和移动设备
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据区域 */}
      <section className='py-20 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                195
              </div>
              <div className='text-gray-600 dark:text-gray-300'>个国家</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-green-600 dark:text-green-400 mb-2'>
                7
              </div>
              <div className='text-gray-600 dark:text-gray-300'>大洲</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2'>
                ∞
              </div>
              <div className='text-gray-600 dark:text-gray-300'>种可能</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2'>
                24/7
              </div>
              <div className='text-gray-600 dark:text-gray-300'>随时探索</div>
            </div>
          </div>
        </div>
      </section>

      {/* 行动号召区域 */}
      <section className='bg-blue-600 dark:bg-blue-800 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            准备开始您的地理探索之旅了吗？
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            立即体验我们的交互式地图功能
          </p>
          <Link
            href='/map'
            className='bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg inline-block'
          >
            立即开始探索
          </Link>
        </div>
      </section>
    </div>
  );
}
