const BookById = require("../../repositories/books/books");
const BooksRepository = require("../../repositories/books/books");

async function deleteBook (req, res, next)
{
    const { id } = req.params;
    
    try
    {
        const bookId = await BookById.getBookById(id);

        if (!bookId)
        {
            console.log("Book not found!");

            return res.status(404).send({ message: "Book not found!" });
        }
        else
        {
            await BooksRepository.deleteBook(id);

            console.log("Book deleted!");

            return res.status(200).send({ message: "Book deleted!" });
        }
    }
    catch (error)
    {
        console.log("Book not found!");
        console.log(error);

        res.status(404).send({ message: "Book not found!" });

        return next(error);
    }
};
module.exports = { deleteBook };