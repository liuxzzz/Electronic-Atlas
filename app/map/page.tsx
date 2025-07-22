import Map from '@/components/Map';

export default function MapPage() {
  return (
    <div className='h-screen flex flex-col'>
      {/* 地图控制面板 */}
      <div className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              世界地图
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>
              点击任何国家或地区了解更多信息
            </p>
          </div>

          <div className='flex space-x-2'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200'>
              重置视图
            </button>
            <button className='border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200'>
              全屏模式
            </button>
          </div>
        </div>
      </div>

      {/* 地图区域 */}
      <div className='flex-1 relative'>
        <Map />

        {/* 地图图例 */}
        <div className='absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs'>
          <h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
            图例说明
          </h3>
          <div className='space-y-2 text-sm'>
            <div className='flex items-center'>
              <div className='w-4 h-4 bg-blue-500 rounded mr-2'></div>
              <span className='text-gray-700 dark:text-gray-300'>国家边界</span>
            </div>
            <div className='flex items-center'>
              <div className='w-4 h-4 bg-green-500 rounded mr-2'></div>
              <span className='text-gray-700 dark:text-gray-300'>
                已访问区域
              </span>
            </div>
            <div className='flex items-center'>
              <div className='w-4 h-4 bg-gray-300 rounded mr-2'></div>
              <span className='text-gray-700 dark:text-gray-300'>未知区域</span>
            </div>
          </div>
        </div>

        {/* 搜索框 */}
        <div className='absolute top-4 right-4 w-80'>
          <div className='relative'>
            <input
              type='text'
              placeholder='搜索国家或地区...'
              className='w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <svg
              className='absolute left-3 top-3.5 h-5 w-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
