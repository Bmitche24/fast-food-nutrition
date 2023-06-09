#import the necessary modules
from flask import Flask, render_template

#Initialize the Flask application by creating an instance of the Flask class
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('fastfood.html')  

if __name__ == '__main__':
    app.run(port=8000)
