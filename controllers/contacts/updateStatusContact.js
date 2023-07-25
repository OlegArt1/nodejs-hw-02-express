const ContactById = require("../../repositories/contacts");
const ContactsRepository = require("../../repositories/contacts");

async function updateStatusContact (req, res, next)
{
    const { id } = req.params;
    
    try
    {
        const contactId = await ContactById.getBookById(id);

        const contactStatus =
        {
            favorite: req.body.favorite,
        };
        if (!contactId)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else if (typeof contactStatus.favorite !== "boolean" && typeof contactStatus.favorite !== "undefined")
        {
            console.log("Missing field favorite!");

            return res.status(400).send({ message: "Missing field favorite!" });
        }
        else
        {
            await ContactsRepository.updateContact(id, contactStatus);
            
            console.log("Contact updated!");
            console.log(req.body);

            return res.status(200).send({ message: "Contact updated!" });
        }
    }
    catch (error)
    {
        console.log("Missing field favorite!");
        console.log(error);

        res.status(400).send({ message: "Missing field favorite!" });

        return next(error);
    }
};
module.exports = { updateStatusContact };