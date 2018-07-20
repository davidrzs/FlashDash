import json
import time
import requests
from flask_socketio import SocketIO, emit
from flask import Flask, render_template, url_for, copy_current_request_context
from random import random
from time import sleep
from threading import Thread, Event
import datetime
from random import shuffle
from lxml import html


def read_credentials():
    file = open("./config.yaml", "r")
    contents =  file.readlines()
    file.close()
    return yaml.load(contents)

def get_indices():
    smiPage = requests.get('https://www.finanzen.net/index/SMI')
    smiTree = html.fromstring(smiPage.content)
    smiChangeString = smiTree.xpath('/html/body/div[3]/div[6]/div[3]/div[14]/div[1]/div/div/div[1]/div[2]/div[1]/div[3]/text()')
    smiChange = smiChangeString[0]

    nasdaqPage = requests.get('https://www.finanzen.net/index/Nasdaq_100')
    nasdaqTree = html.fromstring(nasdaqPage.content)
    nasdaqChangeString = nasdaqTree.xpath('/html/body/div[3]/div[6]/div[3]/div[14]/div[1]/div/div/div[1]/div[2]/div[1]/div[3]/text()')
    nasdaqChange = nasdaqChangeString[0]

    sp500Page = requests.get('https://www.finanzen.net/index/S&P_500')
    sp500Tree = html.fromstring(sp500Page.content)
    sp500ChangeString = sp500Tree.xpath('/html/body/div[3]/div[6]/div[3]/div[14]/div[1]/div/div/div[1]/div[2]/div[1]/div[3]/text()')
    sp500Change = sp500ChangeString[0]

    ftse100Page = requests.get('https://www.finanzen.net/index/FTSE_100')
    ftse100Tree = html.fromstring(ftse100Page.content)
    ftse100ChangeString = ftse100Tree.xpath('/html/body/div[3]/div[6]/div[3]/div[14]/div[1]/div/div/div[1]/div[2]/div[1]/div[3]/text()')
    ftse100Change = ftse100ChangeString[0]

    return { "smi": smiChange, "nasdaq": nasdaqChange, "sp500": sp500Change, "ftse100": ftse100Change}


def get_articles():
    sources = 'cnn,the-economist';
    url = "https://newsapi.org/v2/top-headlines?" + "sources=" + sources + '&apiKey=695d4ed67e1d43688db17a3d40b1220a'
    contents = requests.get(url).text
    jsonArticles = json.loads(contents)
    ArticleList = jsonArticles["articles"]
    filteredArticleList = list(filter(lambda art: art["description"] != None and art["urlToImage"] != None and art["publishedAt"] != None and art["title"] != None, ArticleList))
    return jsonArticles["articles"]


def get_weather():
    url = 'http://api.openweathermap.org/data/2.5/forecast?lat=47.2694&lon=8.6832&units=metric&mode=json&APPID=aaf60ae32ca1738640f49cd0121611dd'
    wetterDict = json.loads(requests.get(url).text)
    weatherList = wetterDict["list"]
    jetzt = weatherList[0]
    filtered1WeatherList = list(filter(lambda wea: "12:00" in wea["dt_txt"] , weatherList))
    tomorrowDate = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime("%y-%m-%d")
    inTwoDaysDate = (datetime.datetime.now() + datetime.timedelta(days=2)).strftime("%y-%m-%d")
    filtered2WeatherList = list(filter(lambda wea: tomorrowDate in wea["dt_txt"] or inTwoDaysDate in wea["dt_txt"], filtered1WeatherList))
    filtered2WeatherList.insert(0, jetzt)
    return filtered2WeatherList


app = Flask(__name__)
app.config['SECRET_KEY'] = 'jdas3498asdJfshdsf'
app.config['DEBUG'] = True

#turn the flask app into a socketio app
socketio = SocketIO(app)

#random number Generator Thread
thread = Thread()
thread_stop_event = Event()

class PageManagementThread(Thread):
    def __init__(self):
        super(PageManagementThread, self).__init__()

    def mainLoop(self):
        indices = get_indices()
        currentArticle = 0
        weatherCounter = 0
        articleList = get_articles()
        shuffle(articleList)
        weather = get_weather()
        while True:
            time.sleep(1)
            #check if there are some unseen articles left
            if currentArticle + 1 == len(articleList):
                articleList = get_articles()
                shuffle(articleList)
                currentArticle = 0
            currentArticle += 1
            weatherCounter += 1

            #every 200 seconds we refresh the weather
            if weatherCounter == 100:
                #lets also get the indices again
                indices = get_indices()

                weatherCounter = 0
                weather = get_weather()

            socketio.emit('weather', {'weather': weather})
            socketio.emit('indices', {'indices': indices})
            time.sleep(8)
            socketio.emit('changeArticle', {'article': articleList[currentArticle]})


    def run(self):
        self.mainLoop()


@socketio.on('connect')
def connect():
    # need visibility of the global thread object
    global thread
    print('Client connected')

    #Start thepage manager thread thread only if the thread has not been started before.
    if not thread.isAlive():
        print("Starting Thread")
        thread = PageManagementThread()
        thread.start()

@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app)
