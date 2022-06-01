#!/bin/bash

if [[ $1 == 'prod' ]]
then
  sed -i '' 's/handpoint.io/handpoint.com/g' docusaurus.config.js
else
  sed -i '' 's/handpoint.com/handpoint.io/g' docusaurus.config.js
fi