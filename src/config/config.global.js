module.exports = {
    showClientDevelopmentErros: true,
    cookieExpiresIn: 14,
    app: {
        name: 'IBOS'
    },
    urls: {
        home: {
            link: '/',
            name: 'Home'
        },
        signin: {
            link: '/signin',
            name: 'Sign in'
        }
    },
    api: {
        urls: {
            signin: "/signin"
        }
    }
}