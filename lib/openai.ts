/**
 * OpenAI API 简单调用工具
 * 发送 JSON 请求，获取 JSON 响应
 */

/**
 * 调用 OpenAI API（强制返回 JSON 格式）
 * 
 * @example
 * ```ts
 * const result = await callOpenAI({
 *   model: 'gpt-3.5-turbo',
 *   messages: [
 *     { role: 'system', content: '请以 JSON 格式返回结果' },
 *     { role: 'user', content: '介绍 Next.js' }
 *   ],
 *   temperature: 0.7
 * });
 * console.log(result);
 * ```
 */
export async function callOpenAI(requestBody: Record<string, any>) {
  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = process.env.OPENAI_API_URL || 'https://api.openai.com/v1';

  if (!apiKey) {
    throw new Error('未配置 OPENAI_API_KEY 环境变量');
  }

  const response = await fetch(`${apiUrl}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      ...requestBody,
      response_format: { 
        type: 'json_schema',
        json_schema: {
          name: 'country_video_info',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              countryName: {
                type: 'array',
                items: { type: 'string' },
                description: '国家名称列表'
              },
              leader: {
                type: 'array',
                items: { type: 'string' },
                description: '领导人列表'
              },
              personName: {
                type: 'string',
                description: '人物名称'
              },
              organizationName: {
                type: 'string',
                description: '组织名称'
              },
              name: {
                type: 'string',
                description: '视频标题'
              },
              bvid: {
                type: 'string',
                description: 'B站视频BV号'
              },
              aid: {
                type: 'integer',
                description: 'B站视频AV号'
              },
              cover: {
                type: 'string',
                description: '封面图片'
              },
              view: {
                type: 'integer',
                description: '播放量'
              },
              duration: {
                type: 'string',
                description: '视频时长'
              },
              pub_date: {
                type: 'string',
                description: '发布日期'
              },
              url: {
                type: 'string',
                description: '视频链接'
              },
              series: {
                type: 'string',
                description: '系列名称'
              },
              episode: {
                type: 'string',
                description: '集数'
              }
            },
            required: [
              'countryName',
              'leader',
              'personName',
              'organizationName',
              'name',
              'bvid',
              'aid',
              'cover',
              'view',
              'duration',
              'pub_date',
              'url',
              'series',
              'episode'
            ],
            additionalProperties: false
          }
        }
      }
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `请求失败: ${response.status}`);
  } 
  console.log(response.json());

  return response.json();
}
