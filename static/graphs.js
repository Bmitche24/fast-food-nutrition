let fastFoodData;
let dropdownRestaurant;
let dropdownItem;

const updatePieChart = () => {
  const selectedRestaurant = dropdownRestaurant.value;
  const selectedItem = dropdownItem.value;
  const selectedData = fastFoodData.find(item => item.restaurant === selectedRestaurant && item.item === selectedItem);

  if (selectedData) {
    const nutrientLabels = ['cal_fat', 'total_fat', 'sat_fat', 'trans_fat', 'cholesterol', 'sodium', 'total_carb', 'fiber', 'sugar', 'protein'];
    const nutrientData = nutrientLabels.map(label => {
      if (label === 'sodium') {
        return selectedData[label] / 1000; // Convert sodium from milligrams to grams
      } else {
        return selectedData[label];
      }
    });
  //if (selectedData) {
    //const nutrientLabels = ['cal_fat', 'total_fat', 'sat_fat', 'trans_fat', 'cholesterol', 'sodium', 'total_carb', 'fiber', 'sugar', 'protein'];
    //const nutrientData = nutrientLabels.map(label => selectedData[label]);

    //const chart = echarts.init(document.getElementById('pieChart'));
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      chartContainer.innerHTML = '';
    }

    // Create a new container for the chart
    const chartElement = document.createElement('div');
    chartElement.style.width = '100%';
    chartElement.style.height = '400px';
    chartContainer.appendChild(chartElement);

    // Initialize and configure the chart
    const chart = echarts.init(chartElement);
    const option = {
      title: {
        text: `Nutrient Content of ${selectedItem} at ${selectedRestaurant}`,
        top: '1%',
        textStyle: {
          fontSize: 24,
        },
        left: 'center',
      },
      series: [{
        type: 'pie',
        radius: '70%',
        center: ['50%', '60%'],
        data: nutrientLabels.map((label, index) => ({
          name: label,
          value: nutrientData[index]
        })),
        label: {
          show: true,
          formatter: '{b}: {d}',
          textStyle: {
            fontSize: 14,  // Adjust the label font size
          },
        },
        labelLine: {
          smooth: true,
        },
      }],
    };

    chart.setOption(option);
  }
};

const getFastFood = () => {
  fetch('http://localhost:8080/fastfood-nutrition')
    .then(response => response.json())
    .then(data => {
      fastFoodData = data;
      const restaurants = [...new Set(fastFoodData.map(item => item.restaurant))];
      const items = [...new Set(fastFoodData.map(item => item.item))];
      console.log(fastFoodData);
      console.log(restaurants);

      dropdownRestaurant = document.getElementById('dropdown-restaurant');
      dropdownItem = document.getElementById('dropdown-item');

      restaurants.forEach(restaurant => {
        const option = document.createElement('option');
        option.text = restaurant;
        dropdownRestaurant.appendChild(option);
      });

      dropdownRestaurant.addEventListener('change', () => {
        dropdownItem.innerHTML = '';

        const selectedRestaurant = dropdownRestaurant.value;
        const filteredItems = fastFoodData.filter(item => item.restaurant === selectedRestaurant);

        filteredItems.forEach(item => {
          const option = document.createElement('option');
          option.value = item.item;
          option.textContent = item.item;
          dropdownItem.appendChild(option);
        });
        console.log(filteredItems);

        updatePieChart();
      });

      dropdownItem.addEventListener('change', () => {
        updatePieChart();
      });

      updatePieChart();
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
document.addEventListener('DOMContentLoaded', getFastFood);


const getRestaurantAvgs = () => {
  fetch('http://localhost:8080/restaurant-averages')
    .then(response => response.json())
    .then(restaurantAvgData => {
      const nutrients = ['avg_cal_fat', 'avg_total_fat', 'avg_sat_fat', 'avg_trans_fat', 'avg_cholesterol', 'avg_sodium', 'avg_total_carb', 'avg_fiber', 'avg_sugar', 'avg_protein']; //Object.keys(restaurantAvgData[0]).slice(1);
      
      const chartData = {
        labels: nutrients,
        datasets: []
      };

      const restaurants = [
        'Mcdonalds',
        'Chick Fil-A',
        'Sonic',
        'Arbys',
        'Burger King',
        'Dairy Queen',
        'Subway',
        'Taco Bell'
      ];

      restaurants.forEach((restaurant, index) => {
        const data = nutrients.map(nutrient => {
          if (nutrient === 'avg_sodium') {
            return restaurantAvgData.find(row => row.restaurant === restaurant)[nutrient] / 1000; // Convert sodium from milligrams to grams
          } else {
            return restaurantAvgData.find(row => row.restaurant === restaurant)[nutrient];
          }
        });
        const dataset = {
          label: restaurant,
          data: data,
          borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`, // Random border color for each line
          fill: false
        };
        chartData.datasets.push(dataset);
      });

      const ctx = document.getElementById('lineChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Average Nutrition Comparison'
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Nutrients'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Average Nutrient Content'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Average Nutrient Content per Item For each Fast Food Restaurant (g)',
              font: {
                size: 24 // Customize the title font size
              }
            }
          }
        }
      });
      const lineChartCanvas = document.getElementById('lineChart');
      lineChartCanvas.style.height = '400px'; // Set the desired height
      lineChartCanvas.style.width = '800px'; // Set the desired width
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error('Error:', error);
    });
};

const getSignatureItems = () => {
  fetch('http://localhost:8080/signature-items')
    .then(response => response.json())
    .then(signatureItemsData => {      
      // Extract the nutrients and their values from the data
      const nutrients = ['cal_fat', 'total_fat', 'sat_fat', 'trans_fat', 'cholesterol', 'sodium', 'total_carb', 'fiber', 'sugar', 'protein'];
      const labels = signatureItemsData.map(item => `${item.restaurant} - ${item.signature_item}`);
      const nutrientData = nutrients.map(nutrient => {
        if (nutrient === 'sodium') {
          return signatureItemsData.map(item => item[nutrient] / 1000); // Convert sodium from milligrams to grams
        } else {
          return signatureItemsData.map(item => item[nutrient]);
        }
      });
      
      // Create the stacked bar chart
      const ctx = document.getElementById('stackedBarChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: nutrients.map((nutrient, index) => ({
            label: nutrient,
            data: nutrientData[index],
            backgroundColor: getCustomColor(index), // Customize the color for each nutrient
            stack: 'stackGroup' // Group the bars together
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              stacked: true // Enable stacked bars on the x-axis
            },
            y: {
              stacked: true, // Enable stacked bars on the y-axis
              beginAtZero: true // Start the y-axis from zero
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Nutrient Content of Fast Food Signature Items (g)', // Specify the title text
              font: {
                size: 24 // Customize the title font size
              }
            }
          }
        }
      });
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error('Error:', error);
    });
};
function getCustomColor(index) {
  // Define an array of custom colors for each nutrient
  const customColors = [
    'rgba(255, 0, 0, 0.5)',    // Red
    'rgba(0, 255, 0, 0.5)',    // Green
    'rgba(0, 0, 255, 0.5)',    // Blue
    'rgba(255, 255, 0, 0.5)',  // Yellow
    'rgb(250, 100, 0)', //orange
    'rgb(255, 0, 150)', //pink
    'rgb(200, 0, 250)', //purple
    'rgb(175, 0, 0)', //darkred
    'rgb(0, 0, 175)', //dark blue
    'rgb(0, 150, 0)' //dark  green
    // Add more custom colors for each nutrient
  ];

  // If the number of nutrients exceeds the number of custom colors, loop back to the beginning
  const colorIndex = index % customColors.length;

  return customColors[colorIndex];
}
 
getFastFood();
getRestaurantAvgs();
getSignatureItems();