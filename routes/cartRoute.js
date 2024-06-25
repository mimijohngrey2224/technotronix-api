const express = require("express")
const cartControlller = require("../controllers/cartController")
const {auth} = require("../middleware/auth") 
// const handleAnonymousCart = require("../middleware/anonymousCart")

const router = express.Router()
// router.use(handleAnonymousCart)

router.post("/addToCart", auth, cartControlller.addToCart)
router.get("/cart", auth, cartControlller.getCart)
router.post("/update-quantity", auth, cartControlller.updateQuantity)
router.post("/delete-item", auth, cartControlller.removeItem)

module.exports = router;