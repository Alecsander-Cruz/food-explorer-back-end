const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesPhotoController {
    async update(request, response) {
        const { id: dish_id } = request.params;
        const photoFileName = request.file.filename;

        const diskStorage = new DiskStorage();

        const dish = await knex("dishes").where("dishes.id", dish_id).first();

        if (!dish) {
            throw new AppError("Este prato não existe!");
        }

        if (dish.photo) {
            await diskStorage.deleteFile(dish.photo);
        }

        const filename = await diskStorage.saveFile(photoFileName);
        dish.photo = filename;

        await knex("dishes").update(dish).where("dishes.id", dish_id);

        return response.json(dish);
    }

    async delete(request, response) {
        const { id: dish_id } = request.params;

        const diskStorage = new DiskStorage();

        const dish = await knex("dishes").where("dishes.id", dish_id).first();

        if (!dish) {
            throw new AppError("Este prato não existe!");
        }

        if (dish.photo) {
            await diskStorage.deleteFile(dish.photo);
        }

        return response.json()
    }
}

module.exports = DishesPhotoController;
