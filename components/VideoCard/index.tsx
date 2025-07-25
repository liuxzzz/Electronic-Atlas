'use client';

import { useState, useEffect } from 'react';
import { findCountryByName, formatViewCount, type Country } from '@/lib/utils';
import { Play, Eye, Clock } from 'lucide-react';
import Image from 'next/image';

interface VideoCardProps {
  countryName: string;
  className?: string;
}

export function VideoCard({ countryName, className = '' }: VideoCardProps) {
  const [countryData, setCountryData] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountryData = async () => {
      setLoading(true);
      const data = await findCountryByName(countryName);
      setCountryData(data);
      setLoading(false);
    };

    if (countryName) {
      loadCountryData();
    }
  }, [countryName]);

  if (loading) {
    return (
      <div
        className={`rounded-lg overflow-hidden bg-card border animate-pulse ${className}`}
      >
        <div className='aspect-video bg-muted'></div>
        <div className='p-4 space-y-2'>
          <div className='h-4 bg-muted rounded w-3/4'></div>
          <div className='h-3 bg-muted rounded w-1/2'></div>
        </div>
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className={`rounded-lg overflow-hidden bg-card border ${className}`}>
        <div className='aspect-video bg-muted flex items-center justify-center'>
          <p className='text-muted-foreground'>未找到 {countryName} 相关视频</p>
        </div>
      </div>
    );
  }

  const handleCardClick = () => {
    // setShowDialog(true);
    //跳转视频链接
    window.open(countryData.url, '_blank');
  };

  return (
    <>
      <div
        className={` rounded-lg overflow-hidden bg-card border hover:shadow-lg transition-shadow cursor-pointer group ${className}`}
        onClick={handleCardClick}
      >
        {/* 视频封面 */}
        <div className='relative aspect-video overflow-hidden'>
          <Image
            src={`https://i2.hdslb.com/bfs/archive/${countryData.cover}`}
            alt={countryData.name}
            fill
            className='object-cover transition-transform group-hover:scale-105'
            priority
            quality={85}
          />

          {/* 播放按钮覆盖层 */}
          <div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <div className='bg-white/90 rounded-full p-3'>
              <Play className='w-6 h-6 text-black fill-black' />
            </div>
          </div>

          {/* 时长标签 */}
          <div className='absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded'>
            {countryData.duration}
          </div>
        </div>

        {/* 视频信息 */}
        <div className='p-4'>
          <h3 className='font-semibold text-sm mb-2 line-clamp-2 leading-relaxed'>
            {countryData.name}
          </h3>

          <div className='flex items-center gap-4 text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Eye className='w-3 h-3' />
              <span>{formatViewCount(countryData.view)}</span>
            </div>

            <div className='flex items-center gap-1'>
              <Clock className='w-3 h-3' />
              <span>{countryData.pub_date}</span>
            </div>
          </div>

          {/* 系列信息 */}
          <div className='mt-2 flex items-center gap-2'>
            <span className='bg-primary/10 text-primary text-xs px-2 py-1 rounded'>
              {countryData.series}
            </span>
            <span className='text-xs text-muted-foreground'>
              第{countryData.episode}期
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoCard;
