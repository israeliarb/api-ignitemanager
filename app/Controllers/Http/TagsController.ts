import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Tag from 'App/Models/Tag'
import CreateTagValidator from 'App/Validators/CreateTagValidator'
import EditTagValidator from 'App/Validators/EditTagValidator'

export default class TagsController {
    public async index({ response }) {
        const tags = await Tag.all()

        return response.ok(tags)
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateTagValidator)

        const tag = await Tag.create({
            name: payload.name,
            active: payload.active
        })

        return response.ok(tag)
    }

    public async show({ auth, params, response }) {
        const userAuth = await auth.use('api').authenticate()
        const tag = await Tag.find(params.id)

        return response.ok(tag)
    }

    public async update({ params, request, response }: HttpContextContract) {
        const payload = await request.validate(EditTagValidator)
        const tag = await Tag.find(params.id)

        const transaction = await Database.transaction()

        try {
            tag?.merge({
                name: payload.name,
                active: payload.active
            })

            await tag?.save()

            await transaction.commit()

            return response.ok({
                id: tag?.id,
                name: tag?.name,
                active: tag?.active
            })
        } catch (error) {
            await transaction.rollback();
            return response.badRequest('Algo deu errado')
        }
    }
}
