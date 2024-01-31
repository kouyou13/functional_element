"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

// 日付アダプタを登録
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

type ChartProps = {
  x_datas : string[]
  y_datas : number[]
}

const Chart = ({x_datas, y_datas} : ChartProps) => {
  const options: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
          displayFormats: {
            day: 'yyyy-MM-dd'
          } as const,
        } as const,
        title: {
          display: true,
          text: '日付',
        },
      },
      y: {
        title: {
          display: true,
          text: '体温[℃]',
        },
      },
    },
  };

  const labels: string[] = x_datas;

  const border_data = new Array<number>(y_datas.length).fill(37.5);

  const data = {
    labels,
    datasets: [
      {
        data: y_datas,
        borderColor: "rgb(99, 146, 255)",
        backgroundColor: "rgba(99, 146, 255, 0.5)",
        borderWidth: 4,
      },
      {
        data: border_data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 0,
        borderWidth: 1,
      }
    ],
  };

  return (
    <div className="tetes">
      <Line className="LineChart" options={options} data={data} />
    </div>
  );
};

export default Chart;