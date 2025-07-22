'use client';

import React, { useState, useEffect } from 'react';

interface VideoData {
  bvid: string;
  title: string;
  play_count: number;
  created_date: string;
  duration: string;
}

interface BilibiliData {
  user: {
    name: string;
    uid: number;
  };
  videos: VideoData[];
  total: number;
  last_updated: string;
}

export default function DataPage() {
  const [data, setData] = useState<BilibiliData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'views'>('date');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/data/bilibili_simplified_1140672573.json');
      if (!response.ok) {
        throw new Error('数据文件不存在，请先在管理页面获取数据');
      }
      const jsonData: BilibiliData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedVideos =
    data?.videos
      ?.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      ?.sort((a, b) => {
        if (sortBy === 'date') {
          return (
            new Date(b.created_date).getTime() -
            new Date(a.created_date).getTime()
          );
        } else {
          return b.play_count - a.play_count;
        }
      }) || [];

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-300'>正在加载数据...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center max-w-md'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            数据加载失败
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>{error}</p>
          <button
            onClick={() => (window.location.href = '/admin')}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
          >
            前往管理页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto p-6'>
        {/* 头部信息 */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6'>
          <div className='flex flex-col md:flex-row md:items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                B站视频数据
              </h1>
              <div className='text-gray-600 dark:text-gray-300 space-y-1'>
                <p>
                  UP主:{' '}
                  <span className='font-semibold'>{data?.user?.name}</span>
                </p>
                <p>
                  视频总数: <span className='font-semibold'>{data?.total}</span>{' '}
                  个
                </p>
                <p>
                  最后更新:{' '}
                  <span className='font-semibold'>
                    {data?.last_updated
                      ? new Date(data.last_updated).toLocaleString('zh-CN')
                      : '未知'}
                  </span>
                </p>
              </div>
            </div>
            <div className='mt-4 md:mt-0'>
              <button
                onClick={() => (window.location.href = '/admin')}
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
              >
                更新数据
              </button>
            </div>
          </div>
        </div>

        {/* 搜索和排序 */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <input
                type='text'
                placeholder='搜索视频标题...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'views')}
                className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='date'>按发布时间排序</option>
                <option value='views'>按播放量排序</option>
              </select>
            </div>
          </div>
        </div>

        {/* 视频列表 */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
              视频列表 ({filteredAndSortedVideos.length} 个)
            </h2>
          </div>

          <div className='divide-y divide-gray-200 dark:divide-gray-700'>
            {filteredAndSortedVideos.map((video, index) => (
              <div
                key={video.bvid}
                className='p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center mb-2'>
                      <span className='text-sm text-gray-500 dark:text-gray-400 mr-3'>
                        #{index + 1}
                      </span>
                      <a
                        href={`https://www.bilibili.com/video/${video.bvid}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm'
                      >
                        {video.bvid}
                      </a>
                    </div>
                    <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2'>
                      {video.title}
                    </h3>
                    <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                          />
                        </svg>
                        {video.play_count.toLocaleString()} 次播放
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        {video.duration}
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        {new Date(video.created_date).toLocaleDateString(
                          'zh-CN'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredAndSortedVideos.length === 0 && searchTerm && (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>🔍</div>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white mb-2'>
              没有找到匹配的视频
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              请尝试使用不同的搜索关键词
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
