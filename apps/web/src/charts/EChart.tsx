import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export type EChartProps = {
  option: echarts.EChartsOption
  style?: React.CSSProperties
}

export default function EChart({ option, style }: EChartProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const chart = echarts.init(ref.current)
    chart.setOption(option)

    const onResize = () => chart.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      chart.dispose()
    }
  }, [option])

  return <div ref={ref} style={{ width: '100%', height: 360, ...style }} />
}
