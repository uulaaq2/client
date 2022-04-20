module.exports = {
    showClientDevelopmentErros: true,
    cookieExpiresIn: 14,
    app: {
        name: 'IBOS'
    },
    urls: {
        home: {
            path: '/',
            name: 'Home'
        },
        signin: {
            path: '/signin',
            name: 'Sign in'
        }
    },
    api: {
        urls: {
            signIn: '/signin',
            verifyPassword: '/user/me/verifypassword',
            changePassword: '/user/me/changepassword'
        }
    }
}