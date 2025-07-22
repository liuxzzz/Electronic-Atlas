#!/usr/bin/env python3
"""
B站UP主视频数据获取脚本
使用 bilibili-api 库获取指定UP主的所有视频信息

安装依赖:
pip install bilibili-api-python aiohttp

使用方法:
python get-bilibili-data.py
"""

import asyncio
import json
import os
from datetime import datetime
from bilibili_api import user
import aiohttp

# 配置
TARGET_UID = 1140672573  # 目标UP主的UID
OUTPUT_DIR = "../public/data"  # 输出目录
DELAY_BETWEEN_REQUESTS = 1  # 请求间隔(秒)

async def get_user_info(uid):
    """获取用户基本信息"""
    try:
        u = user.User(uid=uid)
        user_info = await u.get_user_info()
        return {
            'uid': uid,
            'name': user_info.get('name', ''),
            'sign': user_info.get('sign', ''),
            'level': user_info.get('level', 0),
            'face': user_info.get('face', ''),
            'fans': user_info.get('fans', 0),
            'following': user_info.get('following', 0),
            'video_count': user_info.get('video', 0)
        }
    except Exception as e:
        print(f"获取用户信息失败: {e}")
        return None

async def get_all_videos(uid):
    """获取用户所有视频"""
    try:
        u = user.User(uid=uid)
        videos = []
        page = 1
        
        print(f"开始获取 UID {uid} 的视频列表...")
        
        while True:
            try:
                # 获取当前页视频
                result = await u.get_videos(page=page)
                video_list = result.get('list', {}).get('vlist', [])
                
                if not video_list:
                    print(f"第 {page} 页无更多视频，获取完成")
                    break
                
                # 处理当前页的视频数据
                for video in video_list:
                    video_data = {
                        'bvid': video.get('bvid', ''),
                        'aid': video.get('aid', 0),
                        'title': video.get('title', ''),
                        'description': video.get('description', ''),
                        'duration': video.get('length', ''),
                        'play_count': video.get('play', 0),
                        'comment_count': video.get('video_review', 0),
                        'favorite_count': video.get('favorites', 0),
                        'coin_count': video.get('coins', 0),
                        'created_timestamp': video.get('created', 0),
                        'created_date': datetime.fromtimestamp(video.get('created', 0)).strftime('%Y-%m-%d %H:%M:%S'),
                        'pic_url': video.get('pic', ''),
                        'type_name': video.get('typename', ''),
                        'author': video.get('author', ''),
                        'mid': video.get('mid', uid)
                    }
                    videos.append(video_data)
                
                print(f"已获取第 {page} 页，共 {len(video_list)} 个视频 (累计: {len(videos)})")
                page += 1
                
                # 添加延迟避免请求过快
                await asyncio.sleep(DELAY_BETWEEN_REQUESTS)
                
            except Exception as e:
                print(f"获取第 {page} 页时出错: {e}")
                break
                
        return videos
        
    except Exception as e:
        print(f"获取视频列表失败: {e}")
        return []

async def save_data(user_info, videos):
    """保存数据到文件"""
    try:
        # 确保输出目录存在
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        
        # 创建完整的数据结构
        data = {
            'metadata': {
                'scraped_at': datetime.now().isoformat(),
                'target_uid': TARGET_UID,
                'total_videos': len(videos),
                'scraper': 'bilibili-api-python'
            },
            'user_info': user_info,
            'videos': videos
        }
        
        # 保存到JSON文件
        output_file = os.path.join(OUTPUT_DIR, f'bilibili_uid_{TARGET_UID}.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"数据已保存到: {output_file}")
        
        # 保存简化版本供前端使用
        simplified_data = {
            'user': user_info,
            'videos': [
                {
                    'bvid': v['bvid'],
                    'title': v['title'],
                    'play_count': v['play_count'],
                    'created_date': v['created_date'],
                    'duration': v['duration']
                }
                for v in videos
            ],
            'total': len(videos),
            'last_updated': datetime.now().isoformat()
        }
        
        simplified_file = os.path.join(OUTPUT_DIR, f'bilibili_simplified_{TARGET_UID}.json')
        with open(simplified_file, 'w', encoding='utf-8') as f:
            json.dump(simplified_data, f, ensure_ascii=False, indent=2)
        
        print(f"简化数据已保存到: {simplified_file}")
        
        return True
        
    except Exception as e:
        print(f"保存数据失败: {e}")
        return False

async def main():
    """主函数"""
    print("=" * 60)
    print("B站UP主视频数据获取工具")
    print(f"目标UID: {TARGET_UID}")
    print("=" * 60)
    
    try:
        # 获取用户信息
        print("1. 获取用户信息...")
        user_info = await get_user_info(TARGET_UID)
        
        if not user_info:
            print("❌ 无法获取用户信息，程序退出")
            return
        
        print(f"✅ UP主: {user_info['name']}")
        print(f"✅ 粉丝数: {user_info['fans']}")
        print(f"✅ 视频数: {user_info['video_count']}")
        
        # 获取所有视频
        print("\n2. 获取视频列表...")
        videos = await get_all_videos(TARGET_UID)
        
        if not videos:
            print("❌ 未获取到任何视频")
            return
        
        print(f"✅ 成功获取 {len(videos)} 个视频")
        
        # 保存数据
        print("\n3. 保存数据...")
        success = await save_data(user_info, videos)
        
        if success:
            print("✅ 数据获取和保存完成！")
            print(f"\n📊 统计信息:")
            print(f"   - UP主: {user_info['name']}")
            print(f"   - 视频总数: {len(videos)}")
            print(f"   - 最新视频: {videos[0]['title'] if videos else 'N/A'}")
            print(f"   - 数据文件: {OUTPUT_DIR}/bilibili_uid_{TARGET_UID}.json")
        else:
            print("❌ 数据保存失败")
        
    except Exception as e:
        print(f"❌ 程序执行出错: {e}")

if __name__ == "__main__":
    # 运行主程序
    asyncio.run(main()) 