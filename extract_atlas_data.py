#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
from datetime import datetime

def extract_atlas_videos():
    # 读取原始数据
    with open('public/data/bilibili_uid_1140672573.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 电子地图册系列的正则表达式
    # 匹配格式：【系列名+编号+丨+国家/地区名】
    atlas_pattern = r'【([^【】]+?)(\d+)[丨｜]([^【】]+?)】'
    
    atlas_videos = []
    
    for video in data['videos']:
        title = video['title']
        
        # 检查是否匹配电子地图册格式
        match = re.search(atlas_pattern, title)
        if match:
            series_name = match.group(1).strip()
            episode_number = match.group(2)
            country_region = match.group(3).strip()
            
            # 过滤出符合地理系列的内容
            valid_series = [
                '东盟十国', '中东', '中亚五国', '西非', '马格里布', 
                '南亚', '中非', '东非', '南美', '北欧', '东欧', 
                '西欧', '大洋洲', '加勒比海', '中美洲'
            ]
            
            if any(series in series_name for series in valid_series):
                # 转换时间戳为日期
                pub_date = datetime.fromtimestamp(video['created_timestamp']).strftime('%Y-%m-%d')
                
                # 转换时长格式
                duration_seconds = video.get('duration', '0:00')
                if ':' in duration_seconds:
                    parts = duration_seconds.split(':')
                    if len(parts) == 2:
                        minutes, seconds = parts
                        duration_formatted = f"{minutes}分{seconds}秒"
                    elif len(parts) == 3:
                        hours, minutes, seconds = parts
                        duration_formatted = f"{hours}小时{minutes}分{seconds}秒"
                    else:
                        duration_formatted = duration_seconds
                else:
                    duration_formatted = duration_seconds
                
                # 构建符合country.json格式的数据
                atlas_entry = {
                    "countryName": [country_region],
                    "leader": ["#"],  # 占位符，可根据具体内容填写
                    "personName": "#",  # 占位符，可根据具体内容填写
                    "organizationName": "#",  # 占位符，可根据具体内容填写
                    "name": title,
                    "bvid": video['bvid'],
                    "aid": video['aid'],
                    "cover": video['pic_url'].split('/')[-1] if video['pic_url'] else "#",
                    "view": video['play_count'],
                    "duration": duration_formatted,
                    "pub_date": pub_date,
                    "url": f"https://www.bilibili.com/video/{video['bvid']}",
                    "series": series_name,
                    "episode": episode_number,
                    "description": video.get('description', '')
                }
                
                atlas_videos.append(atlas_entry)
    
    # 按系列和集数排序
    atlas_videos.sort(key=lambda x: (x['series'], int(x['episode'])))
    
    return atlas_videos

def save_atlas_data(atlas_videos):
    # 保存为JSON文件
    with open('public/data/electronic_atlas_data.json', 'w', encoding='utf-8') as f:
        json.dump(atlas_videos, f, ensure_ascii=False, indent=2)
    
    print(f"成功提取了 {len(atlas_videos)} 个电子地图册视频")
    print("\n系列统计:")
    
    # 统计各系列数量
    series_count = {}
    for video in atlas_videos:
        series = video['series']
        series_count[series] = series_count.get(series, 0) + 1
    
    for series, count in sorted(series_count.items()):
        print(f"  {series}: {count} 期")
    
    print(f"\n数据已保存到: public/data/electronic_atlas_data.json")

if __name__ == "__main__":
    atlas_videos = extract_atlas_videos()
    save_atlas_data(atlas_videos) 