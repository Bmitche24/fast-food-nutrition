const getFastFood = () => {
  fetch('http://localhost:8080/fastfood-nutrition')
    .then(response => response.json())
    .then(fastFoodData => {
      // Do something with the fastFoodData
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
      // Do something with the fastFoodData
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
      // Do something with the fastFoodData
      console.log(signatureItemsData);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch request
      console.error('Error:', error);
    });
};
 
getFastFood();
getRestaurantAvgs();
getSignatureItems();