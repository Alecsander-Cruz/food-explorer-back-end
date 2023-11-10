const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const checkUserExist = await knex("users")
            .select()
            .where({ email })
            .first();

        if (checkUserExist) {
            throw new AppError("Este email já está em uso.");
        }

        const hashedPassword = await hash(password, 10);

        await knex("users").insert({
            name,
            email,
            password: hashedPassword
        });

        return response.status(201).json();
    }
}

module.exports = UsersController;
