# ################################################################
#  Copyright 2019-20
# 
# ################################################################
# Using latest LTS version running on alpine
FROM node:12.13.0-alpine

# Will remain same for all containers.
# Version will be changed during CI/CD process
LABEL maintainer="AionDigital"
LABEL version="0.1.0 (alpha)"
LABEL description="Container for running conduit service component"

# Setting environemnt variables
# These variables will be different from application to application
ENV ENV_CDT_PORT=4000 \
    NODE_ENV=development \
    ENV_CDT_ENTITY=customers

# Expose port 4000 to the host     
EXPOSE 4000

# Working directory on which application binaries will be copied
WORKDIR /conduit/

# Copy all content from this folder (including subfolders)
# to a specific folder on the container
COPY . .

# Provide require authorities and run npm install
RUN chown -R node:node /conduit && \
        chmod 770 -R /conduit && \
        npm install

# Set user node for future commands
USER node

# RUN following command
CMD npm run start:prod
