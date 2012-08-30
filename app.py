import tornado.web
import os.path
import tornado.httpserver
import tornado.ioloop

class Page(tornado.web.RequestHandler):
    def get(self):
        self.render("page.html")

class Upload(tornado.web.RequestHandler):
    def post(self):
        f = open(os.path.join(os.path.dirname(__file__),self.request.files["file"][0].filename),"w")
        f.write(self.request.files["file"][0].body)
        f.close
        self.write("ok")

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/",Page),
            (r"/upload",Upload),
        ]
        settings = dict(
            template_path = os.path.join(os.path.dirname(__file__),"templates"),
            static_path = os.path.join(os.path.dirname(__file__),"static"),
            debug=True,
        )
        tornado.web.Application.__init__(self,handlers,**settings)

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(os.environ.get("PORT",5000))
    tornado.ioloop.IOLoop.instance().start()
