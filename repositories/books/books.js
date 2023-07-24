const BooksModel = require("../../models/books");

function getBooks ()
{
    return BooksModel.find();
};
function getBookById (id)
{
    return BooksModel.findById(id);
};
function createBook (book)
{
    return BooksModel.create(book);
};
function updateBook (id, book)
{
    return BooksModel.findByIdAndUpdate(id, book, { new: true });
};
function deleteBook (id)
{
    return BooksModel.findByIdAndRemove(id);
};
module.exports =
{
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};