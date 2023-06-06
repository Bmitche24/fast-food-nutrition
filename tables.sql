DROP TABLE IF EXISTS fast_food.fastfood_nutrition CASCADE;
DROP TABLE IF EXISTS fast_food.restaurant_avg CASCADE;

CREATE TABLE fast_food.fastfood_nutrition (
	restaurant VARCHAR NOT NULL,
	item VARCHAR NOT NULL,
	calories INT NOT NULL,
	cal_fat INT NOT NULL,
	total_fat INT NOT NULL,
	sat_fat FLOAT NOT NULL,
	trans_fat FLOAT NOT NULL,
	cholesterol INT NOT NULL,
	sodium INT NOT NULL,
	total_carb INT NOT NULl,
	fiber INT NOT NULL,
	sugar INT NOT NULL,
	protein INT NOT NULL	
);

SELECT * FROM fast_food.fastfood_nutrition;

CREATE TABLE fast_food.restaurant_avg (
	restaurant VARCHAR NOT NULL,
	avg_calories FLOAT NOT NULL,
	avg_cal_fat FLOAT NOT NULL,
	avg_total_fat FLOAT NOT NULL,
	avg_sat_fat FLOAT NOT NULL,
	avg_trans_fat FLOAT NOT NULL,
	avg_cholesterol FLOAT NOT NULL,
	avg_sodium FLOAT NOT NULL,
	avg_total_carb FLOAT NOT NULL,
	avg_fiber FLOAT NOT NULL,
	avg_sugar FLOAT NOT NULL,
	avg_protein FLOAT NOT NULL
);

SELECT * FROM fast_food.restaurant_avg;

