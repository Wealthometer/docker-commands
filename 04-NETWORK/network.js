//this will download version 5 of mongodb image
docker pull mongo:5.0.1

//this will download version 5 of mongo-express
docker pull mongo-express

// this will create a docker network
docker network create mongo

// this will list all the networks on our system
docker network ls 

// this will inspect your docker network
docker network inspect mongo

// this will delete an existing network
docker network rm mongo


// this run a mongodb container and attach it to a network
docker run --name mongo -d --network mongo -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=secret mongo:5.0.1

// this will log you into the mongdb database from inside a container
mongosh -u root -p secret --authenticationDatabase admin

// this will run a mongo-express container while attaching it to a network
docker run --name mongo-express --network mongo -d -p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=root \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=secret \
-e ME_CONFIG_MONGODB_AUTH_DATABASE=admin \
-e ME_CONFIG_BASICAUTH_USERNAME=root \
-e ME_CONFIG_BASICAUTH_PASSWORD=secret \
-e ME_CONFIG_MONGODB_SERVER=mongo mongo-express

// this will the logs of your container
docker logs mongo


docker network connect mongo user-api 
docker network connect mongo dashboard-v1

docker network disconnect mongo user-api
docker network disconnect mongo dashboard-v1

