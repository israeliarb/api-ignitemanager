import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import EditUserValidator from 'App/Validators/EditUserValidator'

export default class UsersController {
    public async index({ response }) {
        const users = await User.all()

        return response.ok(users)
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateUserValidator)

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

    public async show({ auth, params, response }) {
        //const userAuth =  await auth.use('api').authenticate()
        const user = await User.find(params.id)

        return response.ok(user)
    }

    public async update({ auth, request, response }: HttpContextContract) {
        const payload = await request.validate(EditUserValidator)
        const userAuth = await auth.use('api').authenticate()

        const transaction = await Database.transaction()

        /*const userSchema = schema.create({
            name: schema.string(),
            email: schema.string(),
            password: schema.string(),
        })*/

        //const passwordPayload = await request.validate({ schema: userSchema })

        try {
            const user = await User.findByOrFail('id', userAuth.id)

            if (payload.password != ' ') {
                user.merge({
                    name: payload.name,
                    email: payload.email,
                    password: payload.password
                })
            } else {
                user.merge({
                    name: payload.name,
                    email: payload.email,
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

    public async destroy({ auth, params, response }) {
        const userAuth = await auth.use('api').authenticate()
        const user = await User.find(params.id)

        const transaction = await Database.transaction()

        try {
            await user?.delete()

            await transaction.commit()

            return response.ok({ message: 'Usuário removido com sucesso' })
        } catch (error) {
            await transaction.rollback()
            return response.badRequest("Algo deu errado")
        }

    }
}
