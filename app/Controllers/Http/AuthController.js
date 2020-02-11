 //../app/Controllers/Http/AuthController.js
'use strict'
const User = use('App/Models/User');
const Hash = use('Hash')
const { validate } = use('Validator')

class AuthController {

	async register({request, auth, session, response}) {


		// let user = await User.create(request.all())


			const user = await User.create({
				username: request.input('username'),
				email: request.input('email'),
				contact: request.input('contact'),
				password: await Hash.make(request.input('password'))
			})

			session.flash({ successMessage: 'You have registered successfully!' })
			return response.redirect('/login')
	
	}
	




	async login({request, auth, session, view, response}) {

		await auth.attempt(request.input('email'), request.input('password'))

		session.flash({ successMessage: 'You have logged in successfully!' })
		return response.route('users.index')



		// successlogin

		// const { email, password } = request.all()


		// 	const loginMessage = {
		// 		success: 'Logged-in Successfully!',
		// 		error: 'Email and password Not Match!!!'
		// 	}

		// 	if(await auth.attempt(email, password)){
		// 		return view.render('/index', { success: loginMessage.success })
		// 	}else{
		// 		await view.render('login', { error: loginMessage.error })
		// 	}


		// successEnd
	

        // // Attempt to login with email and password
		// const authCheck = await auth.attempt(email, password)
		// // console.log("authCheck");
        // if (authCheck) {
        //     return response.redirect('/index')
		// }
		
		// else{
		// 	console.log("loginMessage.error");
		// }
		// console.log(loginMessage.error);
        // await view.render('login', { error: loginMessage.error })
	}





	async loginview ({ request, response, view}){
		return view.render("login.edge");
	}

	async registerview ({ request, response, view}){
		return view.render('registration.edge')
	}


	async destroy ({ params, view, auth, request, response }) {

		await auth.logout()

		return view.render('login.edge')
	}

}
module.exports = AuthController