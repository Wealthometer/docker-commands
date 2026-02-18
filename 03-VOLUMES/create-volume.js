// this will load the documentation for docker volumes
docker volume --help

//this will create a volume
docker volume create shola

// this will list all volumes
docker volume ls

// this will inspect the volume
docker volume inspect shola

//mount a bootstrap website to a running container via volumes that has been created
docker run --name dashboard \
-v shola:/usr/share/nginx/html -d -p 8080:80 nginx


