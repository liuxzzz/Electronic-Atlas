import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 定义Country类型
export interface Country {
  countryName: string[];
  leader: string[];
  personName: string;
  organizationName: string;
  name: string;
  bvid: string;
  aid: number;
  cover: string;
  view: number;
  duration: string;
  pub_date: string;
  url: string;
  series: string;
  episode: string;
}

// 通过国家名称查找对应的视频数据
export async function findCountryByName(
  countryName: string
): Promise<Country | null> {
  try {
    // 动态导入country.json数据
    const countryData = await import('../public/country.json');
    const countries = countryData.default as Country[];

    // 查找匹配的国家
    const foundCountry = countries.find((country) =>
      country.countryName.some(
        (name) =>
          name.toLowerCase().includes(countryName.toLowerCase()) ||
          countryName.toLowerCase().includes(name.toLowerCase())
      )
    );

    return foundCountry || null;
  } catch (error) {
    console.error('Error loading country data:', error);
    return null;
  }
}

// 格式化播放量数字
export function formatViewCount(views: number): string {
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + '万';
  }
  return views.toString();
}
