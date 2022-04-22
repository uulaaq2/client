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
        signIn: {
            path: '/signin',
            name: 'Sign in'
        },
        resetPassword: {
            path: '/resetpassword',
            name: 'Reset password'
        },
        drawings: { 
            path: '/drawings',
            name: 'Loop PDFs'
        }
    },
    api: {
        urls: {
            server: 'http://AUBOTD9X94HD2:3001',
            signIn: '/signin',
            verifyPassword: '/user/me/verifypassword',
            changePassword: '/user/me/changepassword',
            emailResetPasswordLink: '/user/me/emailpasswordresetlink',
            getDrawings: '/getdrawings',
            verifyToken: '/verifytoken'
        }
    }
}