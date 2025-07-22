import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // 获取请求参数
    const body = await request.json();
    const { uid } = body;

    // 验证参数
    if (uid && typeof uid !== 'number') {
      return NextResponse.json({ error: '无效的UID参数' }, { status: 400 });
    }

    console.log('开始执行B站数据获取脚本...');

    // 执行Python脚本
    const scriptPath = path.join(
      process.cwd(),
      'scripts',
      'get-bilibili-data.py'
    );
    const command = `python3 "${scriptPath}"`;

    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout: 300000, // 5分钟超时
    });

    console.log('Python脚本输出:', stdout);

    if (stderr) {
      console.warn('Python脚本警告:', stderr);
    }

    // 检查生成的数据文件
    const dataPath = path.join(
      process.cwd(),
      'public',
      'data',
      'bilibili_simplified_1140672573.json'
    );

    try {
      await fs.access(dataPath);
      const data = await fs.readFile(dataPath, 'utf-8');
      const jsonData = JSON.parse(data);

      return NextResponse.json({
        success: true,
        message: '数据获取成功',
        data: {
          user: jsonData.user?.name || '未知',
          videoCount: jsonData.total || 0,
          lastUpdated: jsonData.last_updated,
        },
        logs: stdout,
      });
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: '数据文件生成失败',
          logs: stdout,
          stderr: stderr,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('执行Python脚本失败:', error);

    return NextResponse.json(
      {
        success: false,
        error: '执行失败',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 获取数据状态
    const dataPath = path.join(
      process.cwd(),
      'public',
      'data',
      'bilibili_simplified_1140672573.json'
    );

    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      const jsonData = JSON.parse(data);

      return NextResponse.json({
        hasData: true,
        user: jsonData.user?.name || '未知',
        videoCount: jsonData.total || 0,
        lastUpdated: jsonData.last_updated,
      });
    } catch {
      return NextResponse.json({
        hasData: false,
        message: '暂无数据，请先获取数据',
      });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: '检查数据状态失败',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
