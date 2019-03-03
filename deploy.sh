#!/bin/bash
$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t factorial .
docker tag factorial:latest 255847211468.dkr.ecr.us-east-1.amazonaws.com/factorial:latest
docker push 255847211468.dkr.ecr.us-east-1.amazonaws.com/factorial:latest