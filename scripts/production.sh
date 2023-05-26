#!/usr/bin/env bash

# set -e

if [ "$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')" != "main" ]
then
  echo "Must be on main branch to deploy to production"
  exit 1
fi

npm run build

S3_BUCKET_URL="s3://test-internal-video-directory"

aws s3 sync --delete out/ "s3://test-internal-video-directory" --profile courageous
aws cloudfront create-invalidation --distribution-id E20PA609L0VDT --paths "/*" --profile courageous