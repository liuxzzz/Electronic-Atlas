// 临时地图组件占位符
const MapComponent = () => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700'>
      <div className='text-center'>
        <svg
          className='w-24 h-24 mx-auto mb-4 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
          />
        </svg>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          交互式世界地图
        </h3>
        <p className='text-gray-600 dark:text-gray-300'>
          地图组件正在开发中...
        </p>
        <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
          <p>即将支持的功能：</p>
          <ul className='mt-2 space-y-1'>
            <li>• 可缩放的世界地图</li>
            <li>• 国家信息展示</li>
            <li>• 搜索功能</li>
            <li>• 标记功能</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

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
        <MapComponent />

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
