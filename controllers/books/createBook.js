const BooksRepository = require("../../repositories/books/books");

async function createBook (req, res, next)
{
    try
    {
        const book =
        {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            genre: req.body.genre,
            publisherURL: req.body.publisherURL,
        };
        await BooksRepository.createBook(book);

        console.log("Book added!");
        console.log(req.body);
        
        return res.status(201).send({ message: "Book added!" });
    }
    catch (error)
    {
        console.log("Missing required name field!");
        console.log(error);

        res.status(400).send({ message: "Missing required name field!" });

        return next(error);
    }
};
module.exports = { createBook };