<!-- https://www.npmjs.com/package/serverless-mocha-plugin -->

sls create function -f hello2 --handler handler2
sls create test -f hello 

sls invoke test [--stage stage] [--region region] [-t timeout] [-f function1] [-f function2] [...]

sls invoke test -f hello