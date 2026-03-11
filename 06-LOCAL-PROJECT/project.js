// STEP 1 TEST ALL 3 API ENDPOINTS
node server.js
npm run start

// STEP 2 BUILD 2 IMAGES FOR THE 2 MICROSERVICES
docker image build -t node-customer-service:latest .
docker image build -t node-order-service:latest .
docker image build -t node-frontend:latest .

// STEP 3 RUN THE 3 IMAGES AS DOCKER CONTAINERS
//ORDER MICROSERVICE
docker run -d --name node-order-service --network microservices-network \
-p 8081:8081 -e PORT=8081 -e APP_NAME=ORDER-SERVICE node-order-service:latest

//CUSTOMER MICROSERVICE
docker run -d --name customer-service --network microservices-network \
-p 8080:8080 -e PORT=8080 -e APP_NAME=CUSTOMER-SERVICE \
-e ORDER_SERVICE=order-service:8081 node-customer-service:latest

// REACT FRONTEND
docker run -d --name react-frontend --network microservices-network \
-p 3000:80 react-frontend:latest


// STEP 4 CREATE 2 REPOSITORIES ON DOCKER HUB SETUP DOCKER TAGS 
// WHICH WILL BE PUSHED TO YOUR DOCKER HUB ACCOUNT
docker tag node-customer-service:latest tsola2002/node-customer-service:latest
docker tag node-order-service:latest tsola2002/node-order-service:latest

docker push tsola2002/node-customer-service:latest
docker push tsola2002/node-order-service:latest

