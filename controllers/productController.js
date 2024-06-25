
const Product = require("../models/product")
const {validateProduct} = require("../validator")

exports.createProduct = async (req, res)=>{
    const {error} = validateProduct(req.body)
    if (error) {
        res.json(error.details[0].message)
    }else{
        try {
       

            const product = new Product({
                category: req.body.category,
                name: req.body.name,
                img: req.file.path,
                price: req.body.price,
                featured: req.body.featured,
                topSelling: req.body.topSelling
            })
    
            const productItem = await product.save()
            res.json(productItem)
        } catch (error) {
            console.log({message: error.message});
            
        }

    }
   
};

exports.getAllProduct = async (req, res)=>{
    try {
        const productItem = await Product.find().populate('category');
        res.json(productItem);
    } catch (error) {
        res.json({message: error.message})
        
    }

};

exports.getSingleProduct = async (req, res)=>{
    try {
        const productItem = await Product.findById(req.params.id)
        if (!productItem) {
            res.status(404).json("The item is not found")
        }

        res.json(productItem)
    } catch (error) {
        res.json({message: error.message})
    }
    
};

exports.updateProduct = async (req, res) =>{
    const {error} = validateProduct(req.body)
    if (error) {
        res.json(error.details[0].message)
    }else{
        try {
            const product = await Product.findById(req.params.id)
            if (!product) {
                res.json("The Brand entered is not found!!!")
            }
    
           
    
            product.category = req.body.category,
            product.name = req.body.name,
            product.img = req.file.path,
            product.price = req.body.price,
            product.featured = req.body.featured,
            product.topSelling = req.body.topSelling
    
            const productUpdate = await product.save()
            res.json(productUpdate)
        } catch (error) {
           res.json({message: error.message});
        }
    }
},

exports.deleteProduct = async (req, res)=>{
    try {
        const productItem = await Product.findByIdAndDelete(req.params.id)
        if (!productItem) {
            res.json("No such item found")
        }

        res.json(productItem)
    } catch (error) {
        res.json({message: error.message})
        
    }

};

exports.getFeaturedProducts = async(req, res)=>{
    try {
        const featured = await Product.find({featured: true}).populate('category')
        res.json(featured)
    } catch (error) {
        res.json({message: error.message})
    }

}

exports.getTopSellingProducts = async(req, res)=>{
    try {
        const topSelling = await Product.find({topSelling: true}).populate('category')
        res.json(topSelling)
    } catch (error) {
        res.json({message: error.message})
    }
}
