import express from "express";
import {    showUsernames,
            doLogin,
            doRegister, 
            getProducts,
            addProduct,
            editProduct,
            getProductById,
            deleteProduct
        } from "../controllers/Controller.js";

const router = express.Router();

router.get("/usernames", showUsernames);
router.post("/register", doRegister);
router.post("/login", doLogin);
router.post("/products", getProducts)
router.get("/product/:id", getProductById)
router.post("/add-product", addProduct)
router.put("/edit-product/:id", editProduct)
router.delete("/delete-product/:id", deleteProduct)

export default router;
