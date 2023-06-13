fetch('data/restaurant_avg.csv')
.then(response => response.text())
.then(data => {
  // Process the data
  const rows = data.split('\n');
  const headers = rows[0].split(',');
  const dataArray = rows.slice(1).map(row => row.split(','));

  // Get unique restaurant names and nutrient names
  const restaurantNames = Array.from(new Set(dataArray.map(row => row[1])));
  const nutrientNames = headers.slice(1); // Assuming nutrient names start from index 6

  // Populate dropdowns
  const restaurantSelect = document.getElementById('restaurant-select');
  restaurantNames.forEach(name => {
    const option = document.createElement('option');
    option.text = name;
    restaurantSelect.add(option);
  });

  const nutrientSelect = document.getElementById('nutrient-select');
  nutrientNames.forEach(name => {
    const option = document.createElement('option');
    option.text = name;
    nutrientSelect.add(option);
  });

  // Create the chart based on selected values
  const chartCanvas = document.getElementById('chart');
  const chart = new Chart(chartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Update chart on dropdown changes
  function updateChart() {
    const selectedRestaurant = restaurantSelect.value;
    const selectedNutrient = nutrientSelect.value;

    const filteredData = dataArray.filter(row =>
      row[2] === selectedRestaurant && row[headers.indexOf(selectedNutrient)] !== ''
    );

    chart.data.labels = filteredData.map(row => row[0]);
    chart.data.datasets = [{
      label: selectedRestaurant,
      data: filteredData.map(row => parseFloat(row[headers.indexOf(selectedNutrient)])),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }];

    chart.update();
  }

  // Attach event listeners to dropdowns
  restaurantSelect.addEventListener('change', updateChart);
  nutrientSelect.addEventListener('change', updateChart);
})
.catch(error => console.error('Error loading the dataset:', error));

 