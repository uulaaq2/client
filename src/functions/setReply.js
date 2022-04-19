const showClientDevelopmentErros = require('../config').showClientDevelopmentErros

const setSuccess = (data = null) => {
    let reply ={
        status: 'ok'
    }
    if (data) {
        if (typeof(data) === 'object') {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                   reply[key] = data[key]                   
                }
            }
        }        

        if (typeof(data) === 'array') {            
            reply.data = data
        }
    }       

    return reply
}

const setWarning = (message = '') => {
    return {
        status: 'warning',
        message: message
    }
}

const setCustom = (status, message = '')  => {
    let reply = {
        status,
        message
    }

    return reply
}

const setError = (error) => {
    let reply = {
        status: 'error',
        message: error.message
    }

    if (showClientDevelopmentErros) {
        reply.stack = error.stack
    }

    return reply
}

module.exports = {
    setSuccess,
    setWarning,
    setCustom,
    setError
}