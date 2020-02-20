'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    categorys(){
        return this.belongsToMany('App/Models/Category', 'category_id');
    }
}

module.exports = Product
