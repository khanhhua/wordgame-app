import React from 'react';
import { Line } from 'react-chartjs-2';

const defaultLineDataSeriesOptions = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(63,69,192,0.4)',
  borderColor: 'rgb(65,121,192)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

const formatDate = (date) => `${date.getMonth() + 1}.${date.getDate()}`;

export default ({ weeklyPerformance }) => {
  const labels = weeklyPerformance.map(({ week }) =>
    formatDate(new Date(week * 7 * 86400 * 1000))
  );
  const confidence = weeklyPerformance.map(({ confidence_factor }) =>
    (confidence_factor * 100).toFixed(2)
  );
  const correct = weeklyPerformance.map(({ correct_factor }) =>
    (correct_factor * 100).toFixed(2)
  );

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Correct',
            data: correct,
            ...defaultLineDataSeriesOptions,
          },
          {
            label: 'Confidence',
            data: confidence,
            ...defaultLineDataSeriesOptions,
            backgroundColor: '#C0122A',
            borderColor: '#f3132c',
          },
        ],
      }}
      width={100}
      height={40}
      options={{
        scales: {
          yAxes: [{ ticks: { max: 100, min: 0, stepSize: 20 } }],
        },
        maintainAspectRatio: true,
        layout: {
          padding: 0,
        },
      }}
    />
  );
};
