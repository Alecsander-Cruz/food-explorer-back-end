const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishesPhotoController = require("../controllers/DishesPhotoController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);
dishesRoutes.use(ensureAuthenticated);

const dishesController = new DishesController();
const dishesPhotoController = new DishesPhotoController();

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post(
    "/",
    verifyUserAuthorization("admin"),
    dishesController.create
);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete(
    "/:id",
    verifyUserAuthorization("admin"),
    dishesController.delete
);
dishesRoutes.put(
    "/:id",
    verifyUserAuthorization("admin"),
    dishesController.update
);
dishesRoutes.patch(
    "/photo/:id",
    verifyUserAuthorization("admin"),
    upload.single("photo"),
    dishesPhotoController.update
);

module.exports = dishesRoutes;
