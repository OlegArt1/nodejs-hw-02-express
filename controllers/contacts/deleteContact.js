const ContactById = require("../../repositories/contacts");
const ContactsRepository = require("../../repositories/contacts");

async function deleteContact (req, res, next)
{
    const { id } = req.params;
    
    try
    {
        const contactId = await ContactById.getContactById(id);

        if (!contactId)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            await ContactsRepository.deleteContact(id);

            console.log("Contact deleted!");

            return res.status(200).send({ message: "Contact deleted!" });
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
module.exports = { deleteContact };