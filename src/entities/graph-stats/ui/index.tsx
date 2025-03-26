import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function GraphStats({ data }: { data: any }) {
  const chartData = {
    labels: data.map((item: any) => item.topic), // Метки по названиям topic
    datasets: [
      {
        label: 'Минимальные баллы',
        data: data.map((item: any) => item.tagPoints.reduce((acc: number, tag: any) => acc + tag.minPoints, 0)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Максимальные баллы',
        data: data.map((item: any) => item.tagPoints.reduce((acc: number, tag: any) => acc + tag.maxPoints, 0)),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
      {
        label: 'Средние баллы',
        data: data.map(
          (item: any) =>
            item.tagPoints.reduce((acc: number, tag: any) => acc + tag.averagePoints, 0) / item.tagPoints.length,
        ),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  }

  return <Line data={chartData} />
}
