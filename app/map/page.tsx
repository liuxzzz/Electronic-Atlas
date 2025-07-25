'use client';

import Map from '@/components/Map';
import VideoDetailDialog from '@/components/VideoDetailDialog';
import { useState } from 'react';

export default function MapPage() {
  const [open, setOpen] = useState(false);
  const [countryName, setCountryName] = useState('');

  const onClickArea = (countryName: string) => {
    setCountryName(countryName);
    setOpen(true);
  };

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
        <Map onClickArea={onClickArea} />
      </div>

      <VideoDetailDialog
        isOpen={open}
        onOpenChange={() => setOpen(false)}
        countryName={countryName}
      ></VideoDetailDialog>
    </div>
  );
}
