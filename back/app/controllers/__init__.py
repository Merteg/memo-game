import json


def dict_from_environ(environ):
    try:
        request_body_size = int(environ['CONTENT_LENGTH'])
        request_body = environ['wsgi.input'].read(request_body_size)
    except (TypeError, ValueError):
        request_body = "0"
    try:
        response_body = json.loads(request_body)
    except:
        response_body = "error"
    return response_body
