sls invoke test -f hello
sls invoke local -f hello --data '{ "queryStringParameters": {"v1":"1", "v2": "2"}}'
sls offline start
curl -H "Content-Type:application/json" http://localhost:3000/hello?v1=1&v2=1
