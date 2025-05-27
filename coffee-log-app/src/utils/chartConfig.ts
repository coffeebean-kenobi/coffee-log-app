import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Chart.js コンポーネントの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

// テーマに対応したカラーパレット
export const chartColors = {
  primary: '#D4AF37',
  secondary: '#C0C0C0',
  accent: '#B8860B',
  background: 'rgba(212, 175, 55, 0.1)',
  border: 'rgba(212, 175, 55, 0.5)',
  text: '#1F2937',
  grid: 'rgba(128, 128, 128, 0.2)'
}

export const darkChartColors = {
  primary: '#D4AF37',
  secondary: '#C0C0C0',
  accent: '#F4E4BC',
  background: 'rgba(212, 175, 55, 0.2)',
  border: 'rgba(212, 175, 55, 0.6)',
  text: '#F9FAFB',
  grid: 'rgba(156, 163, 175, 0.3)'
}

// カラーパレット配列（複数データ用）
export const multiColorPalette = [
  '#D4AF37', // Gold
  '#C0C0C0', // Silver
  '#CD7F32', // Bronze
  '#B8860B', // Dark Goldenrod
  '#DAA520', // Goldenrod
  '#FFD700', // Gold
  '#F0E68C', // Khaki
  '#BDB76B', // Dark Khaki
  '#808000', // Olive
  '#9ACD32'  // Yellow Green
]

export const getChartOptions = (isDark: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: isDark ? darkChartColors.text : chartColors.text,
        font: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: isDark ? '#374151' : '#FFFFFF',
      titleColor: isDark ? darkChartColors.text : chartColors.text,
      bodyColor: isDark ? darkChartColors.text : chartColors.text,
      borderColor: isDark ? darkChartColors.border : chartColors.border,
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: {
        color: isDark ? darkChartColors.text : chartColors.text
      },
      grid: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      }
    },
    y: {
      ticks: {
        color: isDark ? darkChartColors.text : chartColors.text
      },
      grid: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      }
    }
  }
})

export const getRadarOptions = (isDark: boolean) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: isDark ? darkChartColors.text : chartColors.text,
        font: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: isDark ? '#374151' : '#FFFFFF',
      titleColor: isDark ? darkChartColors.text : chartColors.text,
      bodyColor: isDark ? darkChartColors.text : chartColors.text,
      borderColor: isDark ? darkChartColors.border : chartColors.border,
      borderWidth: 1
    }
  },
  scales: {
    r: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        color: isDark ? darkChartColors.text : chartColors.text
      },
      grid: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      },
      angleLines: {
        color: isDark ? darkChartColors.grid : chartColors.grid
      },
      pointLabels: {
        color: isDark ? darkChartColors.text : chartColors.text,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12
        }
      }
    }
  }
}) 