# build environment
FROM node:17-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Install react-scripts globally
RUN npm install react-scripts@5.0.1 -g --silent

# Copy the rest of the code
COPY . ./

# Build the app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Only copy nginx.conf if you actually have it in your project root
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# # build environment
# FROM node:17-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json .
# RUN npm install react-scripts@5.0.1 -g --silent
# COPY . .
# CMD ["npm", "run", "build"]

# # production environment
# FROM nginx
# COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
