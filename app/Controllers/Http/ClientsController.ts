import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
    public async store({ auth, request, response }: HttpContextContract) {
        const payload = await request.validate(ClientValidator)

        const userAuth = await auth.use('api').authenticate()

        const client = await Client.create({
            name: payload.name,
            email: payload.email,
            created_by: userAuth?.id,
            last_update_by: userAuth?.id
        })

        return response.ok(client)
    }

    public async update({ params, request, response, auth }: HttpContextContract) {
        const payload = await request.validate(ClientValidator)
        const userAuth = await auth.use('api').authenticate()
        const client = await Client.find(params.id)

        const  transaction = await Database.transaction()

        try {
            client?.merge({
                name: payload.name,
                email: payload.email,
                last_update_by: userAuth.id
            })

            await client?.save()

            await transaction.commit()

            return response.ok({
                id: client?.id,
                name: client?.name,
                email: client?.email,
                last_update_by: client?.last_update_by
            })            
        } catch (error) {
            await transaction.rollback();
            return response.badRequest("Algo deu errado");
        }
    }

    public async destroy({ params, response }) {
        const client = await Client.find(params.id)

        const  transaction = await Database.transaction()

        try {
            await Database.from('client_tags').where('client_id', client!.id).delete()

            await client?.delete()

            await transaction.commit()
        } catch (error) {
            await transaction.rollback();
            return response.badRequest("Algo deu errado");
        }

    }
}
