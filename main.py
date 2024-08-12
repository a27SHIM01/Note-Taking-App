from flask import Flask, render_template
import requests
import json

app = Flask(__name__)

@app.route("/")
def homepage():
  return render_template("homepage.html")

# @app.route("/weather.html", methods=["GET"])
# def get_weather():
#   req = requests.get('http://api.weatherapi.com/v1/forecast.json?key=00b6182fc54d4fe39be191558241706&q=M1V&days=5&aqi=no&alerts=no')
#   data = json.loads(req.content)
#   return render_template("weather.html", data=data)

@app.route("/weather.html")
def weather():
  return render_template("weather.html")

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)