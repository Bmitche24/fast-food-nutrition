#import the necessary modules
import os
from typing import TYPE_CHECKING
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy.model import Model
from dotenv import load_dotenv

load_dotenv()  # Load the environment variables from the .env file

db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')

#Initialize the Flask application by creating an instance of the Flask class
app = Flask(__name__)

# Construct the PostgreSQL connection string
db_uri = f"postgresql://{db_username}:{db_password}@{db_host}:{db_port}/project_3"
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

# Initialize sqlalchemy to DB
db = SQLAlchemy()
db.init_app(app)

# Declare Base Model that ll models will inherit from
BaseModel = db.make_declarative_base(Model)

class FastFoodNutrition(BaseModel):
    __tablename__ = 'fastfood_nutrition'

    restaurant = db.Column(db.String, primary_key=True)
    item = db.Column(db.String, primary_key=True)
    calories = db.Column(db.Integer, nullable=False)
    cal_fat = db.Column(db.Integer, nullable=False)
    total_fat = db.Column(db.Integer, nullable=False)
    sat_fat = db.Column(db.Float, nullable=False)
    trans_fat = db.Column(db.Float, nullable=False)
    cholesterol = db.Column(db.Integer, nullable=False)
    sodium = db.Column(db.Integer, nullable=False)
    total_carb = db.Column(db.Integer, nullable=False)
    fiber = db.Column(db.Integer, nullable=False)
    sugar = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Integer, nullable=False)

    def __init__(self, restaurant, item, calories, cal_fat, total_fat, sat_fat, trans_fat,
                 cholesterol, sodium, total_carb, fiber, sugar, protein):
        self.restaurant = restaurant
        self.item = item
        self.calories = calories
        self.cal_fat = cal_fat
        self.total_fat = total_fat
        self.sat_fat = sat_fat
        self.trans_fat = trans_fat
        self.cholesterol = cholesterol
        self.sodium = sodium
        self.total_carb = total_carb
        self.fiber = fiber
        self.sugar = sugar
        self.protein = protein

class RestaurantAvg(BaseModel):
    __tablename__ = 'restaurant_avg'

    restaurant = db.Column(db.String, primary_key=True)
    avg_calories = db.Column(db.Float, nullable=False)
    avg_cal_fat = db.Column(db.Float, nullable=False)
    avg_total_fat = db.Column(db.Float, nullable=False)
    avg_sat_fat = db.Column(db.Float, nullable=False)
    avg_trans_fat = db.Column(db.Float, nullable=False)
    avg_cholesterol = db.Column(db.Float, nullable=False)
    avg_sodium = db.Column(db.Float, nullable=False)
    avg_total_carb = db.Column(db.Float, nullable=False)
    avg_fiber = db.Column(db.Float, nullable=False)
    avg_sugar = db.Column(db.Float, nullable=False)
    avg_protein = db.Column(db.Float, nullable=False)

class SignatureItems(BaseModel):
    __tablename__ = 'signature_items'

    restaurant = db.Column(db.String, primary_key=True)
    signature_item = db.Column(db.String, primary_key=True)
    calories = db.Column(db.Integer, nullable=False)
    cal_fat = db.Column(db.Integer, nullable=False)
    total_fat = db.Column(db.Integer, nullable=False)
    sat_fat = db.Column(db.Integer, nullable=False)
    trans_fat = db.Column(db.Integer, nullable=False)
    cholesterol = db.Column(db.Integer, nullable=False)
    sodium = db.Column(db.Integer, nullable=False)
    total_carb = db.Column(db.Integer, nullable=False)
    fiber = db.Column(db.Integer, nullable=False)
    sugar = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Integer, nullable=False)

@app.route('/')
def home():
    return render_template('index.html')  

@app.route('/fastfood-nutrition', methods=['GET'])
def get_fastfood_nutrition():
    nutrition_rows = db.session.execute(db.select(FastFoodNutrition)).scalars()
    data = [
        {
            'restaurant': c.restaurant,
            'item': c.item,
            'calories': c.calories,
            'cal_fat': c.cal_fat,
            'total_fat': c.total_fat,
            'sat_fat': c.sat_fat,
            'trans_fat': c.trans_fat,
            'cholesterol': c.cholesterol,
            'sodium': c.sodium,
            'total_carb': c.total_carb,
            'fiber': c.fiber,
            'sugar': c.sugar,
            'protein': c.protein
        }
        for c in nutrition_rows
    ]
    return jsonify(data)

@app.route('/restaurant-averages', methods=['GET'])
def get_restaurant_avg():
    averages_rows = db.session.execute(db.select(RestaurantAvg)).scalars()
    data = [
        {
            'restaurant': c.restaurant,
            'avg_calories': c.avg_calories,
            'avg_cal_fat': c.avg_cal_fat,
            'avg_total_fat': c.avg_total_fat,
            'avg_sat_fat': c.avg_sat_fat,
            'avg_trans_fat': c.avg_trans_fat,
            'avg_cholesterol': c.avg_cholesterol,
            'avg_sodium': c.avg_sodium,
            'avg_total_carb': c.avg_total_carb,
            'avg_fiber': c.avg_fiber,
            'avg_sugar': c.avg_sugar,
            'avg_protein': c.avg_protein
        }
        for c in averages_rows
    ]
    return jsonify(data)

@app.route('/signature-items', methods=['GET'])
def get_signature_items():
    signature_rows = db.session.execute(db.select(SignatureItems)).scalars()
    data = [
        {
            'restaurant': c.restaurant,
            'signature_item': c.signature_item,
            'calories': c.calories,
            'cal_fat': c.cal_fat,
            'total_fat': c.total_fat,
            'sat_fat': c.sat_fat,
            'trans_fat': c.trans_fat,
            'cholesterol': c.cholesterol,
            'sodium': c.sodium,
            'total_carb': c.total_carb,
            'fiber': c.fiber,
            'sugar': c.sugar,
            'protein': c.protein
        }
        for c in signature_rows
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=8080)
