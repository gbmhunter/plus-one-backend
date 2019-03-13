# Setup Credentials

You need to create AWS credentials under the profile `serverless` which allow access to create Lambda functions, DynamoDB tables and CloudWatch logs.

# Deploy

```bash
$ serverless deploy
```

# Teardown

To teardown AWS architecture:

```bash
$ serverless remove
```

However, this will not teardown the DynamoDB database. This has to be removed manually from the AWS Console.