const getFastFood = () => {
  fetch('http://localhost:8080/fastfood-nutrition')
    .then(response => response.json())
    .then(fastFoodData => {      
      // Extract the nutrients and their values from the data
      
  }) 
}
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
function updateChart() {
  const restaurantSelect = document.getElementById('restaurant-select');
  const itemSelect = document.getElementById('item-select');
  const selectedRestaurant = restaurantSelect.value;
  const selectedItem = itemSelect.value;

  const filteredData = fastFoodData.filter(
    data => data.restaurant === selectedRestaurant && data.item === selectedItem
  );

  const nutrients = ['cal_fat', 'total_fat', 'sat_fat', 'trans_fat', 'cholesterol', 'sodium', 'total_carb', 'fiber', 'sugar', 'protein']; // Extract nutrient names
  const nutrientValues = nutrients.map(nutrient => filteredData[0][nutrient]);

  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: nutrients,
      datasets: [
        {
          label: 'Nutrient Content',
          data: nutrientValues,
          fill: false,
          borderColor: 'blue',
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nutrient Content'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Nutrient'
          }
        }
      }
    }
  });
}
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
const restaurantSelect = document.getElementById('restaurant-select');
const itemSelect = document.getElementById('item-select');
restaurantSelect.addEventListener('change', updateChart);
itemSelect.addEventListener('change', updateChart);

const getRestaurantAvgs = () => {
  fetch('http://localhost:8080/restaurant-averages')
    .then(response => response.json())
    .then(restaurantAvgData => {
      console.log(restaurantAvgData);
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
            backgroundColor: `rgba(${index * 25}, 0, 0, 0.5)`, // Customize the color for each nutrient
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
 
getFastFood();
getRestaurantAvgs();
getSignatureItems();