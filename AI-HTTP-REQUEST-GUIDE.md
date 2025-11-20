# AI 模型 HTTP 请求调用指南

本项目已将 AI 调用抽象为纯 HTTP 请求方式，**不依赖任何 SDK**，支持 Gemini 和 OpenAI。

## 🎯 为什么使用 HTTP 请求？

### 优势：

1. **无 SDK 依赖** - 不需要安装 `openai` 或 `google-genai` SDK
2. **更轻量** - 只需要 `requests` 库
3. **更灵活** - 完全控制请求格式
4. **跨平台** - 可以轻松移植到其他语言
5. **易于调试** - 可以直接查看和修改 HTTP 请求

### 对比：

| 方式 | 依赖 | 大小 | 灵活性 |
|------|------|------|--------|
| **HTTP 请求** | `requests` | ~200KB | ⭐⭐⭐⭐⭐ |
| OpenAI SDK | `openai` | ~10MB | ⭐⭐⭐ |
| Gemini SDK | `google-genai` | ~20MB | ⭐⭐⭐ |

## 🚀 快速开始

### 第 1 步：安装依赖

```bash
# 只需要安装 requests 和 bilibili-api
pip install requests bilibili-api-python
```

不需要安装：
- ❌ `openai`
- ❌ `google-genai`

### 第 2 步：配置 API Key

```bash
# 使用 Gemini（推荐）
export GEMINI_API_KEY=your-api-key-here

# 或使用 OpenAI
export OPENAI_API_KEY=sk-your-api-key-here
```

### 第 3 步：配置提供商

在 `scripts/get-bilibili-data.py` 中：

```python
# 使用 Gemini（推荐：免费额度更高）
AI_PROVIDER = "gemini"
AI_MODEL = "gemini-2.0-flash-exp"

# 或使用 OpenAI
# AI_PROVIDER = "openai"
# AI_MODEL = "gpt-4o-mini"
```

### 第 4 步：运行脚本

```bash
cd scripts
python get-bilibili-data.py
```

## 📊 API 使用示例

### 基础调用

```python
from ai_model_helper import call_ai_model
import json

# 调用 Gemini
result = call_ai_model(
    messages=[
        {"role": "system", "content": "请以 JSON 格式返回结果"},
        {"role": "user", "content": "介绍 Next.js"}
    ],
    model="gemini-2.0-flash-exp",
    provider="gemini",
    temperature=0.7
)

data = json.loads(result.text)
print(data)
```

### 切换到 OpenAI

```python
# 只需要改变 provider 和 model
result = call_ai_model(
    messages=[...],
    model="gpt-4o-mini",
    provider="openai",  # 改这里
    temperature=0.7
)
```

### 视频分析

```python
result = call_ai_model(
    messages=[
        {
            "role": "system", 
            "content": "你是视频分析助手，请以 JSON 格式返回结果"
        },
        {
            "role": "user", 
            "content": "分析视频：【东盟十国01丨菲律宾】从富甲一方到回天无力"
        }
    ],
    model="gemini-2.0-flash-exp",
    provider="gemini",
    temperature=0.3
)

data = json.loads(result.text)
print(f"国家: {data['countryName']}")
print(f"系列: {data['series']}")
```

## 🔧 HTTP 请求实现细节

### Gemini API 请求

```python
# 端点
url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}'

# 请求体
payload = {
    "contents": [{
        "parts": [{"text": user_content}]
    }],
    "generationConfig": {
        "temperature": temperature,
        "responseMimeType": "application/json",
        "responseSchema": {...}  # JSON Schema
    },
    "systemInstruction": {
        "parts": [{"text": system_instruction}]
    }
}

# 发送请求
response = requests.post(url, headers=headers, json=payload)
```

### OpenAI API 请求

```python
# 端点
url = 'https://api.openai.com/v1/chat/completions'

# 请求体
payload = {
    "model": model,
    "messages": messages,
    "temperature": temperature,
    "response_format": {
        "type": "json_schema",
        "json_schema": {...}  # JSON Schema
    }
}

# 发送请求
headers = {'Authorization': f'Bearer {api_key}'}
response = requests.post(url, headers=headers, json=payload)
```

## 🎨 响应格式统一

两个 API 的响应格式不同，但已统一为相同接口：

```python
# 统一的响应对象
class Response:
    text: str           # JSON 字符串
    raw_response: dict  # 原始响应

# 使用方式
result = call_ai_model(...)
data = json.loads(result.text)  # Gemini 和 OpenAI 都一样
```

### 原始响应对比

**Gemini 原始响应**：
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "{...JSON...}"
      }]
    }
  }]
}
```

**OpenAI 原始响应**：
```json
{
  "choices": [{
    "message": {
      "content": "{...JSON...}"
    }
  }]
}
```

**统一后**：
```python
result.text  # 直接获取 JSON 字符串
```

## 📋 支持的模型

### Gemini（推荐）

| 模型 | 说明 | 免费额度 |
|------|------|---------|
| `gemini-2.0-flash-exp` | 最新实验版 | 1500/天 |
| `gemini-1.5-flash` | 稳定版 | 1500/天 |
| `gemini-1.5-pro` | 高级版 | 50/天 |

### OpenAI

| 模型 | 说明 | 免费额度 |
|------|------|---------|
| `gpt-4o-mini` | 经济版 | 无 |
| `gpt-4o` | 标准版 | 无 |
| `gpt-4` | 高级版 | 无 |

## 💰 成本对比

| 提供商 | 模型 | 输入价格 | 输出价格 |
|--------|------|---------|---------|
| **Gemini** | 2.0 Flash | $0.075/1M | $0.30/1M |
| OpenAI | GPT-4o-mini | $0.15/1M | $0.60/1M |

**Gemini 比 OpenAI 便宜 50%！**

## 🧪 测试

### 运行测试脚本

```bash
cd scripts
python test_ai_model.py
```

### 测试输出示例

```
============================================================
AI 模型 HTTP 请求调用测试
使用纯 HTTP 请求，不依赖 SDK
============================================================

============================================================
测试 Gemini
============================================================

1. 检查环境变量...
✅ API Key 已配置: AIzaSyDfgh...abcd

2. 测试基础 HTTP 请求调用...
✅ HTTP 请求成功
✅ 响应长度: 256 字符
✅ JSON 解析成功

3. 测试视频分析功能...
✅ 视频分析成功

📊 分析结果：
  - 国家: ['菲律宾']
  - 领导人: ['#']
  - 系列: 东盟十国
  - 集数: 01

✅ 所有必需字段都已返回

✅ Gemini 测试通过！
```

## ⚙️ 在 get-bilibili-data.py 中配置

### 方式 1：使用 Gemini（推荐）

```python
# 配置
AI_PROVIDER = "gemini"
AI_MODEL = "gemini-2.0-flash-exp"
AI_ANALYSIS_DELAY = 6  # Gemini 限制：10请求/分钟
```

### 方式 2：使用 OpenAI

```python
# 配置
AI_PROVIDER = "openai"
AI_MODEL = "gpt-4o-mini"
AI_ANALYSIS_DELAY = 2  # OpenAI 限制更宽松
```

### 方式 3：根据环境自动选择

```python
import os

# 自动选择可用的提供商
if os.getenv('GEMINI_API_KEY'):
    AI_PROVIDER = "gemini"
    AI_MODEL = "gemini-2.0-flash-exp"
elif os.getenv('OPENAI_API_KEY'):
    AI_PROVIDER = "openai"
    AI_MODEL = "gpt-4o-mini"
else:
    raise ValueError("请配置 GEMINI_API_KEY 或 OPENAI_API_KEY")
```

## 🔄 从 SDK 迁移

### 迁移步骤

1. **卸载旧的 SDK**（可选）：
```bash
pip uninstall openai google-genai
```

2. **安装 requests**：
```bash
pip install requests
```

3. **代码自动兼容** - 无需修改代码！

### 代码对比

#### 使用 SDK（旧）：

```python
from google import genai

client = genai.Client(api_key=api_key)
response = client.models.generate_content(...)
text = response.text
```

#### 使用 HTTP 请求（新）：

```python
from ai_model_helper import call_ai_model

response = call_ai_model(...)
text = response.text  # 接口完全一样！
```

## ⚠️ 注意事项

### 1. requests 库

确保安装了 `requests`：
```bash
pip install requests
```

### 2. JSON Schema

两个 API 的 JSON Schema 格式略有不同：

**Gemini**:
```python
{
    "type": "object",  # 小写
    "properties": {...}
}
```

**OpenAI**:
```python
{
    "type": "object",  # 小写
    "properties": {...},
    "additionalProperties": False  # OpenAI 特有
}
```

已在代码中自动处理！

### 3. 速率限制

#### Gemini（免费）：
- 10 请求/分钟
- 1500 请求/天

建议：`AI_ANALYSIS_DELAY = 6`（每6秒一个请求）

#### OpenAI：
- 根据套餐不同
- 通常更宽松

建议：`AI_ANALYSIS_DELAY = 2`

### 4. 超时设置

默认超时 60 秒，可以修改：

```python
response = requests.post(..., timeout=120)  # 改为 120 秒
```

## 🐛 故障排查

### 问题 1：requests 模块不存在

```
ModuleNotFoundError: No module named 'requests'
```

**解决方案**：
```bash
pip install requests
```

### 问题 2：API 请求超时

```
requests.exceptions.Timeout
```

**解决方案**：
- 检查网络连接
- 增加超时时间
- 使用代理

### 问题 3：JSON 解析失败

```
JSONDecodeError: Expecting value
```

**解决方案**：
- 检查 API 响应
- 降低 temperature
- 确认 Schema 定义正确

### 问题 4：速率限制

```
429 Resource Exhausted
```

**解决方案**：
- 增加 `AI_ANALYSIS_DELAY`
- 等待配额重置
- 升级 API 套餐

## 📖 API 文档

- [Gemini REST API](https://ai.google.dev/api/rest)
- [OpenAI REST API](https://platform.openai.com/docs/api-reference)
- [requests 文档](https://requests.readthedocs.io/)

## 🎉 总结

使用 HTTP 请求的优势：

✅ **轻量** - 只需要 requests 库  
✅ **灵活** - 完全控制请求  
✅ **通用** - 支持多个提供商  
✅ **简单** - 易于理解和调试  
✅ **移植** - 容易改写为其他语言  

现在你可以使用纯 HTTP 请求调用 AI API，不需要任何 SDK！🚀

