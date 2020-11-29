FROM node:12

ENV APPDIR /opt/covid-health-register

WORKDIR /opt/covid-health-register

COPY *.json $APPDIR/

COPY src/ $APPDIR/src

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]