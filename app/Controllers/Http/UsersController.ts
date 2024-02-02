import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(UserValidator)

        const user = await User.create({
            name: payload.name,
            email: payload.email,
            type: payload.type,
            password: payload.password
        })

        return response.ok({
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
        })
    }

    public async update({ auth, request, response}: HttpContextContract) {
        const payload = await request.validate(UserValidator)
        const userAuth =  await auth.use('api').authenticate()

        const transaction = await Database.transaction()

        try{
            const user = await User.findByOrFail('id', userAuth.id)

            if (payload.password) {
                user.merge({
                    name: payload.name,
                    type: payload.type,
                    email: payload.email,
                    password: payload.password                    
                })
            } else {
                user.merge({
                    name: payload.name,
                    type: payload.type,
                    email: payload.email               
                })
            }

            await user.save()

            await transaction.commit()

            return response.ok({
                id: user.id,
                name: user.name,
                type: user.type,
                email: user.email,
                password: user.password
            })
        } catch (error) {
            await transaction.rollback()
            return response.badRequest("Algo deu errado")
        }
    }
}
