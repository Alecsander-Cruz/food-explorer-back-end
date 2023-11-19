const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
    async create(request, response) {
        const { name, category, price, description, ingredients } =
            request.body;

        const [dish_id] = await knex("dishes").insert({
            name,
            category,
            price,
            description
        });

        const ingredientsInsert = ingredients.map(name => {
            return {
                dish_id,
                name
            };
        });

        await knex("ingredients").insert(ingredientsInsert);

        response.json(dish_id);
    }

    async index(request, response) {
        const { name, ingredients } = request.query;

        let dishes;

        if (ingredients) {
            const filterIngrendients = ingredients
                .split(",")
                .map(ingredient => ingredient.trim());

            dishes = await knex("ingredients")
                .select(["dishes.id", "dishes.name"])
                .whereLike("dishes.name", `%${name}%`)
                .whereIn("ingredients.name", filterIngrendients)
                .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
                .orderBy("dishes.name")
                .groupBy("dishes.id");
        } else {
            dishes = await knex("dishes")
                .whereLike("name", `%${name}%`)
                .orderBy("name");
        }

        const allIngredients = await knex("ingredients").select();
        const dishesWithIngredients = dishes.map(dish => {
            const dishIngredients = allIngredients.filter(
                ingredient => ingredient.dish_id === dish.id
            );

            return {
                ...dish,
                ingredients: dishIngredients
            };
        });

        return response.json(dishesWithIngredients);
    }

    async show(request, response) {
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();
        const ingredients = await knex("ingredients")
            .where({ dish_id: id })
            .orderBy("name");

        return response.json({
            ...dish,
            ingredients
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.json();
    }

    async update(request, response) {
        const { name, category, price, description, ingredients } =
            request.body;

        const { id: dish_id } = request.params;

        const [dish] = await knex("dishes")
            .select()
            .where("dishes.id", dish_id);

        if (!dish) {
            throw new AppError("Prato não encontrado!");
        }

        if (name) {
            const [checkExistingPlate] = await knex("dishes")
                .select()
                .where("dishes.name", name);

            if (checkExistingPlate && checkExistingPlate.id !== dish.id) {
                throw new AppError("Este nome de prato já está sendo usado!");
            }
        }

        dish.name = name ?? dish.name;
        dish.category = category ?? dish.category;
        dish.price = price ?? dish.price;
        dish.description = description ?? dish.description;

        await knex("dishes").where("dishes.id", dish_id).update({
            name: dish.name,
            category: dish.category,
            price: dish.price,
            description: dish.description,
            updated_at: knex.fn.now()
        });

        if (ingredients) {
            if (ingredients.length !== 0) {
                const dishIngredients = await knex("ingredients").where(
                    "dish_id",
                    dish_id
                );

                const allIngredients = dishIngredients.map(ingredient => {
                    return ingredient.name;
                });

                if (ingredients.toString() !== allIngredients.toString()) {
                    await knex("ingredients")
                        .where("dish_id", dish_id)
                        .delete();

                    const ingredientsInsert = ingredients.map(name => {
                        return {
                            dish_id,
                            name
                        };
                    });

                    await knex("ingredients").insert(ingredientsInsert);
                }
            } else {
                throw new AppError(
                    "Não foi possível atualizar o prato. O campo de ingredientes está preenchido com ingrediente vazio!",
                    400
                );
            }
        }

        return response.json();
    }
}

module.exports = DishesController;
