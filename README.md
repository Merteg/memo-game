# JS Frameworks Memory Game #
## Run Project by docker-compose ##
All you need - it's one command:
```
docker-compose up
```
That's all!

Now you can see the application by:
```sh
localhost:3000
```

Also, if you need, adminer for db is here:
Adminer:
```sh
localhost:9008
```

All configs you can find and set in:
```sh
docker-compose.yml
back/config.ini
front/src/config.json
```

## Init tables db ##

Change your work dir to **back**
```sh
cd way/to/project/back/
```

To create tables and push test data open your Terminal and run:
```sh
python db_init.py
```
Don't forget to run PostgreSQL (by docker or smth else).

That's all.
