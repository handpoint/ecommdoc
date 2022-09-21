#!/bin/bash
if [[ $1 == 'prod' ]]
then
  sed -i '' 's/handpoint.io/handpoint.com/g' docusaurus.config.js
  sed -i '' "s/developer-ecomm.handpoint.io/developer-ecomm.handpoint.com/g" docusaurus.config.js
  sed -i '' 's/includeCurrentVersion: true/includeCurrentVersion: false/g' docusaurus.config.js
  sed -i '' "s/organizationName: 'handpointecommdev'/organizationName: 'handpointecomm'/g" docusaurus.config.js
  sed -i '' "s/projectName: 'handpointecommdev.github.io'/projectName: 'handpointecomm.github.io'/g" docusaurus.config.js
  sed -i '' 's/handpoint.io/handpoint.com/g' src/pages/index.js
  sed -i '' 's/developer-ecomm.handpoint.io/developer-ecomm.handpoint.com/g' static/CNAME
else
  sed -i '' 's/handpoint.io/handpoint.com/g' docusaurus.config.js
  sed -i '' "s/developer-ecomm.handpoint.com/developer-ecomm.handpoint.io/g" docusaurus.config.js
  sed -i '' 's/includeCurrentVersion: false/includeCurrentVersion: true/g' docusaurus.config.js
  sed -i '' "s/organizationName: 'handpointecomm'/organizationName: 'handpointecommdev'/g" docusaurus.config.js
  sed -i '' "s/projectName: 'handpointecomm.github.io'/projectName: 'handpointecommdev.github.io'/g" docusaurus.config.js
  sed -i '' 's/handpoint.com/handpoint.io/g' src/pages/index.js
  sed -i '' 's/developer-ecomm.handpoint.com/developer-ecomm.handpoint.io/g' static/CNAME
fi