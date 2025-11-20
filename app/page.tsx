'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import ThreeBackground from '@/components/ThreeBackground';

const heroStats = [
  // { label: '覆盖国家/地区', value: '230+' },
  { label: '实时更新', value: '24H' },
];

// 视频合集数据
const collections = [
  // {
  //   id: 'world-geography',
  //   title: '世界地理系列',
  //   description: '探索世界各国的地理特征、历史文化与经济发展',
  //   videoCount: 45,
  //   coverImage: '/image/preview-map.png',
  //   color: 'from-blue-500 to-cyan-500',
  // },
  // {
  //   id: 'asia-pacific',
  //   title: '亚太地区专题',
  //   description: '深入了解亚太地区各国的政治、经济与社会发展',
  //   videoCount: 28,
  //   coverImage: '/image/preview-map.png',
  //   color: 'from-purple-500 to-pink-500',
  // },
  // {
  //   id: 'europe-series',
  //   title: '欧洲国家解析',
  //   description: '欧洲各国的历史变迁、文化传统与现代发展',
  //   videoCount: 32,
  //   coverImage: '/image/preview-map.png',
  //   color: 'from-green-500 to-emerald-500',
  // },
];




export default function Home() {


  const statElements = useMemo(
    () =>
      heroStats.map((stat) => (
        <div key={stat.label}>
          <p className='text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400'>
            {stat.label}
          </p>
          <p className='mt-1 text-3xl font-semibold text-slate-900 dark:text-white'>
            {stat.value}
          </p>
        </div>
      )),
    []
  );

  return (
    <div className='relative min-h-screen overflow-hidden bg-[#f5f5f7] text-slate-900 dark:bg-slate-950 dark:text-slate-50'>
      {/* Three.js 动画背景 */}
      <ThreeBackground />
      
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(10,132,255,0.18),_transparent_55%)] opacity-80'></div>
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/40 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950/60'></div>
      <div className='pointer-events-none absolute inset-y-0 left-[-20%] w-[45%] bg-gradient-to-r from-[#0a84ff]/15 to-transparent blur-[160px]'></div>

      <div className='relative z-10 flex min-h-screen flex-col'>


        <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-16 pt-20'>
          <section className='grid gap-10 lg:grid-cols-[420px,1fr] xl:grid-cols-[460px,1fr]'>
            <div className='space-y-16'>
              <div>
                <h1 className='mt-4 text-4xl font-semibold text-center leading-tight text-slate-900 dark:text-white sm:text-5xl'>
                  探索电子地图册
                </h1>
                <p className='mt-4 text-base text-slate-600 dark:text-slate-300 text-center'>
                  希望我们可以通过骁哥的视频一起学习，超越情绪，找到看世界的角度。
                </p>
              </div>

            <div className='flex justify-center w-full'>
              <Link href="/map" className='block w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl'>
                <div className='relative w-full aspect-[4/3] p-[3px] bg-gradient-to-br from-blue-400 via-cyan-400 to-purple-500 dark:from-blue-500 dark:via-cyan-500 dark:to-purple-600 rounded-xl shadow-[0_8px_32px_rgba(10,132,255,0.4),0_0_60px_rgba(6,182,212,0.3),0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(59,130,246,0.6),0_0_80px_rgba(6,182,212,0.4),0_4px_16px_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(10,132,255,0.5),0_0_80px_rgba(6,182,212,0.4),0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_48px_rgba(59,130,246,0.7),0_0_100px_rgba(6,182,212,0.5),0_6px_20px_rgba(0,0,0,0.4)]'>
                  <div className='relative w-full h-full rounded-[10px] overflow-hidden bg-white dark:bg-slate-900'>
                    <Image 
                      src="/image/preview-map.png" 
                      alt="电子地图预览" 
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>
              </Link>
            </div>

              <div className='flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400 justify-center'>
                {statElements}
              </div>
            </div>
          </section>

          {/* 内容来源声明区域 */}
          <div className='mt-16 mb-8'>
            <div className='relative rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-8 shadow-lg'>
              {/* 装饰性渐变背景 */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 rounded-2xl'></div>
              
              {/* 内容 */}
              <div className='relative z-10'>
                <div className='flex items-center justify-center mb-4'>
                  <div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <h3 className='text-base font-medium'>内容来源</h3>
                  </div>
                </div>
                
                <p className='text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed'>
                  本站内容来源于B站UP主
                  <a 
                    href='https://space.bilibili.com/1140672573' 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='mx-1 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 underline decoration-blue-400/30 underline-offset-2 hover:decoration-blue-600/50'
                  >
                    小王Albert
                  </a>
                  的视频内容，由AI技术辅助整理和建设。
                </p>
                
                <div className='mt-4 pt-4 border-t border-slate-200 dark:border-slate-700'>
                  <p className='text-xs text-slate-500 dark:text-slate-500 text-center'>
                    想了解更多项目信息？请访问
                    <a 
                      href='/about' 
                      className='ml-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 font-medium'
                    >
                      关于我们
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
 
          {/* 视频合集展示区域 */}
          {/* <section className='mt-20'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-semibold text-slate-900 dark:text-white mb-3'>
                视频合集
              </h2>
              <p className='text-base text-slate-600 dark:text-slate-400'>
                //TODO
              </p>
            </div>

           
          </section> */}
          
        </main>
      </div>
    </div>
  );
}
