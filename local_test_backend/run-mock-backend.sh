#!/bin/bash
docker build -t mock-server .
docker rm -f cognito-react-starter-test-backend || true
docker run --name cognito-react-starter-test-backend -d -p 8000:8000 mock-server 
docker logs -f cognito-react-starter-test-backend
