FROM ubuntu:12.10

# REPOS

RUN apt-get install -y -q software-properties-common
RUN add-apt-repository -y "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) universe"
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list
RUN apt-get -y update

#TOOLS
RUN apt-get install -y -q curl git make wget

#BUILD
RUN apt-get install -y -q build-essential g++

## MONGO
RUN apt-get install -y -q mongodb-10gen

#METEOR
RUN curl https://install.meteor.com | /bin/sh

#SHIMS
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -s /bin/true /sbin/initctl
ENV DEBIAN_FRONTEND noninteractive

#VOLUME ["server"]

RUN mkdir -p /server/cortext-projects
ADD . /server/cortext-projects
RUN chown root:root -R /server/cortext-projects
RUN rm -rf /server/cortext-projects/.meteor/local/build

WORKDIR /server/cortext-projects/private/api
CMD npm install

#PORTS
EXPOSE 3000:3000
EXPOSE 8080:8080

WORKDIR /server/cortext-projects
CMD start.sh