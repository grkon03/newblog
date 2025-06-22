# build image
FROM golang:1.24-alpine3.22 AS Builder

WORKDIR /go/src/app

COPY ./go.* ./
RUN go mod download
COPY . .
RUN go build -o backend .

# work image
FROM alpine:3.22

WORKDIR /app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY --from=Builder /go/src/app/backend ./

ENTRYPOINT dockerize -timeout 60s -wait tcp://sql:3306 ./backend