"""
AI 模型 API 调用工具（Python 版本）
使用 HTTP 请求方式，不依赖 SDK
支持 Google Gemini 和 OpenAI
"""

import aiohttp


async def call_ai_model(
    messages,
    model,
    key,
    url,
    config
):


  print(f"messages: {messages}")
  print(f"model: {model}")
  print(f"key: {key}")
  print(f"url: {url}")


  headers = {
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json"
  }

  data = {
    "model": model,
    "messages": messages,
    **config
  }
  async with aiohttp.ClientSession() as session:
    async with session.post(url, headers=headers, json=data) as response:
      return await response.json()



  
    



