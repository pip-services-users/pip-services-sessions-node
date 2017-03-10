# Seneca Protocol (version 1) <br/> Sessions Microservice

Sessions microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8807, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'sessions',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [Session class](#class1)
* [cmd: 'get_sessions'](#operation1)
* [cmd: 'load_session'](#operation2)
* [cmd: 'open_session'](#operation3)
* [cmd: 'store_session_data'](#operation4)
* [cmd: 'close_session'](#operation5)
* [cmd: 'delete_session'](#operation6)

## Data types

### <a name="class1"></a> Session class

Represents an open user session

**Properties:**
- id: string - unique session id
- opened: Date - date and time when session was opened
- last_request: Date - date and time when last request was processed
- address: string - client address
- client: string - client application name
- user: Object - information about user
- data: Object - session data

## Operations

### <a name="operation1"></a> Cmd: 'get_sessions'

Retrieves all opened user sessions.

**Arguments:** 
- user_id: string - unique user id

**Returns:**
- err: Error - occured error or null for success
- result: [Session] - all opened user sessions

### <a name="operation2"></a> Cmd: 'load_session'

Load opened user session by user id and session id.

**Arguments:** 
- user_id: string - unique user id
- session_id: string - unique session id

**Returns:**
- err: Error - occured error or null for success
- result: Session - open user session or null if session wasn't found

### <a name="operation3"></a> Cmd: 'open_session'

Opens a new user session and stores user information in it.

**Arguments:** 
- user: Object - user information
  - id: string - unique user id
  - name: string - full user name
- address: string - client address
- client: string - client application name
- data: Object - (optional) session data

**Returns:**
- err: Error - occured error or null for success
- result: Session - newly opened user session or existing session if it was already opened for the same address and client

### <a name="operation4"></a> Cmd: 'store_session_data'

Load opened user session by user id and session id.

**Arguments:** 
- user_id: string - unique user id
- session_id: string - unique session id
- data: Object - session data

**Returns:**
- err: Error - occured error or null for success

### <a name="operation5"></a> Cmd: 'close_session'

Closes previously opened user session from specified host and client application

**Arguments:** 
- user_id: string - unique user id
- address: string - client address
- client: string - client application name

**Returns:**
- err: Error - occured error or null for success

### <a name="operation6"></a> Cmd: 'delete_session'

Closes session by specified user and session ids.

**Arguments:** 
- user_id: string - unique user id
- session_id: string - unique session id

**Returns:**
- err: Error - occured error or null for success

