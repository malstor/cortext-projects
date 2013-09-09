FROM ubuntu:12.10

RUN apt-get install -y curl git

RUN curl https://install.meteor.com | /bin/sh

RUN mkdir /var/www/
RUN mkdir /var/www/cortext-projects

ADD . /var/www/cortext-projects

EXPOSE 3000:3000

WORKDIR /var/www/cortext-projects

CMD meteor