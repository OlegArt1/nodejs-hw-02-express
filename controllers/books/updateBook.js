const BookById = require("../../repositories/books/books");
const BooksRepository = require("../../repositories/books/books");

async function updateBook (req, res, next)
{
    const { id } = req.params;
    
    try
    {
        const bookId = await BookById.getBookById(id);

        const book =
        {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            genre: req.body.genre,
            publisherURL: req.body.publisherURL,
        };
        if (!bookId)
        {
            console.log("Book not found!");

            return res.status(404).send({ message: "Book not found" });
        }
        else
        {
            await BooksRepository.updateBook(id, book);
            
            console.log("Book updated!");
            console.log(req.body);

            return res.status(200).send({ message: "Book updated!" });
        }
    }
    catch (error)
    {
        console.log("Missing fields!");
        console.log(error);

        res.status(400).send({ message: "Missing fields!" });

        return next(error);
    }
};
module.exports = { updateBook };