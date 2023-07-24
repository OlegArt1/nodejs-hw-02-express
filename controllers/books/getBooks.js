const BooksRepository = require("../../repositories/books/books");

async function getBooks (req, res, next)
{
    try
    {
        const books = await BooksRepository.getBooks();

        console.log("Get books!");
        console.log(`Method - ${req.method};`);
        console.log(`Protocol - ${req.protocol};`);
        console.log(`Hostname - ${req.hostname};`);
        console.log(`Url - ${req.url};`);

        return res.status(200).json(books);
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);
        
        res.status(500).send({ message: "Internal server error!" });

        return next(error);
    }
};
module.exports = { getBooks };