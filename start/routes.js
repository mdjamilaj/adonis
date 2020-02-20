'use strict'

const { validate } = use('Validator')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


// Route.on('/').render('login')





Route.group(() => {

    Route.get('/register', 'AuthController.registerview')
    Route.post('/registerstore', 'AuthController.register').validator('Register')
    // Route.post('/registerstore', 'AuthController.register')


    Route.get('/', 'AuthController.loginview')
    Route.post('/login', 'AuthController.login')

    })


Route.group(() => {
  Route.get('/index', 'UserController.index').as('users.index')
  Route.post('/logout', 'AuthController.destroy').as('logout')
  Route.post('/product_create', 'ProductController.create').as('product_create')
  Route.get('/delete/:id', 'ProductController.destroy')
  Route.get('/edit/:id', 'ProductController.edit')
  Route.get('/post', 'PostController.index').as('post.index')
}).middleware(['auth'])

  Route.get('/update/:id', 'ProductController.update')
