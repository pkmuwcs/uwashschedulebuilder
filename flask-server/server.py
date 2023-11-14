from flask import Flask, request, jsonify
import datetime 
import json
from flask_cors import CORS
import logging
import uwtools
from uwtools import time_schedules
import pandas as pd
import numpy as np
import csv

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['ACCESS-CONTROL-ALLOW-ORIGIN'] = '*'
app.config['ACCESS-CONTROL-ALLOW-METHODS'] = 'GET', 'POST'
GLOBAL_CHECK = ""

# bad. really bad. But ok for testing. Use SQLAlchemy or Flask Sessions to solve this!!
global_time_schedule = pd.DataFrame()

@app.route("/api", methods=['POST', 'GET'])
def receive_data():
    data = request.get_json(force=True)
    user_quarter = data.get('quarter')
    user_year = int(data.get('year'))
    reset = data.get('resetDatabase')
    user_courses_received = data.get('Course #0')
    user_course_received_2 = data.get("Course #1")
    user_course_received_3 = data.get("Course #2")
    user_courses_received = [user_courses_received, user_course_received_2, user_course_received_3]


    #logging.info("TYPE IS : " + str(type(user_courses_received)))
    logging.info(user_courses_received)
    #user_courses_SLN = [eval(i) for i in user_courses_SLN]
    #logging.info(user_courses_SLN)
    
    if user_quarter is not None and user_year is not None:
        logging.info("user data is not None")
        if reset == "Yes":
            logging.info("user is changing current quarter!")
            time_schedule = uwtools.time_schedules(struct='df', campuses=['Seattle'], year=user_year, quarter=user_quarter, include_datetime=True)
            time_schedule.to_csv('course_data.csv', index=False)
        else:
            logging.info("didn't update the time schedule!")

        file = open('course_data.csv')
        csvreader = csv.reader(file)
        rows = []
        logging.info("iterating over rows in csv file!")
        for index, row in enumerate(csvreader):
            if row[2] in user_courses_received:
                rows.append(row)
                logging.info("appending course: " + str(row[0]) + " at index " + str(index))

        returned_classes = rows
        logging.info("ready to return!")
        return json.dumps(returned_classes)
        #return time_schedule
    else:
        logging.info("within the else!")
        return jsonify({"error": "Invalid data received"})





if __name__ == "__main__":
    app.run(debug=True)
    print(GLOBAL_CHECK)