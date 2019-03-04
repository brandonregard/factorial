#!/bin/bash
# this script assumes we have a registry setup already

# login
$(aws ecr get-login --no-include-email --region us-east-1)

# create a repo
aws ecr create-repository --repository-name factorial

# get our repo uri
URI=$(aws ecr describe-repositories --repository-name factorial \
--query 'repositories[?repositoryName==`factorial`].repositoryUri' --output text)
IMAGE=${URI}:latest

# build our image
docker build -t factorial .

# tag and push to ECR
docker tag factorial:latest ${IMAGE}
docker push ${IMAGE}

# create our vpc, subnets, gateway, and routing using the vpc template
aws cloudformation create-stack --stack-name vpc \
--template-body file://templates/vpc.yml
aws cloudformation wait stack-create-complete --stack-name vpc

# create the role and policies we need for ECS
aws cloudformation create-stack --stack-name iam \
--template-body file://templates/iam.yml --capabilities CAPABILITY_IAM
aws cloudformation wait stack-create-complete --stack-name iam

# create the role and policies we need for ECS
aws cloudformation create-stack --stack-name cluster \
--template-body file://templates/cluster.yml
aws cloudformation wait stack-create-complete --stack-name cluster

# create the role and policies we need for ECS
aws cloudformation create-stack --stack-name factorial \
--template-body file://templates/factorial.yml \
--parameters ParameterKey=Image,ParameterValue=${IMAGE}
aws cloudformation wait stack-create-complete --stack-name factorial

# print our api endpoint
aws cloudformation --region us-east-1 describe-stacks --stack-name factorial \
--query 'Stacks[?StackName==`factorial`].Outputs[?ExportName==`FactorialApiEndpoint`].OutputValue' \
--output text