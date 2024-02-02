import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ auth, request, response}: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const user = await User.findBy("email", email)

            let expire

            switch (user?.type) {
                case 'user': expire = '30days'
                    break
                case 'admin': expire = '10days'
                    break
            }
            
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: expire,
                name: user?.serialize().email
            })

            response.ok(token)
        } catch {
            return response.badRequest("Credenciais Inválidas")
        }
    }

    public async logout({ auth, response}: HttpContextContract) {
        try {
            await auth.use('api').revoke()
        } catch {
            return response.unauthorized('Não autorizado')
        }

        return response.ok({
            revoked: true
        })
    }

    public async me({ auth, response}: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate();

        let data;

        switch (userAuth.type) {
            case 'admin':
                const admin = await User.findByOrFail('id', userAuth.id)
                data = {
                    user_id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    type: admin.type
                }
                break; 
            case 'user':
                const user = await User.findByOrFail('id', userAuth.id)
                data = {
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                    type: user.type
                }
                break; 
        }
        return response.ok(data)
    }

}
