const ContactsRepository = require("../../repositories/contacts");

async function getContactById (req, res, next)
{
    const { id } = req.params;
    
    try
    {
        const contactId = await ContactsRepository.getContactById(id);
    
        if (!contactId)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            console.log("Get contact by id!");
            console.log(`Id - ${id};`);
            console.log(`Type - ${typeof id};`);
            
            return res.status(200).json(contactId);
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
module.exports = { getContactById };