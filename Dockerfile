FROM ubuntu:12.10

RUN apt-get install -y curl git

RUN curl https://install.meteor.com | /bin/sh

#VOLUME ["server"]

RUN mkdir /server
RUN mkdir /server/cortext-projects
ADD . /server/cortext-projects
RUN chown root:root -R /server/cortext-projects
RUN rm -rf /server/cortext-projects/.meteor/local/build

EXPOSE 3000:3000

WORKDIR /server/cortext-projects

CMD meteor