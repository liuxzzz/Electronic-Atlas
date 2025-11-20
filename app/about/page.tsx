import Link from 'next/link';

export default function About() {
  return (
    <div className='min-h-screen bg-background'>
      {/* 页面标题区域 */}
      <section className='pt-32 pb-20 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center animate-fade-in'>
            <h1 className='text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-8 leading-tight'>
              <span className='gradient-text'>关于本站</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 关于王骁 */}
      <section className='py-12 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm animate-slide-up'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8'>
                <svg
                  className='w-10 h-10 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                  />
                </svg>
              </div>
              <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8'>
                关于王骁
              </h2>
              <div className='text-lg text-muted-foreground space-y-6 leading-relaxed'>
                <p>
                  王骁老师通过电子地图册的形式，完整点亮了世界各个板块，
                  用地理的视角带领大家认识这个多元化的世界。
                </p>
                <p>
                  他希望我们能够一起学习，超越情绪的束缚，
                  找到看世界的独特角度，用一种更加理性乐观的态度去拥抱一个多极化的世界。
                </p>
                <div className='bg-muted/50 rounded-xl p-6 mt-8'>
                  <p className='text-muted-foreground italic'>
                    &ldquo;欢迎新朋友点击关注，老朋友长按点赞，让更多朋友看到内容。
                    如果你有多一点点了解这个世界，来波变得更强记录下这一刻，祝大家变得更强！&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于开发者 */}
      <section className='py-24 px-6 bg-muted/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm animate-slide-up'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8'>
                <svg
                  className='w-10 h-10 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                  />
                </svg>
              </div>
              <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8'>
                关于开发者
              </h2>
              <div className='text-lg text-muted-foreground space-y-6 leading-relaxed'>
                <div className='bg-primary/5 rounded-xl p-6 mb-6'>
                  <p className='text-primary font-medium text-xl'>
                    &ldquo;变得更强&rdquo; —— 这是我做这个网站的初衷。
                  </p>
                </div>
                <p>
                  作为一名开发者，我深深被王骁老师传递的理念所感动。
                  在这个信息爆炸的时代，我们需要的不仅仅是更多的信息，
                  而是更好的视角和更深的理解。
                </p>
                <p>
                  这个 Electronic Atlas 项目，就是希望通过技术的力量，
                  将王骁老师的地理知识和理性思维传递给更多的人。
                  让我们都能够在了解世界的过程中，变得更强。
                </p>
                <p>
                  每一行代码，每一个功能，都承载着这样的期望：
                  希望每一位访问者都能在这里收获知识，开拓视野，
                  用更加理性和乐观的态度面对这个复杂而美好的世界。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 技术栈 */}
      <section className='py-24 px-6 bg-muted/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16 animate-fade-in'>
            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4'>
              技术栈
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              采用现代化的技术栈，确保网站的性能、可维护性和用户体验
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='text-center bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up'>
              <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4'>
                <span className='text-lg font-bold text-primary'>React</span>
              </div>
              <h3 className='font-semibold text-foreground text-sm'>
                React 18
              </h3>
            </div>

            <div className='text-center bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up'>
              <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4'>
                <span className='text-sm font-bold text-primary'>Next.js</span>
              </div>
              <h3 className='font-semibold text-foreground text-sm'>
                Next.js 14
              </h3>
            </div>

            <div className='text-center bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up'>
              <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4'>
                <span className='text-lg font-bold text-primary'>TS</span>
              </div>
              <h3 className='font-semibold text-foreground text-sm'>
                TypeScript
              </h3>
            </div>

            <div className='text-center bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up'>
              <div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4'>
                <span className='text-sm font-bold text-primary'>Tailwind</span>
              </div>
              <h3 className='font-semibold text-foreground text-sm'>
                Tailwind CSS
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className='py-24 px-6'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm text-center animate-fade-in'>
            <div className='w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8'>
              <svg
                className='w-10 h-10 text-primary'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6'>
              联系我
            </h2>
            <p className='text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed'>
              有任何问题、建议或BUG反馈，欢迎随时与我联系。期待听到您的声音！
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <a
                href='mailto:liuhz110805@gmail.com'
                className='bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:shadow-md'
              >
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
                    d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                发送邮件
              </a>
         
            </div>

            <div className='text-muted-foreground text-sm py-2' >or</div>

            <a
              href='https://github.com/liuxzzz/Electronic-Atlas/issues/new'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:shadow-md'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
