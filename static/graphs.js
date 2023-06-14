// Function to update the pie chart based on the selected restaurant and item
let fastFoodData;
const updatePieChart = () => {
  const selectedRestaurant = dropdownRestaurant.value;
  const selectedItem = dropdownItem.value;
  const selectedData = fastFoodData.find(item => item.restaurant === selectedRestaurant && item.item === selectedItem);

  // Check if selected data is found
  if (selectedData) {
    const nutrientLabels = Object.keys(selectedData).slice(2); // Exclude 'restaurant' and 'item'
    const nutrientData = nutrientLabels.map(label => selectedData[label]);

    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: nutrientLabels,
        datasets: [{
          data: nutrientData,
          backgroundColor: getCustomColors(nutrientLabels.length), // Call a function to get custom colors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: `Nutrient Content of ${selectedItem} at ${selectedRestaurant}`
        }
      }
    });
  }
};

const getFastFood = () => {
  fetch('http://localhost:8080/restaurant-averages')
    .then(response => response.json())
    .then(data => {
      fastFoodData = data;
      const restaurants = [...new Set(fastFoodData.map(item => item.restaurant))];
      const items = [...new Set(fastFoodData.map(item => item.item))];

      const dropdownRestaurant = document.getElementById('dropdown-restaurant');
      const dropdownItem = document.getElementById('dropdown-item');

      // Populate dropdown menu with restaurants
      restaurants.forEach(restaurant => {
        const option = document.createElement('option');
        option.text = restaurant;
        dropdownRestaurant.appendChild(option);
      });

      // Update dropdown menu options when the restaurant selection changes
      dropdownRestaurant.addEventListener('change', () => {
        const selectedRestaurant = dropdownRestaurant.value;
        const filteredItems = fastFoodData.filter(item => item.restaurant === selectedRestaurant);

        // Clear previous options
        dropdownItem.innerHTML = '';

        // Populate dropdown menu with items for the selected restaurant
        filteredItems.forEach(item => {
          const option = document.createElement('option');
          option.value = item;
          option.textContent = item;
          dropdownItem.appendChild(option);
        });

        // Update the pie chart when the restaurant selection changes
        updatePieChart();
      });

      // Update the pie chart when the item selection changes
      dropdownItem.addEventListener('change', () => {
        updatePieChart();
      });

      // Initial update of the pie chart
      updatePieChart();
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error('Error:', error);
    });
};

const getCustomColors = (numColors) => {
  const colors = [];
  
  // Generate random colors
  for (let i = 0; i < numColors; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    colors.push(color);
  }
  
  return colors;
};
// const getFastFood = () => {
//   fetch('http://localhost:8080/fastfood-nutrition')
//     .then(response => response.json())
//     .then(fastFoodData => {      
//       // Extract the nutrients and their values from the data
      
//   }) 
// }
// Function to populate the item dropdown based on the selected restaurant
// async function populateItemDropdown(restaurant) {
//   const itemSelect = document.getElementById("item-select");
//   itemSelect.innerHTML = ""; // Clear existing options

//   // Get fast food data
//   const fastFoodData = await getFastFood();

//   // Filter the data based on the selected restaurant
//   const filteredData = fastFoodData.filter(obj => obj.restaurant === restaurant);

//   // Get unique items for the selected restaurant
//   const items = [...new Set(filteredData.map(obj => obj.item))];

//   // Create options for each item
//   items.forEach(item => {
//     const option = document.createElement("option");
//     option.value = item;
//     option.textContent = item;
//     itemSelect.appendChild(option);
//   });
// }


// Event listener for the restaurant dropdown
// function createLineGraph(restaurant, item, fastFoodData) {
//   // Get the data for the selected restaurant and item
//   const filteredData = fastFoodData.filter((obj) => obj.restaurant === restaurant && obj.item === item);
  
//   // Extract the nutrients and their values from the data
//   const nutrients = ['cal_fat', 'total_fat', 'sat_fat', 'trans_fat', 'cholesterol', 'sodium', 'total_carb', 'fiber', 'sugar', 'protein'];
//   const nutrientLabels = nutrients.map((nutrient) => nutrient.replace('_', ' '));
//   const nutrientData = nutrients.map((nutrient) => filteredData[0][nutrient]);
  

//   // Create the line chart
//   const ctx = document.getElementById('lineChart').getContext('2d');
//   const lineChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: nutrientLabels,
//       datasets: [
//         {
//           label: `${item} (${restaurant})`,
//           data: nutrientData,
//           fill: false,
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Nutrient Content'
//           }
//         },
//         x: {
//           title: {
//             display: true,
//             text: 'Nutrients'
//           }
//         }
//       }
//     }
//   });
//   document.getElementById("restaurant-select").addEventListener("change", (event) => {
//     const restaurant = event.target.value;
//     populateItemDropdown(restaurant);
//     createLineGraph(restaurant, item);
// })
// };
// function updateChart() {
//   const restaurantSelect = document.getElementById('restaurant-select');
//   const itemSelect = document.getElementById('item-select');
//   const selectedRestaurant = restaurantSelect.value;
//   const selectedItem = itemSelect.value;

//   const filteredData = fastFoodData.filter(
//     data => data.restaurant === selectedRestaurant && data.item === selectedItem
//   );

//   const nutrients = ['cal_fat', 'total_fat', 'sat_fat', 'trans_fat', 'cholesterol', 'sodium', 'total_carb', 'fiber', 'sugar', 'protein']; // Extract nutrient names
//   const nutrientValues = nutrients.map(nutrient => filteredData[0][nutrient]);

//   const ctx = document.getElementById('chart').getContext('2d');
//   const chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: nutrients,
//       datasets: [
//         {
//           label: 'Nutrient Content',
//           data: nutrientValues,
//           fill: false,
//           borderColor: 'blue',
//           tension: 0.1
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Nutrient Content'
//           }
//         },
//         x: {
//           title: {
//             display: true,
//             text: 'Nutrient'
//           }
//         }
//       }
//     }
//   });
// }
// Initial population of item dropdown based on the default selected restaurant
// const initialRestaurant = document.getElementById("restaurant-select").value;
// const initialItem = document.getElementById("item-select").value;
// getFastFood()
//   .then((fastFoodData) => {
//     populateItemDropdown(initialRestaurant, fastFoodData);
//     createLineGraph(initialRestaurant, initialItem, fastFoodData);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// const restaurantSelect = document.getElementById('restaurant-select');
// const itemSelect = document.getElementById('item-select');
// restaurantSelect.addEventListener('change', updateChart);
// itemSelect.addEventListener('change', updateChart);

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
        const data = nutrients.map(nutrient => restaurantAvgData.find(row => row.restaurant === restaurant)[nutrient]);
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
          maintainAspectRatio: false,
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
      const labels = signatureItemsData.map(item => item.signature_item);
      const nutrientData = nutrients.map(nutrient => signatureItemsData.map(item => item[nutrient]));
      
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
          scales: {
            x: {
              stacked: true // Enable stacked bars on the x-axis
            },
            y: {
              stacked: true, // Enable stacked bars on the y-axis
              beginAtZero: true // Start the y-axis from zero
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
    'rgb(100, 0, 0)', //darkred
    'rgb(0, 0, 100)', //dark blue
    'rgb(0, 50, 0)' //dark  green
    // Add more custom colors for each nutrient
  ];

  // If the number of nutrients exceeds the number of custom colors, loop back to the beginning
  const colorIndex = index % customColors.length;

  return customColors[colorIndex];
}
 
getFastFood();
getRestaurantAvgs();
getSignatureItems();