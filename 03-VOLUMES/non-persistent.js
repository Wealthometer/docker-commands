// run a container while issuing a command to it to create and display contents of a file
docker run bash bash -c "echo foo > bar.txt && cat bar.txt" 


// view the contents of the same container after logging into the container
docker run bash bash -c "cat bar.txt" 


// BIND MOUNT
// GO TO DESKTOP FOLDER AND CREATE A BIND MOUNT FOLDER
mkdir bind-mount
docker run -v $PWD
echo $PWD

docker run -v $PWD:/tmp bash \
bash -c "echo foo > /tmp/bar.txt && cat /tmp/bar.txt"

// double check to see the information is on the host
ls

// check the contents of that file
cat bar.txt

// run a new container and check if the file is still present
docker run -v $PWD:/tmp bash \
bash -c "cat /tmp/bar.txt"

//mount a bootstrap website to a running container via volumes
docker run --name dashboard \
-v "$PWD:/usr/share/nginx/html" -d -p 8080:80 nginx