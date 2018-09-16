import json


class App:
    def __init__(self, headers):
        self.routes = {}
        self.headers = headers

    def add_route(self, path, method, handle_func):
        self.routes[path] = {
            method: handle_func
        }

    def process(self, environ, start_response):
        path = environ['PATH_INFO']
        method = environ['REQUEST_METHOD']
        origin = environ.get("HTTP_ORIGIN")
        preflight = origin and method == "OPTIONS"

        item_path = '/'.join(path.split('/')[:-1] + [''])

        if origin:
            self.headers.extend([
                ("Access-Control-Allow-Origin", origin),
                ("Access-Control-Allow-Credentials", "true")
            ])
            if preflight:
                self.headers.extend([
                    ("Access-Control-Allow-Methods", "POST"),
                    ("Access-Control-Allow-Headers", "Content-Type")
                ])
        if method == "OPTIONS":
            start_response("204 No Content", self.headers)
            return []

        if path in self.routes:
            route = path
        elif item_path in self.routes:
            route = item_path
        else:
            status = '404 Not Found'
            start_response(status, self.headers)
            response = {
                'success': False
            }
            return [json.dumps(response, ensure_ascii=False)]

        if method in self.routes[route]:
            return self.routes[route][method](environ, start_response,
                                              self.headers)
        else:
            status = '405 Method Not Allowed'
            start_response(status, self.headers)
            response = {
                'success': False
            }
            return json.dumps(response, ensure_ascii=False)
