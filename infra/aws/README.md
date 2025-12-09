# AWS Deployment Plan

## Web Admin (React)
1. Build with `pnpm nx build admin`.
2. Sync `dist/apps/admin` to an S3 bucket (e.g., `s3://helios-web-admin`) with `aws s3 sync dist/apps/admin s3://helios-web-admin --delete`.
3. Invalidate the attached CloudFront distribution (`aws cloudfront create-invalidation --distribution-id <id> --paths "/*"`).
4. Use AWS WAF + OAC for secure access.

## API (Node/Express)
1. Build container image using the provided `Dockerfile` (see below) and push to ECR.
   ```bash
   aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin <account>.dkr.ecr.$AWS_REGION.amazonaws.com
   docker build -t helios-api .
   docker tag helios-api:latest <account>.dkr.ecr.$AWS_REGION.amazonaws.com/helios-api:latest
   docker push <account>.dkr.ecr.$AWS_REGION.amazonaws.com/helios-api:latest
   ```
2. Update the ECS task definition (see `ecs-task-def.json`) with the new image digest and environment variables (Mongo URI, Redis URL, JWT secrets, QuickBooks/Zoho credentials).
3. Deploy via CodeDeploy or `aws ecs update-service --cluster helios-cluster --service helios-api --force-new-deployment`.

## Background Worker
- Reuse the same container image with a different command (`node dist/apps/api/src/workers/export.worker.js`).
- Run as an ECS service or AWS Fargate task subscribed to the same Redis/BullMQ instance.

## GitHub Actions Deployment Secrets
Set the following secrets in your repo to enable automated deploy jobs:
- `AWS_REGION`
- `AWS_ACCOUNT_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `ECR_REPOSITORY`
- `S3_BUCKET_ADMIN`
- `CLOUDFRONT_DISTRIBUTION_ID`

## Dockerfile (API)
Create a `Dockerfile` in the repo root if not already present:
```
FROM public.ecr.aws/docker/library/node:20-alpine as deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc .
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM deps as builder
COPY . .
RUN pnpm nx build api

FROM public.ecr.aws/docker/library/node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/api ./dist
CMD ["node", "dist/main.js"]
```

## Task Definition Stub
See `infra/aws/ecs-task-def.json` for a prefilled template with environment variables for MongoDB Atlas, Redis (BullMQ), and AWS Secrets Manager ARNs.
