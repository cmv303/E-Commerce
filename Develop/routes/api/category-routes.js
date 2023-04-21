const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  const categoriesData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoriesData);
} catch (err) {
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
 try {
  const categoryId = req.params.id;
  const categoryData = await Category.findByPk(categoryId, {
    include: [{ model: Product }]
 });
 if (!categoryData) {
  res.status(404).json({ message: "Category not found!" });
  return;
 }
 res.status(200).json(categoryData);
 } catch (err) {
  res.status(500),json(err)
 }
});

router.post('/', async (req, res) => {
try {
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
} catch (err) {
  res.status(500),json(err);
}
});


router.put('/:id', async (req, res) => {
  try{
    const categoryId = req.params.id;
    const categoryData = await Category.update(req.body, {
      where: {
        id: categoryId
      },
    });
    if (!categoryData[0]) {
      res.status(404).json( { message: "Category not found" });
      return;
    }
    res.status(200).json({ message: "Category has been updated! "});
  } catch (err) {
    res.status(500),json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryId = req.params.id;
    const categoryData = await Category.destroy({
      where: {
        id: categoryId
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "Category not found "});
      return;
    }
    res.status(200).json({ message: "Category has been deleted! "});
  } catch (err) {
    res.status(500),json(err);
  }
});

module.exports = router;
