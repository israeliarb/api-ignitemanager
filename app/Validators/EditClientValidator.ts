import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditClientValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        name: schema.string({ trim: true }, [
            rules.minLength(3),
            rules.maxLength(255),
        ]),
        email: schema.string({ trim: true }, [
            rules.email(),
            rules.maxLength(255),
        ]),
    })

    public messages: CustomMessages = {
        required: "{{ field }} é obrigatório",
        "email.email": "{{ field }} deve ser um email válido",
        "email.unique": "{{ field }} já está em uso",
    }
}
