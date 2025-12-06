import User from "../models/UserModel.js";
import Products from "../models/ProductModel.js";
import bcrypt from "bcrypt"; // Add this import
import jwt from "jsonwebtoken"; 

const doRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Note.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
}


const doLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Note.findOne({ where: { username } });
    
    // First problem: check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Second problem: use user.password instead of Note.password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Third problem: use user.id instead of Note.id and provide a fallback JWT_SECRET
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET || 'fallback_secret_key_for_development',
      { expiresIn: '1h' }
    );
    
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}

const showUsernames = async (req, res) => {
    try {
        const usernames = await User.findAll();
        res.status(200).json(usernames);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Cannot get all usernames" });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addProduct = async (req, res) => {
  try {
    const { product_name, description, qty } = req.body;

    const newProduct = await Products.create({
      product_name,
      description,
      qty,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const editProduct = async (req, res) => {
    try {
        const {
            product_name,
            description,
            qty
        } = req.body;
        const productId = req.params.id;
        const result = await Products.update(
            { product_name, description, qty},
            {
                where: {
                    id: productId,
                },
            }
        );

        if (result[0] === 0) {
            return res
                .status(404)
                .json({ msg: "Product not found or unauthorized" });
        }

        res.status(200).json({ msg: "Product Updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("Deleting product ID:", productId);

        const result = await Products.destroy({
            where: {
                id: productId,
            },
        });

        if (result) {
            res.json({ message: "Product deleted successfully!" });
        } else {
            res.status(404).json({ error: "Product not found!" });
        }
    } catch (error) {
        console.error("Error deleting Product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export { doLogin, doRegister, showUsernames, getProducts, getProductById, addProduct, editProduct, deleteProduct};