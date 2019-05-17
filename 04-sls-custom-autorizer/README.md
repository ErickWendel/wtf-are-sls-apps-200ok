# Running

sls offline start

```bash
#it will return the token
curl -X POST -H "Content-Type:application/json" http://localhost:3000/login --data '{ "user": "erickwendel", "pass": "123" }'

TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZXJpY2t3ZW5kZWwiLCJpYXQiOjE1NTgwNDM3MTAsImV4cCI6MTU1ODA0NzMxMH0.PKK8Pi2MPHlIwJ0Bzu44puW9NAn0QZxEM1ia4tK1OJQ

curl -X GET -H "Authorization:$TOKEN" http://localhost:3000/hello
# {
#   "message": "Hello World!"
# }

#testing with invalid token
curl -X GET -H "Authorization:123" http://localhost:3000/hello
# {"statusCode":401,"error":"Unauthorized","message":"Unauthorized"}


```
