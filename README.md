# Sessions Microservice

This is user sessions microservice from Pip.Services library. 
It opens and closes user sessions and stores sessiond data. 

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-settings-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class SessionV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public user_id: string;
    public user_name: string;
    
    /* Session info */
    public active: boolean;
    public open_time: Date;
    public close_time: Date;
    public request_time: Date;
    public address: string;
    public client: string;

    /* Cached content */
    public user: any;
    public data: any;
}

interface ISessionsV1 {
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SessionV1>) => void): void;
    
    getSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void;

    openSession(correlationId: string, user_id: string, user_name: string,
        address: string, client: string, user: any, data: any,
        callback: (err: any, session: SessionV1) => void): void;
    
    storeSessionData(correlationId: string, sessionId: string, data: any,
        callback: (err: any, session: SessionV1) => void): void;
    
    closeSession(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void;

    deleteSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-users/pip-services-sessions-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-sessions:persistence:file:default:1.0"
  path: "./data/sessions.json"

- descriptor: "pip-services-sessions:controller:default:default:1.0"

- descriptor: "pip-services-sessions:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-sessions-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-sessions-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.SessionsHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Opens user session
client.openSession(
    null,
    '123', // User id
    'Test User' // User name
    '192.168.1.1', // Address
    'Test Client', // Client
    null, // Session data
    function (err, session) {
        ...
    }
);
```

```javascript
// Get user sessions
client.getSessions(
    null,
    null,
    function(err, sessions) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

