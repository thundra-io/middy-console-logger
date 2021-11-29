const CONSOLE_METHODS = ['trace', 'debug', 'info', 'log', 'warn', 'error']
const LOG_LEVELS = {
    NONE: 0,
    TRACE: 1,
    DEBUG: 2,
    INFO: 3,
    LOG: 3,
    WARN: 4,
    ERROR: 5,
}

const consoleLoggerMiddleware = (opts = {}) => {
    const configuredLogLevelName =
        process.env['MIDDY_CL_LOG_LEVEL'] || (opts && opts.logLevel)
    const configuredLogLevel =
        configuredLogLevelName && LOG_LEVELS[configuredLogLevelName]
            ? LOG_LEVELS[configuredLogLevelName]
            : LOG_LEVELS.NONE

    const patchConsole = () => {
        const consoleRef = console
        CONSOLE_METHODS.forEach((method) => {
            const consoleMethod = consoleRef[method]

            // Check whether console method is valid and/or patched before
            if (!consoleMethod || consoleMethod._middy_cl) {
                return
            }

            const logLevelName = method.toUpperCase()
            const logLevel = LOG_LEVELS[logLevelName]
                ? LOG_LEVELS[logLevelName]
                : LOG_LEVELS.NONE
            const originalConsoleMethod = consoleRef[method].bind(console)

            const wrapperConsoleMethod = (...args) => {
                if (logLevel >= configuredLogLevel) {
                    originalConsoleMethod.apply(console, args)
                }
            }

            // Mark console method to prevent further double patching
            Object.defineProperty(wrapperConsoleMethod, '_middy_cl', {
                value: true,
                writable: false,
            })
            consoleRef[method] = wrapperConsoleMethod
        })
    }

    const consoleLoggerMiddlewareBefore = async (request) => {
        // TODO Implement buffering
    }

    const consoleLoggerMiddlewareAfter = async (request) => {
        // TODO Flush buffered logs if the condition meets (for ex. took more than threshold)
    }

    const consoleLoggerMiddlewareOnError = async (request) => {
        // TODO Flush buffered logs if the condition meets (for ex. failed with error)
    }

    patchConsole()

    return {
        before: consoleLoggerMiddlewareBefore,
        after: consoleLoggerMiddlewareAfter,
        onError: consoleLoggerMiddlewareOnError,
    }
}

module.exports = consoleLoggerMiddleware
