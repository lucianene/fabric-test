# FROM node:latest as node_base
FROM php:8.0-fpm

# COPY --from=node_base . . 

# Set working directory
WORKDIR "/application"

# Install dependencies for the operating system software
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    zip \
    vim \
    git \
    curl

# Install extensions for php
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install gd

# Install composer (php package manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Nodejs
RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n latest

# Assign permissions of the working directory to the www-data user
# RUN chown -R www-data:www-data \
#     /var/www/html/storage \
#     /var/www/html/bootstrap/cache


# Expose port 9000 and start php-fpm server (for FastCGI Process Manager)
EXPOSE 9000
CMD ["php-fpm"]