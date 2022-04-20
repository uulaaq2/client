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
        },
        resetPassword: {
            path: '/resetpassword',
            name: 'Reset password'
        }
    },
    api: {
        urls: {
            signIn: '/signin',
            verifyPassword: '/user/me/verifypassword',
            changePassword: '/user/me/changepassword',
            emailResetPasswordLink: '/user/me/emailpasswordresetlink'
        }
    }
}