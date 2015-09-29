#!/bin/bash
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

npm run build

git config user.name "Travis CI"
git config user.email "contact@travis-ci.com"

git add .
git commit -m "Deploy assets from build #$TRAVIS_BUILD_NUMBER"

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" origin gh-pages > /dev/null 2>&1

fi