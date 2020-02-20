'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    profile () {
        return this.hasOne('App/Models/Profile')
    }
    posts () {
        return this.hasMany('App/Models/Post')
    }
}

module.exports = User
