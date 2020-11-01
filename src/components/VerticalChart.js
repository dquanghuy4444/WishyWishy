import React from 'react';
import { Bar } from 'react-chartjs-2';

const VerticalChart = ({ starRating }) => {

  const data = {
    labels: ['1 Sao', '2 Sao', '3 Sao', '4 Sao', '5 Sao'],
    datasets: [
      {
        // label: 'Biểu đồ cơ cấu đánh giá của người dùng dựa trên sao',
        data: starRating,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: `rgb(123, 123, 123)`,
        borderWidth: 2,
        fill: false,
        data: starRating  ,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              min: 0,
              max: starRating.reduce((a , b) => Math.max(a , b)) + 2,   
              stepSize: 1
          }
        }]
     },
    legend: {
        display: false,
    },
  }

  return (
    <>
      <div className='header'>
        <h4 className='title'>Biểu đồ cơ cấu đánh giá của người dùng dựa trên sao</h4>
  
      </div>
      <Bar data={data} options={options} />
    </>
  )
}

export default VerticalChart