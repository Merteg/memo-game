import json
from wsgiref.util import setup_testing_defaults
from wsgiref.simple_server import make_server


# A relatively simple WSGI application. It's going to print out the
# environment dictionary after being updated by setup_testing_defaults
def app(environ, start_response):
    setup_testing_defaults(environ)
    path = environ['PATH_INFO']
    method = environ['REQUEST_METHOD']
    if method == 'POST':
        if path.startswith('/'):
            try:
                request_body_size = int(environ['CONTENT_LENGTH'])
                request_body = environ['wsgi.input'].read(request_body_size)
            except (TypeError, ValueError):
                request_body = "0"
            try:
                response_body = str(request_body)
            except:
                response_body = "error"
            status = '200 OK'
            headers = [('Content-type', 'text/plain')]
            start_response(status, headers)
            return [response_body]
    else:
        status = '200 OK'
        headers = [('content-type', 'text/plain')]

        start_response(status, headers)
        test = {
            "Hello": "world"
        }
        test1 = json.dumps(test, ensure_ascii=False)
        ret = ["%s: %s\n" % (key, value) for key, value in environ.iteritems()]
        return ret


httpd = make_server('', 8000, app)
print "Serving on port 8000..."
httpd.serve_forever()