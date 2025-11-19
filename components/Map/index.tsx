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

import { MapChart } from 'echarts/charts';
import type { MapSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useMemo } from 'react';
import usaJson from '@/public/data/world.geo.json';
import country from '@/public/data/country.json';

// 定义国家数据类型
type CountryItem = {
  countryName: string[];
};

echarts.use([
  TitleComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | VisualMapComponentOption
  | GeoComponentOption
  | MapSeriesOption
>;

const MAP_NAME = 'electronic-atlas';

export default function MapComponent({
  onClickArea,
}: {
  onClickArea: (name: string) => void;
}) {
  const countryList = useMemo(() => {
    const countrySet = new Set<string>(
      (country as CountryItem[]).flatMap((item) => item.countryName)
    );

    return Array.from(countrySet).map((item) => ({
      name: item,
      value: 1,
    }));
  }, []);

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
      series: [
        {
          name: '国家',
          type: 'map',
          geoIndex: 0,
          selectedMode: false,
          map: MAP_NAME,
          data: countryList,
        },
      ],
    };

    mapChart.on('click', (params) => {
      onClickArea(params.name);
    });

    mapChart.setOption(option);

    // 清理函数
    return () => {
      mapChart.dispose();
    };
  }, [countryList, onClickArea]);

  return <div id='map' className='w-full h-full'></div>;
}
