![project logo](logo.png)

#Factorial API

###REST API Application

**Endpoints:**
- `/factorial/random` to generate random factorial for an integer between 1 and 100
- `/factorial/:number` to generate factorial for a given number

**Result Body:**
- json format
- example:
```json
{
input: "5",
output: "120"
}
```

**Libraries:**
- Node 8 (https://nodejs.org)
- Express (https://expressjs.com/)
- PM2 (http://pm2.keymetrics.io/)
- BigInteger to handle large factorials (https://github.com/peterolson/BigInteger.js)
- Jasmine for BDD tests (https://jasmine.github.io/)

###Infrastructure as Code
- Utilizes CloudFormation templates to build:
 - VPC with two subnets and routing to a public gateway
 - IAM role and policy to grant access to ECR from ECS
 - ECS Cluster and ALB to allow access to containers in respective subnets/AZs
 - Fargate task and service definitions for orchestration
- `deploy.sh` script:
  - Creates ECR repo, builds and pushes container image
  - Promotes code reuse through separate templates/stacks
  - May be abandoned in favor of nested stacks (https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html)
  
###Demo: 