const BooksRepository = require("../../repositories/books/books");

async function getBookById (req, res, next)
{
    const { id } = req.params;
    
    try
    {
        const bookId = await BooksRepository.getBookById(id);
  
        if (!bookId)
        {
            console.log("Book not found!");

            return res.status(404).send({ message: "Book not found!" });
        }
        else
        {
            console.log("Get book by id!");
            console.log(`Id - ${id};`);
            console.log(`Type - ${typeof id};`);

            return res.status(200).json(bookId);
        }
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);

        res.status(500).send({ message: "Internal server error!" });
      
        return next(error);
    }
};
module.exports = { getBookById };