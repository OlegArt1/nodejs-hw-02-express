const Contacts = require("../../models/contacts");

async function getContactById (req, res)
{
    try
    {
        const { id } = req.params;

        const contactId = await Contacts.findById(id);
    
        if (contactId === null)
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

        return res.status(500).send({ message: "Internal server error!" });
    }
};
module.exports = { getContactById };