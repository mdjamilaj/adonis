'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    products(){
        return this.belongsToMany('App/Models/Product', 'product_id');
    }
}

module.exports = Category
