const express = require("express");
const
{
    Books, BookById, CreateBook, UpdateBook, DeleteBook,
}
= require("../controllers/books/index");

const router = express.Router();

router.use(express.json());
router.get("/", Books.getBooks);
router.get("/:id", BookById.getBookById);
router.post("/", CreateBook.createBook);
router.put("/:id", UpdateBook.updateBook);
router.delete("/:id", DeleteBook.deleteBook);

module.exports = router;