const EventEmitter = require('events')

/**
 * Used for logging info to remote service
 * const logger = require('./logger')
 * logger.logMessage('logging this message')
 * logger.addListener('onLogged', status => console.log(status))
 * logger.addListener('onError', error => console.log(error))
 */
class Logger extends EventEmitter {
    constructor() {
        super();
        this._url = 'https://'
    }

    async logMessage(message) {
        try {
            const logStatus = await this._log(message);
            if (logStatus && logStatus.id) this.emit('onLogged', logStatus);
            else this.emit('onError', {message: 'error'});
        } catch(err) {
            console.log(err)
            this.emit('onError', null);
        }
    }

    _log(/*message*/) {
        return new Promise((resolve, reject) => {
            // perform log operations here
            const status = Math.floor(Math.random() * 10)
            console.log('here', status)
            status > 2 ? resolve({id: 1, logUrl: 'https://'}) : reject(null);
        })
    }
}

module.exports = new Logger();
