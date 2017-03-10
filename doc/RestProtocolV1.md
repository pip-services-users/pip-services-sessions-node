# HTTP REST Protocol (version 1) <br/> Sessions Microservice

Sessions microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [Sessions class](#class1)
* [GET /sessions/:user_id](#operation1)
* [POST /sessions](#operation2)
* [POST /sessions/:user_id](#operation3)
* [DELETE /sessions/:user_id](#operation4)

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

### <a name="operation1"></a> Method: 'GET', route '/sessions/:user_id'

Retrieves all opened user sessions or a specified session.

**Parameters:** 
- user_id: string - unique user id
- session_id: string - (optional) unique session id

**Response body:**
Array of Session objects or Session object for specified session id or error

### <a name="operation2"></a> Method: 'POST', route '/sessions'

Opens a new user session and stores user information in it.

**Request body:**
- user: Object - user information
  - id: string - unique user id
  - name: string - full user name
- address: string - client address
- client: string - client application name
- data: Object - session data

**Response body:**
Created Session or error

### <a name="operation3"></a> Method: 'POST', route '/sessions/:user_id'

Stores user

**Parameters:** 
- user_id: string - unique user id
- session_id: string - unique session id

**Request body:**
- data: Object - session data

**Response body:**
Occurred error or null for success

### <a name="operation4"></a> Method: 'DELETE', route '/sessions/:user_id'

Closed user session either by session id or by address and client.

**Parameters:** 
- user_id: string - unique user id
- session_id: (optional) string - unique session id
- address: string - (optional) client address
- client: string - (optional) client application name

**Response body:**
Occurred error or null for success
