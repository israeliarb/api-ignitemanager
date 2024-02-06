import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: "users", column: "email" }),
    ]),
    type: schema.string({ trim: true }),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(180)]),
  })

  public messages: CustomMessages = {
    required: "{{ field }} é obrigatório",
    "email.email": "{{ field }} deve ser um email válido",
    "email.unique": "{{ field }} já está em uso",
    "password.minLength": "{{ field }} deve ter no mínimo 6 caracteres",
    "password.maxLength": "{{ field }} deve ter no máximo 180 caracteres"
  }
}
