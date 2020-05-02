# User Management System, Spring Boot, React, MySQL

The application structure is as follows.
- **server-side** - Service implemented using Spring boot. [More info](spring-boot-rest/README.md)
- **client-side** - A NodeJs application implemented using React. This consumes services hosted by server side.  [More info](react-rest/README.md)

#### 1) Build Server Side

```
$ cd spring-boot-rest
$ gradlew bootJar
$ gradlew bootRun
```

#### 2) Build and run client side

```
$ cd react-rest
$ npm start
```

### Access server side using following URL

```
http://localhost:8080
```

### Access application using following URL

```
http://localhost:3000
```