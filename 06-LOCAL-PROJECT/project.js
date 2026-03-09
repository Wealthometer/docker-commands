// STEP 1 TEST ALL 3 API ENDPOINTS
node server.js
npm run start

// STEP 2 BUILD 2 IMAGES FOR THE 2 MICROSERVICES
docker image build -t node-customer-service:latest .
docker image build -t node-order-service:latest .
docker image build -t node-frontend:latest .

// STEP 3 RUN THE 2 IMAGES AS DOCKER CONTAINERS
docker run --name node-customer-service -d -p 8080:8080 customer-service:latest
docker run --name node-order-service -d -p 8081:8081 order-service:latest


// STEP 4 CREATE 2 REPOSITORIES ON DOCKER HUB SETUP DOCKER TAGS 
// WHICH WILL BE PUSHED TO YOUR DOCKER HUB ACCOUNT
docker tag node-customer-service:latest tsola2002/node-customer-service:latest
docker tag node-order-service:latest tsola2002/node-order-service:latest

docker push tsola2002/node-customer-service:latest
docker push tsola2002/node-order-service:latest

