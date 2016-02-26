# gundam-express

Express example

## Run on local

```
$ node server.js
```

## Run on docker

```
$ docker build -t gundam-express .
$ docker run -it -d --name gundam-express --link mongo:mongo -p 8080:8080 gundam-express
```
