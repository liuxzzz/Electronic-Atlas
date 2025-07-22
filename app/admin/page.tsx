'use client';

import React, { useState, useEffect } from 'react';

interface DataStatus {
  hasData: boolean;
  user?: string;
  videoCount?: number;
  lastUpdated?: string;
}

interface FetchResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    user: string;
    videoCount: number;
    lastUpdated: string;
  };
  logs?: string;
}

export default function AdminPage() {
  const [dataStatus, setDataStatus] = useState<DataStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string>('');
  const [fetchResult, setFetchResult] = useState<FetchResult | null>(null);

  // 检查数据状态
  const checkDataStatus = async () => {
    try {
      const response = await fetch('/api/fetch-bilibili');
      const data = await response.json();
      setDataStatus(data);
    } catch (error) {
      console.error('检查数据状态失败:', error);
    }
  };

  // 获取B站数据
  const fetchBilibiliData = async () => {
    setLoading(true);
    setLogs('正在启动Python脚本...\n');
    setFetchResult(null);

    try {
      const response = await fetch('/api/fetch-bilibili', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: 1140672573 }),
      });

      const result: FetchResult = await response.json();
      setFetchResult(result);

      if (result.logs) {
        setLogs(result.logs);
      }

      if (result.success) {
        // 重新检查数据状态
        await checkDataStatus();
      }
    } catch (error: unknown) {
      setFetchResult({
        success: false,
        error: '网络请求失败',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  // 页面加载时检查数据状态
  useEffect(() => {
    checkDataStatus();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto p-6'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
            数据管理中心
          </h1>

          {/* 当前数据状态 */}
          <div className='mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
              当前数据状态
            </h2>

            {dataStatus ? (
              dataStatus.hasData ? (
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 dark:text-gray-300'>
                      UP主:
                    </span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {dataStatus.user}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 dark:text-gray-300'>
                      视频数量:
                    </span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {dataStatus.videoCount} 个
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600 dark:text-gray-300'>
                      最后更新:
                    </span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {dataStatus.lastUpdated
                        ? new Date(dataStatus.lastUpdated).toLocaleString(
                            'zh-CN'
                          )
                        : '未知'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className='text-yellow-600 dark:text-yellow-400'>
                  ⚠️ 暂无数据，请获取数据
                </div>
              )
            ) : (
              <div className='text-gray-500 dark:text-gray-400'>
                正在检查数据状态...
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className='mb-8'>
            <button
              onClick={fetchBilibiliData}
              disabled={loading}
              className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center'
            >
              {loading ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  正在获取数据...
                </>
              ) : (
                <>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>
                  获取B站数据
                </>
              )}
            </button>
          </div>

          {/* 结果显示 */}
          {fetchResult && (
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                执行结果
              </h3>

              <div
                className={`p-4 rounded-lg ${
                  fetchResult.success
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}
              >
                <div
                  className={`font-medium ${
                    fetchResult.success
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}
                >
                  {fetchResult.success ? '✅ 成功' : '❌ 失败'}
                </div>

                {fetchResult.message && (
                  <div className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
                    {fetchResult.message}
                  </div>
                )}

                {fetchResult.error && (
                  <div className='mt-2 text-sm text-red-600 dark:text-red-400'>
                    错误: {fetchResult.error}
                  </div>
                )}

                {fetchResult.data && (
                  <div className='mt-3 space-y-1 text-sm'>
                    <div>UP主: {fetchResult.data.user}</div>
                    <div>获取视频: {fetchResult.data.videoCount} 个</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 日志显示 */}
          {logs && (
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                执行日志
              </h3>
              <pre className='bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto'>
                {logs}
              </pre>
            </div>
          )}

          {/* 使用说明 */}
          <div className='mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              使用说明
            </h3>
            <div className='text-sm text-gray-700 dark:text-gray-300 space-y-2'>
              <p>
                • <strong>获取B站数据:</strong>{' '}
                点击按钮执行Python脚本，获取UP主(UID: 1140672573)的所有视频数据
              </p>
              <p>
                • <strong>数据存储:</strong> 获取的数据保存在{' '}
                <code className='bg-gray-200 dark:bg-gray-700 px-1 rounded'>
                  public/data/
                </code>{' '}
                目录下
              </p>
              <p>
                • <strong>前端使用:</strong>{' '}
                数据可通过API或直接读取JSON文件在地图应用中使用
              </p>
              <p>
                • <strong>更新频率:</strong> 建议每天或每周更新一次数据
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
