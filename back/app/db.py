import psycopg2
import ConfigParser

config = ConfigParser.ConfigParser()
config.read('config.ini')

host = config.get('DATABASE', 'host')
login = config.get('DATABASE', 'login')
password = config.get('DATABASE', 'password')
db = config.get('DATABASE', 'db')

conn = psycopg2.connect(
    "host='%(host)s' dbname='%(db)s' user='%(login)s' password='%(password)s'"
    % {"host": host, "db": db, "login": login, "password": password}
)
