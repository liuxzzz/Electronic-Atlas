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
from ai_model_helper import call_ai_model

# 配置
TARGET_UID = 1140672573  # 目标UP主的UID
OUTPUT_DIR = "public/data"  # 输出目录
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
                result = await u.get_videos(pn=page, ps=30)
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


        # ai 转换数据
        print("开始转换数据")



        modal = "deepseek-chat"
        key = os.getenv("DEEPSEEK_API_KEY")
        url = "https://api.deepseek.com/chat/completions"
        config = {
            "temperature": 0.3,
            "response_format": {"type": "json_object"}
        }

        example_input_json= {
            "bvid": "BV1og411d7rg",
            "aid": 511784765,
            "title": "【东盟十国01丨菲律宾】从富甲一方到回天无力，菲律宾做错了什么？",
            "description": "一键三连推荐给更多朋友！\n\n东盟十国系列回顾：\n【东盟十国 01】菲律宾传送门：BV1og411d7rg\n【东盟十国 02】印尼传送门：BV1QF411K7Lt\n【东盟十国 03】泰国传送门：BV12g41167Gi\n【东盟十国 04】马来西亚传送门：BV1xt4y1E7VC\n【东盟十国 05】文莱传送门：BV1de4y1q799\n【东盟十国 06】东帝汶传送门：BV1VG4y1Z7MW\n【东盟十国 07】老挝传送门：BV1a3411o7vU\n【东盟十国 08】柬埔寨传送门：BV1rs4y1Z7XH\n【东",
            "duration": "24:08",
            "play_count": 2751338,
            "comment_count": 10079,
            "favorite_count": 0,
            "coin_count": 0,
            "created_timestamp": 1653134874,
            "created_date": "2022-05-21 20:07:54",
            "pic_url": "http://i1.hdslb.com/bfs/archive/82da927fdd9349a2f91169ed8c1dd2ec6fcece6e.jpg",
            "type_name": "",
            "author": "小王Albert",
            "mid": "1140672573"
        }

        example_output_json={
            "countryName": ["菲律宾"],
            "leader": ["#"],
            "personName": "#",
            "organizationName": "#",
            "name": "【东盟十国01丨菲律宾】从富甲一方到回天无力，菲律宾做错了什么？",
            "bvid": "BV1og411d7rg",
            "aid": 511784765,
            "cover": "82da927fdd9349a2f91169ed8c1dd2ec6fcece6e.jpg",
            "view": 2751338,
            "duration": "24分08秒",
            "pub_date": "2022-05-21",
            "url": "https://www.bilibili.com/video/BV1og411d7rg",
            "series": "东盟十国",
            "episode": "01"
        }

        system_prompt= f"""

        将输入的json数据按照输出的json格式要求进行转换，并返回转换后的json数据。 

        注意：
        重要的转换数据就是将title中的国家信息提取出来，并且将title中的国家信息转换为countryName的格式。
        series字段是系列信息，也需要从title中提取出来。

        EXAMPLE INPUT JSON: \n{example_input_json}

        EXAMPLE JSON OUTPUT: \n{example_output_json}
        
        """

        user_prompt= f"这里是输入给你的json数据:\n{videos} "

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]

        country_data = await call_ai_model(messages, modal, key, url, config)
        
        # country_data 是字典，需要用 ['choices'] 访问
        print(f"完整响应: {country_data}")
        
        # 提取实际的内容
        if 'choices' in country_data:
            content = country_data['choices'][0]['message']['content']
            print(f"AI 返回的 JSON: {content}")
            
            # 解析 JSON 字符串
            result = json.loads(content)
            # 将结果存入country.json
            with open(os.path.join(OUTPUT_DIR, 'country.json'), 'w', encoding='utf-8') as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
            print(f"解析后的数据: {result}")
        
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