const express = require("express");
const routes = express.Router();
const productsController = require("./app/controllers/productsController");

routes.get("/", function (request, response) {
    return response.render("layout.njk");
});

routes.get("/products/create", productsController.create);
routes.get("/products/:id/edit", productsController.edit);
routes.post("/products", productsController.post);



//atalhos
routes.get("/ads/create", function (resquest, response) {
    response.redirect("/products/create");
});





module.exports = routes