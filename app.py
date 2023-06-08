#import the necessary modules
from flask import Flask, render_template

#Initialize the Flask application by creating an instance of the Flask class
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('fastfood.html')  # Replace 'index.html' with your actual HTML template file
    
if __name__ == '__main__':
    app.run(port=8000)