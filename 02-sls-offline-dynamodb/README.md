```bash
sls offline start
curl -X POST -H "Content-Type:application/json" http://localhost:3000/todos --data '{ "text": "Learn Serverless" }'
curl -H "Content-Type:application/json" http://localhost:3000/todos
```