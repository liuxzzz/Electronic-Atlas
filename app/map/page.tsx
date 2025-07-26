'use client';

import Map from '@/components/Map';
import VideoDetailDialog from '@/components/VideoDetailDialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function MapPage() {
  const [open, setOpen] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [showHainanCircle, setShowHainanCircle] = useState(false);

  const onClickArea = (countryName: string) => {
    setCountryName(countryName);
    setOpen(true);
  };

  const handleHainanCircleToggle = () => {
    setShowHainanCircle(!showHainanCircle);
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
            <Button variant='default' size='default'>
              重置视图
            </Button>
            <Button variant='outline' size='default'>
              全屏模式
            </Button>
            <Button
              variant='default'
              size='default'
              className={`${showHainanCircle ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white shadow-xs`}
              onClick={handleHainanCircleToggle}
            >
              {showHainanCircle ? '隐藏圆圈' : '海南岛中心圈'}
            </Button>
          </div>
        </div>
      </div>

      {/* 地图区域 */}
      <div className='flex-1 relative'>
        <Map onClickArea={onClickArea} showHainanCircle={showHainanCircle} />
      </div>

      <VideoDetailDialog
        isOpen={open}
        onOpenChange={() => setOpen(false)}
        countryName={countryName}
      ></VideoDetailDialog>
    </div>
  );
}
