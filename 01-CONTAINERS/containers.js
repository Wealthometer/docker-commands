// this will check whether your docker CLI is enabled
docker --version

// this will list flags can you can attach to your docker command
docker

// this will display all containers
docker ps -a
docker container ls --all

// this will display the current running containers
docker ps
docker container ls

// this will run a docker container
docker run -d -p 80:80 docker/getting-started
docker run -d -p 80:80 -p 3000:80 -p 8081:80 docker/getting-started

// this will run the container and add a custom container name
docker run --name omatsolas-container -d -p 80:80 docker/getting-started


// this will run and start and existing container
docker start dashboard
docker start 3ae049fd

// this will stop a docker container
docker stop 3ae049fd
docker stop affectionate_williams

// this will delete a docker container
docker rm 3ae049fd
docker rm affectionate_williams
docker rm -f 3ae049fd


// this will inspect a container 
docker container inspect affectionate_williams
docker container inspect 3ae049fd

// this will switch to the interactive linux shell inside of your container
docker exec -it 636a99c5b5 sh
docker exec -it suspicious_bash sh

// do ls after you log in
docker container logs 4800f90e576b
docker container logs suspicious_bash
docker logs 4800f90e576b
docker logs suspicious_bash

// generates a sample template for generating docker ps better
export FORMAT="ID\t{{.ID}}\nNAME\t{{.Names}}\nIMAGE\t{{.Image}}\nPORTS\t{{.Ports}}\nCOMMAND\T{{.Command}}\nCREATED\t{{.CreatedAt}}\nSTATUS\t{{.Status}}\n"

// runs the ps command using the above format
docker ps --format "$FORMAT"

// THIS WILL REMOVE ALL RUNNING CONTAINERS 
docker container rm -v -f $(docker container ls -aq)