from app.db import conn


cursor = conn.cursor()

cursor.execute("""CREATE TABLE score(
   id SERIAL PRIMARY KEY NOT NULL,
   nickname TEXT NOT NULL,
   score INT
);""")

conn.commit()
