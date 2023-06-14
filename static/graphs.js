const getFastFood = () => {
  fetch('http://localhost:8080/fastfood-nutrition')
    .then(response => response.json())
    .then(fastFoodData => {
      // Do something with the fastFoodData

      const someHtmlElement = document.getElementById('fast-food-scatter-plot');
      const spanElement = document.createElement('span');
      spanElement.textContent = 'Hi Hello';
      someHtmlElement.appendChild(spanElement);

      console.log(fastFoodData);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error('Error:', error);
    });
};

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