import json
import time
import requests
from flask_socketio import SocketIO, emit
from flask import Flask, render_template, url_for, copy_current_request_context
from random import random
from time import sleep
from threading import Thread, Event



def get_articles():
    sources = 'cnn,the-economist';
    url = "https://newsapi.org/v2/top-headlines?" + "sources=" + sources + '&apiKey=695d4ed67e1d43688db17a3d40b1220a'
    contents = requests.get(url).text
    jsonArticles = json.loads(contents)
    ArticleList = jsonArticles["articles"]
    filteredArticleList = list(filter(lambda art: art["description"] != None and art["urlToImage"] != None and art["publishedAt"] != None and art["title"] != None, ArticleList))
    return jsonArticles["articles"]



app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
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
        currentArticle = 0
        articleList = get_articles()

        while True:
            time.sleep(1)
            #check if there are some unseen articles left
            if currentArticle + 1 == len(articleList):
                articleList = get_articles()
                currentArticle = 0
            currentArticle += 1
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
