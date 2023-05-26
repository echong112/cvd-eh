#!/usr/bin/env bash

# set -e

if [ "$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')" != "main" ]
then
  echo "Must be on main branch to deploy to production"
  exit 1
fi

npm run build

S3_BUCKET_URL="s3://courageous-video-directory-staging"

aws s3 sync --delete out/ "s3://courageous-video-directory-staging" --profile courageous
aws cloudfront create-invalidation --distribution-id E38TBKQ2180258 --paths "/*" --profile courageous
