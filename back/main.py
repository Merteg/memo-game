from wsgiref.util import setup_testing_defaults
from wsgiref.simple_server import make_server


from app import App
from app.controllers.controllers import get_records, get_record, post_score


def app(environ, start_response):
    setup_testing_defaults(environ)

    app = App(headers=[('content-type', 'application/json')])
    app.add_route('/record', 'GET', get_records)
    app.add_route('/record/', 'GET', get_record)
    app.add_route('/game-score', 'POST', post_score)
    response = app.process(environ, start_response)
    return response


httpd = make_server('', 8000, app)
print "Serving on port 8000..."
httpd.serve_forever()
