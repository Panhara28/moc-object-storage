FROM node:22.21.0

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Declaring all arg to use for env in build time
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ADMIN_TITLE
ARG NEXT_PUBLIC_API_ADMIN_LOGO
# Declaring env from the arg value
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_ADMIN_TITLE=${NEXT_PUBLIC_ADMIN_TITLE}
ENV NEXT_PUBLIC_API_ADMIN_LOGO=${NEXT_PUBLIC_API_ADMIN_LOGO}

# Building app
RUN npm run build

# Running the app
CMD ["npm", "run", "start"]