#!/bin/bash
rm -rf /assets
npm run build

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

git config user.name "Travis CI"
git config user.email "travis.ci.build@gmail.com"

git add --all
git commit -m "Deploy assets from build #$TRAVIS_BUILD_NUMBER"

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" HEAD:gh-pages

fi