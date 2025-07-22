// B站数据获取配置
// UP主 UID: 1140672573

// 推荐的API方案：使用 bilibili-api Python库
// GitHub: https://github.com/Nemo2011/bilibili-api

// 安装命令：
// pip install bilibili-api-python
// pip install aiohttp  # 异步HTTP库

// Python示例代码（保存为 scripts/get-bilibili-data.py）:
/*
import asyncio
from bilibili_api import user, Credential

async def get_user_videos(uid):
    """获取指定UP主的所有视频"""
    # 创建用户对象
    u = user.User(uid=uid)
    
    # 获取用户信息
    user_info = await u.get_user_info()
    print(f"UP主: {user_info['name']}")
    
    # 获取视频列表 (支持分页)
    videos = []
    page = 1
    
    while True:
        try:
            video_list = await u.get_videos(page=page)
            if not video_list['list']['vlist']:
                break
                
            for video in video_list['list']['vlist']:
                video_data = {
                    'bvid': video['bvid'],
                    'aid': video['aid'],
                    'title': video['title'],
                    'description': video['description'],
                    'duration': video['length'],
                    'play': video['play'],
                    'video_review': video['video_review'],
                    'favorites': video['favorites'],
                    'created': video['created'],
                    'pic': video['pic']
                }
                videos.append(video_data)
                
            print(f"已获取第 {page} 页，共 {len(video_list['list']['vlist'])} 个视频")
            page += 1
            
        except Exception as e:
            print(f"获取第 {page} 页时出错: {e}")
            break
    
    return videos

# 使用示例
async def main():
    uid = 1140672573  # 你要获取的UP主UID
    videos = await get_user_videos(uid)
    
    print(f"总共获取到 {len(videos)} 个视频")
    
    # 保存到JSON文件
    import json
    with open('bilibili_videos.json', 'w', encoding='utf-8') as f:
        json.dump(videos, f, ensure_ascii=False, indent=2)
    
    print("数据已保存到 bilibili_videos.json")

if __name__ == "__main__":
    asyncio.run(main())
*/

// 可用的API接口（无需登录）:
const BILIBILI_APIS = {
  // 获取用户信息
  userInfo: (uid) => `https://api.bilibili.com/x/space/acc/info?mid=${uid}`,

  // 获取用户视频列表
  userVideos: (uid, page = 1, pagesize = 50) =>
    `https://api.bilibili.com/x/space/wbi/arc/search?mid=${uid}&ps=${pagesize}&pn=${page}`,

  // 获取视频详细信息
  videoInfo: (bvid) =>
    `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`,

  // 获取视频统计信息
  videoStat: (bvid) =>
    `https://api.bilibili.com/x/web-interface/archive/stat?bvid=${bvid}`,
};

// 备用方案的API列表
const ALTERNATIVE_APIS = {
  // 用户空间API (可能需要处理反爬)
  userSpace: (uid) => `https://space.bilibili.com/${uid}`,

  // 用户投稿API
  submissions: (uid, page) =>
    `https://api.bilibili.com/x/space/navnum?mid=${uid}&jsonp=jsonp`,

  // B站搜索API
  search: (keyword) =>
    `https://api.bilibili.com/x/web-interface/search/all/v2?keyword=${encodeURIComponent(keyword)}`,
};

export { BILIBILI_APIS, ALTERNATIVE_APIS };
