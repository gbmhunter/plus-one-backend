# Overview

[![Build Status](https://travis-ci.org/gbmhunter/shuriken-backend.svg?branch=master)](https://travis-ci.org/gbmhunter/shuriken-backend)

This is the backend which provides a cloud-based API and storage for the "shuriken" page voting feature on [blog.mbedded.ninja](blog.mbedded.ninja). It is similar to Medium.com's "claps".

# Setup Credentials

You need to create AWS credentials which allow access to create Lambda functions, DynamoDB tables and CloudWatch logs.

When deployed via TravisCI, the AWS crednetials are stored in secret environment variables.

# Deploy

To deploy to the `dev` environment:

```bash
$ serverless deploy
```

# Teardown

To teardown the AWS architecture (by default this will be the `dev` environment):

```bash
$ serverless remove
```

However, this will not teardown the DynamoDB database. This has to be removed manually from the AWS Console.