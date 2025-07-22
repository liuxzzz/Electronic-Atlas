import Link from 'next/link';

export default function About() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* 页面标题区域 */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-600 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>关于我们</h1>
            <p className='text-xl md:text-2xl opacity-90 max-w-3xl mx-auto'>
              致力于让地理知识变得有趣且易于获取
            </p>
          </div>
        </div>
      </section>

      {/* 项目介绍 */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8'>
              Electronic Atlas 的使命
            </h2>
            <div className='text-lg text-gray-600 dark:text-gray-300 space-y-6'>
              <p>
                Electronic Atlas
                是一个现代化的数字地图集项目，我们的目标是通过创新的交互式设计，
                让世界各地的地理信息变得生动有趣，易于理解和探索。
              </p>
              <p>
                在这个数字化的时代，传统的纸质地图集已经难以满足人们对地理信息的需求。
                我们相信，通过现代的 Web
                技术和用户体验设计，可以创造出更好的地理学习和探索工具。
              </p>
              <p>
                我们的平台不仅提供基础的地理信息，还融入了文化、历史、经济等多维度的数据，
                让用户能够全方位地了解世界各地的特色和差异。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特色 */}
      <section className='py-20 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16'>
            我们的特色
          </h2>

          <div className='grid md:grid-cols-2 gap-12'>
            <div>
              <div className='bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-blue-600 dark:text-blue-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                创新技术
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                采用最新的 React、Next.js 和 TypeScript
                技术栈，确保应用的性能和可维护性。
                支持服务器端渲染和静态生成，提供最佳的用户体验。
              </p>
            </div>

            <div>
              <div className='bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-green-600 dark:text-green-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                用户为中心
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                我们始终将用户体验放在首位，通过直观的界面设计和流畅的交互，
                让每个人都能轻松地探索和学习地理知识。
              </p>
            </div>

            <div>
              <div className='bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-purple-600 dark:text-purple-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                高性能
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                优化的代码结构和智能的数据加载策略，确保应用在各种设备和网络环境下都能快速响应。
              </p>
            </div>

            <div>
              <div className='bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-orange-600 dark:text-orange-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                开源精神
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                我们相信开源的力量，项目的代码完全开源，欢迎社区的贡献和建议，
                共同打造更好的地理学习平台。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16'>
            技术栈
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3'>
                <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  React
                </span>
              </div>
              <h3 className='font-semibold text-gray-900 dark:text-white'>
                React 18
              </h3>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3'>
                <span className='text-lg font-bold text-gray-700 dark:text-gray-300'>
                  Next.js
                </span>
              </div>
              <h3 className='font-semibold text-gray-900 dark:text-white'>
                Next.js 14
              </h3>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3'>
                <span className='text-lg font-bold text-blue-600 dark:text-blue-400'>
                  TS
                </span>
              </div>
              <h3 className='font-semibold text-gray-900 dark:text-white'>
                TypeScript
              </h3>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mx-auto mb-3'>
                <span className='text-lg font-bold text-cyan-600 dark:text-cyan-400'>
                  CSS
                </span>
              </div>
              <h3 className='font-semibold text-gray-900 dark:text-white'>
                Tailwind CSS
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className='py-20 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8'>
              联系我们
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto'>
              有任何问题、建议或合作意向，欢迎随时与我们联系。我们期待听到您的声音！
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href='mailto:contact@electronic-atlas.com'
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200'
              >
                发送邮件
              </a>
              <Link
                href='/map'
                className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200'
              >
                开始探索
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
