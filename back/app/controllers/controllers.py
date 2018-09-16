import json
from . import dict_from_environ
from ..db import conn


def get_records(environ, start_response, headers):
    response = {
        'success': False,
    }

    cursor = conn.cursor()

    cursor.execute("""SELECT nickname, score FROM score ORDER BY score DESC
                   LIMIT 10;""")

    rows = cursor.fetchall()
    if len(rows):
        records = [(row[0], row[1]) for row in rows]
        response['records'] = records
        response['success'] = True
        status = '200 OK'
    else:
        status = '404 OK'

    start_response(status, headers)

    return json.dumps(response)


def get_record(environ, start_response, headers):
    response = {
        'success': False,
    }

    path_param = environ['PATH_INFO'].split('/')[-1]

    cursor = conn.cursor()

    cursor.execute("""SELECT score FROM score WHERE nickname = '{}' ORDER
                   BY score DESC LIMIT 1;""".format(path_param))

    rows = cursor.fetchall()
    if len(rows):
        response['record'] = rows[0][0]
        response['success'] = True
        status = '200 OK'
    else:
        status = '404 OK'

    start_response(status, headers)

    return json.dumps(response)


def post_score(environ, start_response, headers):
    request_data = dict_from_environ(environ)

    response = {
        'success': False
    }

    if 'nickname' in request_data and 'score' in request_data:
        cursor = conn.cursor()
        if 'id' in request_data:
            cursor.execute("""UPDATE score SET score = {} WHERE ID = {};"""
                           .format(request_data['score'], request_data['id']))
            conn.commit()

            response['success'] = True
            response['id'] = request_data['id']
            status = '200 OK'
        else:
            cursor.execute("""INSERT INTO score (nickname, score) VALUES
                           ('{}', {});""".format(request_data['nickname'],
                                                 request_data['score']))
            conn.commit()

            cursor.execute("""SELECT id FROM score WHERE nickname = '{}' ORDER
                           BY id DESC LIMIT 1;"""
                           .format(request_data['nickname']))

            rows = cursor.fetchall()
            response['success'] = True
            response['id'] = rows[0][0]
            status = '200 OK'
    else:
        status = '400 Bad Request'

    start_response(status, headers)

    return json.dumps(response)
