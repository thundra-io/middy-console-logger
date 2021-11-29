# middy-console-logger

Middy middleware for filtering logs printed over console logging methods (`trace`, `debug`, `info`, `log`, `warn`, `error`).
If the level of the console logging method is equal or bigger than configured level, the log is printed, Otherwise, it is ignored.

You can find the supported log levels and their orders in the following table:
| Log Level Name | Log Level  |
| -------------- | ---------- |
| NONE           |          0 |
| TRACE          |          1 |
| DEBUG          |          2 |
| INFO           |          3 |
| LOG            |          3 |
| WARN           |          4 |
| ERROR          |          5 |

**Note:** The default log level is `NONE` and which means that all the logs are printed by default 
if you don't configure any log level threshold.


## Installation

To install the middleware, you can use NPM:

```
npm install --save middy-console-logger
```

**Note:** Requires `@middy/core` version `2.0.0`+


## Usage

* Register `middy-console-logger` middleware in your handler:
```javascript
const middy = require('@middy/core');
const consoleLogger = require('middy-console-logger');

const handler = async(event, context) => {
  // Do something meaningful

  return {
    statusCode: 200,
  }
}

module.exports.handler = middy(handler).use(consoleLogger());
```

* Configure log level by *environment variable* or *options* passed to middleware:

  - **By environment variable:**
  Set `MIDDY_CL_LOG_LEVEL` environment variable to any supported log level.
  ```
  MIDDY_CL_LOG_LEVEL=INFO
  ```  

  - **By options:**
  Pass the log level through options.
  ```javascript
  const consoleLogger = require('middy-console-logger');

  module.exports.handler = middy(handler).use(consoleLogger({logLevel: 'INFO'}));
  ```


## Contributing

Everyone is very welcome to contribute to this repository. 
Feel free to [raise issues](https://github.com/serkan-ozal/middy-console-logger/issues) 
or to [submit Pull Requests](https://github.com/serkan-ozal/middy-console-logger/pulls).


## License

Licensed under [MIT License](LICENSE).
