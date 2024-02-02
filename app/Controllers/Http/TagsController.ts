import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Tag from 'App/Models/Tag'
import TagValidator from 'App/Validators/TagValidator'

export default class TagsController {
    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(TagValidator)

        const tag = await Tag.create({
            name: payload.name,
            active: payload.active
        })

        return response.ok(tag)
    }

    public async update({ params, request, response}: HttpContextContract) {
        const payload = await request.validate(TagValidator)
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
