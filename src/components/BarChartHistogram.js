import React from 'react';
import { Bar } from 'react-chartjs-2';

const defaultLineDataSeriesOptions = {
  backgroundColor: 'rgba(63,69,192,0.4)',
  borderColor: 'rgb(65,121,192)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(63,69,192,0.4)',
  hoverBorderColor: 'rgb(65,121,192)',
};

export default ({ histogram }) => {

  return (
    <Bar
      width={100}
      height={50}
      data={{
        labels: histogram.map(({ seconds }) => seconds),
        datasets: [
          {
            label: 'Correct Response Time (s)',
            data: histogram.map(({ correct_count }) => correct_count),
            ...defaultLineDataSeriesOptions,
          },
          {
            label: 'Incorrect Response Time (s)',
            data: histogram.map(({ wrong_count }) => wrong_count),
            ...defaultLineDataSeriesOptions,
            backgroundColor: 'rgba(192,83,102,0.4)',
            borderColor: 'rgb(192,73,90)',
          }
        ],
      }}
      options={{
        scales: {
          yAxes: [{ ticks: { min: 0 } }],
          xAxes: [{
            distribution: 'series',
          }]
        }}
      }
    />
  );
};
