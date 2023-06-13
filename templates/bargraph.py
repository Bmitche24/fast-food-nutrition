import pandas as pd
import matplotlib.pyplot as plt

# Read the CSV file
data = pd.read_csv('/Users/breannamitchell/Desktop/fast-food-nutrition/data/signature_items.csv')

# Extract the necessary columns from the CSV
x_data = data['signature_item']
y_data = data['calories']

# Create a bar plot
plt.bar(x_data, y_data)

# Set the title and labels for the graph
plt.title('Bar Graph')
plt.xlabel('signature_item')
plt.ylabel('calories')

# Rotate the x-axis labels for better readability if needed
plt.xticks(rotation=45)

# Save the graph as an image file (e.g., PNG)
plt.savefig('bar_graph.png')

# Close the plot
plt.close()