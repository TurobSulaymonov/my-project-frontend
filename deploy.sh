
#!/bin/bash


# PRODUCTION
#git reset --hard
#git checkout master
#git pull origin master

npm i yarn -g
yarn
yarn run build
pm2 start "yarn run start:prod" 


# DEVELOPMENT

#git checkout develop
#git pull origin develop

#npm i
#pm2 start "npm run start:dev" --name=BURAK

