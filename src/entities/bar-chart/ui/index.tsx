'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface BarChartProps {
  solutionData: {
    name: string
    topics: {
      name: string
      questions: {
        text: string
        tags: string[]
        answers: { text: string; points?: { name: string; points: string }[] }[]
      }[]
    }[]
  }
}

export default function BarChart({ solutionData }: BarChartProps) {
  const tagsMap: Record<string, number[]> = {}
  let maxPoints = 0

  solutionData.topics.forEach((topic) => {
    topic.questions.forEach((question) => {
      question.tags.forEach((tag) => {
        question.answers.forEach((answer) => {
          answer.points?.forEach((point) => {
            if (point.name === tag) {
              const value = parseInt(point.points)
              if (!tagsMap[tag]) {
                tagsMap[tag] = []
              }
              tagsMap[tag].push(value)
              if (value > maxPoints) {
                maxPoints = value
              }
            }
          })
        })
      })
    })
  })

  const labels = Object.keys(tagsMap)
  const data = labels.map((tag) => {
    const points = tagsMap[tag]
    return points.length > 0 ? points.reduce((sum, val) => sum + val, 0) / points.length : 0
  })

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Оценки по тегам',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Теги',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Среднее значение',
        },
        min: 0,
        max: maxPoints + 1,
      },
    },
  }

  return (
    <div className="w-full h-96">
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}
