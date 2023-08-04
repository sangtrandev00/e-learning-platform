import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import './Chart.scss';
import { useGetCourseSalesQuery, useGetNewSignupsQuery, useGetRevenueQuery } from '../../report.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Chart() {
  const chartName = useSelector((state: RootState) => state.report.chartName);
  const previousDaysSelected = useSelector((state: RootState) => state.report.previousDaysSelected);

  const { data: courseSalesData, isFetching: isCourseSalesFetching } = useGetCourseSalesQuery(previousDaysSelected);

  const { data: revenuesData, isFetching: isRevenuesFetching } = useGetRevenueQuery(previousDaysSelected);

  const { data: newSignupsData, isFetching: isNewSignupsFetching } = useGetNewSignupsQuery(previousDaysSelected);

  console.log(courseSalesData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200 // Adjust this value to control the interval between steps on the y-axis
        }
      }
    }
  };

  // const labels = courseSalesData?.labels;

  let labels: string[] = [];
  let labelChartName = '';
  let chartData: number[] = [];
  switch (chartName) {
    case 'revenues':
      labels = revenuesData?.labels || [];
      chartData = revenuesData?.data || [];
      labelChartName = 'revenue';
      break;
    case 'course-sales':
      labels = courseSalesData?.labels || [];
      chartData = courseSalesData?.data || [];
      labelChartName = 'course sales';
      break;
    case 'new-signups':
      labels = newSignupsData?.labels || [];
      chartData = newSignupsData?.data || [];
      labelChartName = 'user';
      break;

    default:
      break;
  }

  const data = {
    labels,
    datasets: [
      {
        label: labelChartName,
        // data: labels.map(() => faker.number.int({ min: 0, max: 800 })),
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)'
      // }
    ]
  };

  return <Line className='chart' options={options} data={data} />;
}
