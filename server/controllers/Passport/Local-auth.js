const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { pool } = require('../../models/database')
const bcryptjs = require('bcryptjs')


passport.serializeUser((user, done) => {
    done(null, user.mail)
})

passport.deserializeUser(async(id, done) => {
    //search by id
    const user = await pool.query(`SELECT * FROM users WHERE mail = '${id}'`)
    done(null, user)
})

// =========================== REGISTER =================================

passport.use('local-register', new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async(req, mail, contraseña, done) => {

    let passwordHash = await bcryptjs.hash(contraseña, 8)

    try {

        let user = { mail: req.body.mail, nombre: req.body.nombre }

        let insert = await pool.query(`INSERT INTO users (nombre, apellido, direccion, mail, "contraseña", metodo_registro, telefono, fecha_nacimiento)  VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.direccion}', '${req.body.mail}', '${passwordHash}', 'Local', '${req.body.telefono}', '${req.body.fecha_nacimiento}');`)

        done(null, user, { message: 'Usuario creado exitosamente' })

    } catch (err) {
        console.log(err);
    }


}))

// =========================== LOGIN =================================

passport.use('local-login', new LocalStrategy({
        usernameField: 'mail',
        passwordField: 'contraseña',
        passReqToCallback: true
    },
    async(req, mail, contraseña, done) => {

        let loggedUser = await pool.query(`SELECT * FROM users WHERE mail = '${mail}'`)
        loggedUser = loggedUser.rows[0]

        if (!loggedUser) {
            return done(null, false, { message: 'No existe ningún usuario con ese email' })
        } else {
            if (await bcryptjs.compare(contraseña, loggedUser.contraseña)) {
                return done(null, loggedUser)
            } else {
                return done(null, false, { message: 'La contraseña ingresada es incorrecta' })
            }
        }
    }))