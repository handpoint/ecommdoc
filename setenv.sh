#!/bin/bash
if [[ $1 == 'prod' ]]
then
  sed -i '' 's/handpoint.io/handpoint.com/g' docusaurus.config.js
  sed -i '' 's/handpoint.io/handpoint.com/g' src/pages/index.js
else
  sed -i '' 's/handpoint.com/handpoint.io/g' docusaurus.config.js
  sed -i '' 's/handpoint.com/handpoint.io/g' src/pages/index.js
fi