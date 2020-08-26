const express = require("express");

const productsController = require("./app/controllers/productsController");
const multer = require('./app/middlewares/multer');



const routes = express.Router();

routes.get("/", function (request, response) {
    return response.render("layout.njk");
});

routes.get("/products/create", productsController.create);
routes.get("/products/:id/edit", productsController.edit);

routes.post("/products", multer.array('photos', 6), productsController.post);
routes.put("/products", multer.array('photos', 6), productsController.put);
routes.delete("/products", productsController.delete);



//atalhos
routes.get("/ads/create", function (resquest, response) {
    response.redirect("/products/create");
});





module.exports = routes