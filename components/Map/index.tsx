'use client';

import * as echarts from 'echarts/core';

import {
  TitleComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components';

import type {
  TitleComponentOption,
  VisualMapComponentOption,
  GeoComponentOption,
} from 'echarts/components';

import { MapChart, ScatterChart, LinesChart } from 'echarts/charts';
import type {
  MapSeriesOption,
  ScatterSeriesOption,
  LinesSeriesOption,
} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect } from 'react';
import usaJson from '@/public/world.geo.json';
import country from '@/public/country.json';

// 定义国家数据类型
type CountryItem = {
  countryName: string[];
};

echarts.use([
  TitleComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  ScatterChart,
  LinesChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | VisualMapComponentOption
  | GeoComponentOption
  | MapSeriesOption
  | ScatterSeriesOption
  | LinesSeriesOption
>;

const MAP_NAME = 'electronic-atlas';

// 海南省中心坐标 (经度, 纬度)
const HAINAN_CENTER = [110.33, 19.03];

// 计算4000公里半径在地图上对应的经纬度偏移
const RADIUS_KM = 4000;
// 1度纬度 ≈ 111公里，所以4000公里 ≈ 36度
// 在海南纬度(19°N)处，1度经度 ≈ 111 * cos(19°) ≈ 105公里
const LAT_RADIUS = RADIUS_KM / 111; // 纬度方向半径：约36度
const LNG_RADIUS =
  RADIUS_KM / (111 * Math.cos((HAINAN_CENTER[1] * Math.PI) / 180)); // 经度方向半径：约38度

// 生成圆周上的点 - 考虑地球曲率的椭圆形
const generateCirclePoints = (
  centerLng: number,
  centerLat: number,
  lngRadius: number,
  latRadius: number,
  pointCount = 64
) => {
  const points = [];
  for (let i = 0; i <= pointCount; i++) {
    const angle = (2 * Math.PI * i) / pointCount;
    const lng = centerLng + lngRadius * Math.cos(angle);
    const lat = centerLat + latRadius * Math.sin(angle);
    points.push([lng, lat]);
  }
  return points;
};

export default function MapComponent({
  onClickArea,
  showHainanCircle = false,
}: {
  onClickArea: (name: string) => void;
  showHainanCircle?: boolean;
}) {
  const countrySet = new Set<string>(
    (country as CountryItem[]).flatMap((item) => item.countryName)
  );

  const countryList = Array.from(countrySet).map((item) => {
    return { name: item, value: 1 };
  });

  useEffect(() => {
    const chartDom = document.getElementById('map');

    // 添加空值检查
    if (!chartDom) return;

    const mapChart = echarts.init(chartDom, 'dark');

    // 使用 unknown 类型断言，然后转为 any，这样更安全
    echarts.registerMap(
      MAP_NAME,
      usaJson as unknown as Parameters<typeof echarts.registerMap>[1]
    );

    // 生成圆周线条数据
    const circlePoints = generateCirclePoints(
      HAINAN_CENTER[0],
      HAINAN_CENTER[1],
      LNG_RADIUS,
      LAT_RADIUS
    );

    const circleLineData = [];
    for (let i = 0; i < circlePoints.length - 1; i++) {
      circleLineData.push({
        coords: [circlePoints[i], circlePoints[i + 1]],
      });
    }

    const baseSeries: (
      | MapSeriesOption
      | ScatterSeriesOption
      | LinesSeriesOption
    )[] = [
      {
        name: '国家',
        type: 'map',
        geoIndex: 0,
        selectedMode: false,
        map: MAP_NAME,
        data: countryList,
      },
    ];

    // 如果需要显示海南圆圈，添加相关系列
    if (showHainanCircle) {
      // 添加圆心点
      baseSeries.push({
        name: '海南中心',
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#ff6b6b',
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          scale: false,
        },
        data: [
          {
            name: '海南省',
            value: [...HAINAN_CENTER, 1],
          },
        ],
        silent: true,
      });

      // 添加圆周线条
      baseSeries.push({
        name: '4000公里半径',
        type: 'lines',
        coordinateSystem: 'geo',
        geoIndex: 0,
        lineStyle: {
          color: '#ff6b6b',
          width: 2,
          type: 'dashed',
          opacity: 0.8,
        },
        emphasis: {
          lineStyle: {
            width: 2,
          },
        },
        data: circleLineData,
        silent: true,
      });
    }

    const option: EChartsOption = {
      visualMap: [
        {
          type: 'piecewise',
          show: true,
          hoverLink: false,
          itemWidth: 32,
          id: 'color',
          seriesIndex: 0,
          pieces: [{ gte: 1, lte: 1, label: '国家', color: '#ec6d7a' }],
          inverse: true,
          orient: 'vertical',
          left: 64,
          top: 64,
          selectedMode: false,
          textStyle: {
            color: '#FFF',
          },
        },
      ],
      geo: [
        {
          name: '国家',
          type: 'map',
          roam: true,
          zoom: 1.1,
          selectedMode: false,
          map: MAP_NAME,
          label: {
            color: '#FFF',
          },
          itemStyle: {
            areaColor: '#eeb8c3',
            borderWidth: 1,
            borderColor: '#c7a2ab',
            borderType: 'solid',
          },
          emphasis: {
            label: {
              color: '#FFF',
              show: true,
            },
            itemStyle: {
              areaColor: '#1661ab',
              borderWidth: 1,
              borderColor: '#8da4c4',
              shadowColor: 'rgba(0, 0, 0, 0.7)',
              shadowBlur: 10,
            },
          },
        },
      ],
      series: baseSeries,
    };

    mapChart.on('click', (params) => {
      onClickArea(params.name);
    });

    mapChart.setOption(option);

    // 清理函数
    return () => {
      mapChart.dispose();
    };
  }, [onClickArea, showHainanCircle]);

  return <div id='map' className='w-full h-full'></div>;
}
