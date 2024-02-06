import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientTag from 'App/Models/ClientTag'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ClientTagsController {
    public async index({ response }) {
        const clientTags = await ClientTag.all()

        return response.ok(clientTags)
    }

    public async store({ request, response }: HttpContextContract) {
        const clientTagSchema = schema.create({
            client_id: schema.number(),
            tag_id: schema.number()
        })

        const payload = await request.validate({ schema: clientTagSchema })

        const clientTag = await ClientTag.create(payload)

        return response.ok({
            id: clientTag.id,
            client_id: clientTag.client_id,
            tag_id: clientTag.tag_id
        })
    }

    public async show({ auth, params, response }) {
        const userAuth = await auth.use('api').authenticate()
        const clientTag = await ClientTag.find(params.id)

        return response.ok({
            id: clientTag?.id,
            client_id: clientTag?.client_id,
            tag_id: clientTag?.tag_id
        })
    }

    public async destroy({ auth, params, response }: HttpContextContract) {
        const userAuth = await auth.use('api').authenticate()
        const clientTag = await ClientTag.find(params.id)

        const transaction = await Database.transaction()

        try {
            await clientTag?.delete()

            await transaction.commit()

            return response.ok({ message: 'Tag removido com sucesso' })
        } catch (error) {
            await transaction.rollback()
            return response.badRequest("Algo deu errado")
        }
    }
}
