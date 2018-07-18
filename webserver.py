import json
import tornado
import time


class DashboardWSH(tornado.websocket.WebSocketHandler):
    def open(self):
        self.write_message("Hello World")

    def display_article(article):
        self.write_message(article)

    def update_threeday_weather(weather):
        self.write_message(weather)

#    def on_message(self, message):
#        self.write_message(u"You said: " + message)

    def on_close(self):
        print("WebSocket closed")




def main():
    articleUpdate = 0
    aticleListUpdate = 0
    

    while(True):
        time.sleep(10)



main()
