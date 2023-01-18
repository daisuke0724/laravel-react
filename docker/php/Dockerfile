FROM php:8.1-fpm-bullseye AS base

WORKDIR /var/www/html

ARG NODE_VERSION=16

ENV TZ=UTC
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME=/composer

RUN apt-get update \
  && apt-get -y install --no-install-recommends \
    locales \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    libonig-dev \
  && rm -rf /var/lib/apt/lists/* \
  && locale-gen en_US.UTF-8 \
  && localedef -f UTF-8 -i en_US en_US.UTF-8 \
  && docker-php-ext-install \
    intl \
    pdo_mysql \
    zip \
    bcmath \
  && php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer \
  && curl -sLS https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
  && apt-get install -y nodejs \
  && apt-get -y autoremove \
  && apt-get clean \
  && composer config -g process-timeout 3600 \
  && composer config -g repos.packagist composer https://packagist.org

FROM base AS development

COPY ./docker/php/php.development.ini /usr/local/etc/php/php.ini

FROM development AS development-xdebug

RUN pecl install xdebug && \
  docker-php-ext-enable xdebug

COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

FROM base AS production

COPY ./docker/php/php.production.ini /usr/local/etc/php/php.ini
COPY ./src /var/www/html

RUN composer install -q -n --no-ansi --no-dev --no-scripts --no-progress --prefer-dist \
  && chmod -R 777 storage bootstrap/cache \
  && php artisan optimize:clear \
  && php artisan optimize
