'use client';

import Link from 'next/link';
import { useState } from 'react';
import MapComponent from '@/components/Map';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleClickArea = (name: string) => {
    setSelectedCountry(name);
    // 这里可以添加更多交互逻辑，比如显示国家详情等
    console.log('选中国家:', name);
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* 英雄区域 */}
      <section className='pt-24 pb-32 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center max-w-4xl mx-auto'>
            <h1 className='text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-8 leading-tight'>
              <span className='text-primary block'>探索世界电子地图集</span>
            </h1>
            <p className='text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed'>
              基于B站up主王晓的精彩视频内容整合，通过交互式地图展示当前的国家和地区都收录了哪些视频内容。
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link
                href='/map'
                className='bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all duration-200 text-base inline-flex items-center gap-2 shadow-sm hover:shadow-md'
              >
                开始探索
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 7l5 5-5 5M6 12h12'
                  />
                </svg>
              </Link>
              <Link
                href='/about'
                className='text-muted-foreground hover:text-foreground font-medium py-3 px-6 rounded-xl transition-all duration-200 text-base hover:bg-accent'
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 交互式地图区域 */}
      <section className='py-24 px-6 bg-muted/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4'>
              交互式世界地图
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              点击地图上的任意国家，探索当前电子地图册都收集了哪些国家和地区。
            </p>
            {selectedCountry && (
              <div className='mt-4 p-3 bg-primary/10 rounded-lg inline-block'>
                <span className='text-primary font-medium'>
                  当前选中: {selectedCountry}
                </span>
              </div>
            )}
          </div>

          <div className='bg-card rounded-2xl border border-border overflow-hidden shadow-lg'>
            <div className='h-[600px] w-full'>
              <MapComponent onClickArea={handleClickArea} />
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据区域 */}
      <section className='py-24 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4'>
              跟随王晓的足迹
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              基于优质视频内容整合的地理文化知识库
            </p>
          </div>
          <div className='grid md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-primary mb-2'>
                195
              </div>
              <div className='text-muted-foreground font-medium'>
                个国家和地区
              </div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-primary mb-2'>
                7
              </div>
              <div className='text-muted-foreground font-medium'>大洲覆盖</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-primary mb-2'>
                100+
              </div>
              <div className='text-muted-foreground font-medium'>
                精彩视频内容
              </div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-primary mb-2'>
                24/7
              </div>
              <div className='text-muted-foreground font-medium'>随时探索</div>
            </div>
          </div>
        </div>
      </section>

      {/* 行动号召区域 */}
      <section className='py-24 px-6 bg-muted/30'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 leading-tight'>
            跟随小王Albert
            <span className='text-primary block'>开启世界探索之旅</span>
          </h2>
          <p className='text-xl text-muted-foreground mb-10 leading-relaxed'>
            通过交互式地图体验优质地理文化内容，发现世界各地的精彩故事
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              href='/map'
              className='bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-4 px-8 rounded-xl transition-all duration-200 text-lg inline-flex items-center gap-3 shadow-sm hover:shadow-md'
            >
              立即开始探索
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7l5 5-5 5M6 12h12'
                />
              </svg>
            </Link>
            <Link
              href='/data'
              className='text-muted-foreground hover:text-foreground font-medium py-4 px-8 rounded-xl transition-all duration-200 text-lg hover:bg-accent inline-flex items-center gap-2'
            >
              查看数据
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
