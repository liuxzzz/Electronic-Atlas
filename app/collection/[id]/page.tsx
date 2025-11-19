'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// 这里可以根据实际情况从API或数据库获取
const collectionData: Record<string, any> = {
  'world-geography': {
    id: 'world-geography',
    title: '世界地理系列',
    description: '探索世界各国的地理特征、历史文化与经济发展',
    videoCount: 45,
    coverImage: '/image/preview-map.png',
    videos: [
      { id: 1, title: '示例视频 1', duration: '15:30', thumbnail: '/image/preview-map.png' },
      { id: 2, title: '示例视频 2', duration: '12:45', thumbnail: '/image/preview-map.png' },
      { id: 3, title: '示例视频 3', duration: '18:20', thumbnail: '/image/preview-map.png' },
    ],
  },
  'asia-pacific': {
    id: 'asia-pacific',
    title: '亚太地区专题',
    description: '深入了解亚太地区各国的政治、经济与社会发展',
    videoCount: 28,
    coverImage: '/image/preview-map.png',
    videos: [
      { id: 1, title: '示例视频 1', duration: '15:30', thumbnail: '/image/preview-map.png' },
      { id: 2, title: '示例视频 2', duration: '12:45', thumbnail: '/image/preview-map.png' },
    ],
  },
  'europe-series': {
    id: 'europe-series',
    title: '欧洲国家解析',
    description: '欧洲各国的历史变迁、文化传统与现代发展',
    videoCount: 32,
    coverImage: '/image/preview-map.png',
    videos: [
      { id: 1, title: '示例视频 1', duration: '15:30', thumbnail: '/image/preview-map.png' },
      { id: 2, title: '示例视频 2', duration: '12:45', thumbnail: '/image/preview-map.png' },
    ],
  },
};

export default function CollectionPage() {
  const params = useParams();
  const collectionId = params.id as string;
  const collection = collectionData[collectionId];

  if (!collection) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white dark:bg-slate-950'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-slate-900 dark:text-white mb-4'>
            合集不存在
          </h1>
          <p className='text-slate-600 dark:text-slate-400 mb-8'>
            抱歉，您访问的合集不存在或已被移除
          </p>
          <Link
            href='/'
            className='inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors'
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white dark:bg-slate-950'>
      {/* 头部横幅 */}
      <div className='relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-8'>
          <Link
            href='/'
            className='inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors w-fit'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            返回首页
          </Link>
          <h1 className='text-4xl font-bold text-white mb-2'>{collection.title}</h1>
          <p className='text-white/90 text-lg'>{collection.description}</p>
          <div className='mt-4 flex items-center gap-4 text-white/80 text-sm'>
            <span className='flex items-center gap-1'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' />
              </svg>
              共 {collection.videoCount} 个视频
            </span>
          </div>
        </div>
      </div>

      {/* 视频列表 */}
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {collection.videos.map((video: any) => (
            <div
              key={video.id}
              className='group cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300'
            >
              <div className='relative h-48 bg-slate-100 dark:bg-slate-800'>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium'>
                  {video.duration}
                </div>
              </div>
              <div className='p-4'>
                <h3 className='text-base font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态提示 */}
        {collection.videos.length === 0 && (
          <div className='text-center py-20'>
            <svg className='w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' />
            </svg>
            <p className='text-slate-500 dark:text-slate-400'>该合集暂无视频</p>
          </div>
        )}
      </div>
    </div>
  );
}

