const avgData = 'data/restaurant_avg.csv';
function updateChart(avgData) {
    const ctx = document.getElementById('chart').getContext('2d');
    labels = Object.keys(avgData);
    values =  Object.values(avgData);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets:  [
                {
                    label: 'Average Nutrient Content',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                },
            ],
        },
        options: {
            responsive:true,
            scales:{
                y: {
                    beginAtZero:  true,
                },
            },
        },
    });
}
document.getElementById('restaurant-select').addEventListener('change', handleDropdownChange);
document.getElementById('nutrient-select').addEventListener('change', handleDropdownChange);

function handleDropdownChange() {
  const selectedRestaurant = document.getElementById('restaurant-select').value;
  const selectedNutrient = document.getElementById('nutrient-select').value;

  // Calculate average nutrient content for the selected restaurant and nutrient

  // Call the updateChart function with the processed data
  updateChart(avgData);
}