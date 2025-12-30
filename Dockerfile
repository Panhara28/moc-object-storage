FROM node:22.21.0

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Required env/args (others can be injected at runtime if needed)
ARG DATABASE_URL
ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE_NAME
ARG SIGNING_SECRET
ARG JWT_SECRET
ARG SECRET_ENCRYPTION_KEY
ARG STORAGE_ROOT
ARG STORAGE_PUBLIC_BASE_URL
ARG NODE_ENV=production

ENV DATABASE_URL=${DATABASE_URL}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_DATABASE_NAME=${DB_DATABASE_NAME}
ENV SIGNING_SECRET=${SIGNING_SECRET}
ENV JWT_SECRET=${JWT_SECRET}
ENV SECRET_ENCRYPTION_KEY=${SECRET_ENCRYPTION_KEY}
ENV STORAGE_ROOT=${STORAGE_ROOT}
ENV STORAGE_PUBLIC_BASE_URL=${STORAGE_PUBLIC_BASE_URL}
ENV NODE_ENV=${NODE_ENV}

# Generate Prisma client after source is available
RUN npx prisma generate

# Building app
RUN npm run build

# Running the app
CMD ["npm", "run", "start"]
