//install docker extension

// this will access the documentation of the command 
docker image --help

// this will display all images
docker image ls

// this will delete an image from your docker instance
docker image rm nginx   
docker image rm -f nginx
docker rmi nginx

// this will download an image from docker hub registry
docker pull nginx

// this will inspect a docker image
docker image inspect nginx

// this will interactively create an image
docker container run -it --name sample alpine:3.17 sh
// this will interactively create an image and log into the container environment
docker container run -it \
--name sample alpine:3.17 sh

// this will update the linux operating system and install curl tool
apk update && apk add curl

// we are using the curl tool to return the header response of google.com
curl -I https://google.com

// this will list and search through the images for sample
docker container ls -a | grep sample

// this will show changes that have been made in our container concerning our base image
docker container diff sample

// this will generate a new image from the base image
docker container commit sample my-alpine


// this will build a custom docker image
docker build -t fancy-portfolio .

docker image ls

// this will run a container from your custom image
docker run --name new-portfolio -d -p 8080:80 fancy-portfolio
docker run --name wealth-container -d  -p 8080:8080 customer-app          

// setting up tags that will be pushed to docker hub
docker tag omatsola-portfolio:latest tsola2002/omatsolas-nginx-repo:latest

// this will push our image to docker hub
docker push tsola2002/omatsolas-nginx-repo:latest

// this will export an existing image
docker image save -o ./backup/my-alpine.tar my-alpine

// this import an existing image 
docker image load -i ./backup/my-alpine.tar


// login to the container and check the files out
docker exec -it dashboard sh

// this will export an existing image to a backup tar file
docker image save -o ./backup/my-alpine.tar my-alpine

// this will import an existing image from a backup tar file
docker image load -i ./backup/backup-portfolio.tar





// this run someone elses image
docker run --name sample-container -d -p 8080:80 tsola2002/omatsolas-nginx-repo:latest

// this will build a docker image with a different tag from a dockerfile for us
docker image build -t omatsola-portfolio:pink-website .

// this will setup a new tag that will be pushed to docker hub
docker tag omatsola-portfolio:new-version tsola2002/omatsolas-nginx-repo:new-version
