import React from 'react';
import { Pie } from 'react-chartjs-2';


function PieChart({amountFemale , amountMale , amountOthers}) {

    const data = {
        labels: ['Nữ', 'Nam', 'Khác'],
        datasets: [
          {
            // label: '# of Votes',
            data: [amountFemale, amountMale, amountOthers],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
    }

    return (
        <Pie data={data} />
    );
}

export default PieChart;
