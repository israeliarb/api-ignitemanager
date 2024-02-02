import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import ClientTag from 'App/Models/ClientTag'
import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
    public async index({ response }) {
        const clients = await Client.all()

        return response.ok(clients)
    }

    public async clientTags({ auth, params, response }) {
        const userAuth = await auth.use('api').authenticate()
        const client = await Client.find(params.id)

        const clientTags = await ClientTag.query()
        .where('client_id', client!.id)
        .orderBy('tag_id')
        
        return response.ok(clientTags)
    }

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

    public async show({ auth, params, response}) {
        const userAuth =  await auth.use('api').authenticate()
        const client = await Client.find(params.id)

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

    public async destroy({ auth, params, response }) {
        const userAuth =  await auth.use('api').authenticate()
        const client = await Client.find(params.id)

        const  transaction = await Database.transaction()

        try {
            await Database.from('client_tags').where('client_id', client!.id).delete()

            await client?.delete()

            await transaction.commit()

            return response.ok({ message: 'Cliente removido com sucesso'})
        } catch (error) {
            await transaction.rollback()
            return response.badRequest("Algo deu errado")
        }

    }
}
