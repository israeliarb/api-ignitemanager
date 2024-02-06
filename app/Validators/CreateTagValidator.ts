import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTagValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        name: schema.string({ trim: true }, [
            rules.minLength(3),
            rules.maxLength(255),
            rules.unique({ table: "tags", column: "name" }),
        ]),
        active: schema.boolean(),
    })

    public messages: CustomMessages = {
        required: "{{ field }} é obrigatório",
        "name.unique": "Nome já está em uso"
    }
}
