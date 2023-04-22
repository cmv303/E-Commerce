const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
 try {
  const singleProductByPk = await Product.findByPk(req.params.id, {
    include: [{ model: Category }, {model: Tag }],
  });
  if (!singleProductByPk) {
    res.status(404).json({ message: "No product found with that Id!"});
    return;
  }
  res.status(200).json(singleProductByPk);
 } catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

// create new product
router.post("/", async (req, res) => {
 try {
  const createNewProduct = await Product.create(req.body);

  if (req.body.tagIds.length) {
    const productTagIdArr = req.body.tagIds.map((tag_id) => {
      return {
        product_id: createNewProduct.id,
        tag_id,
      };
    });
    await ProductTag.bulkCreate(productTagIdArr);
    }
    const newProduct = await Product.findByPk(createNewProduct.id, {
        include: [{ model: Category }, { model: Tag }],
      });
      res.status(200).json(newProduct);
    } catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedProduct) {
      res.status(404).json ({ message: "No product to update! "});
      return;
    }

    const allProductTags = await ProductTag.findAll({ where: { product_id: req.params.id },
    });

    const productTagIds = allProductTags.map(({ tag_id }) => tag_id);

    const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

        const productTagsToRemove = allProductTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

        await Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);

        const updatedProductTag = await ProductTag.findAll( {
          where: { product_id: req.params.id }
        });

        if (!updatedProductTag) {
          res.status(404).json ({ message: "No product to update! "});
          return;
        }

        const updatedProductWithTags = await Product.findByPk(req.params.id, {
          include: [{ model: Category }, { model: Tag }],
        });

        res.json(updatedProductWithTags);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id }
    });

    if (!deletedProduct) {
        res.status(404).json({ message: "Product unable to be deleted!"});
        return;
      }
      res.status(200).json(deletedProduct);
     }
     catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    });

module.exports = router;
