const Contacts = require("../../models/contacts");

async function deleteContact (req, res)
{
    try
    {
        const { id } = req.params;

        const contactId = await Contacts.findByIdAndRemove(id);
    
        if (contactId.deletedCount === 0)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            console.log("Contact deleted!");

            return res.status(200).send({ message: "Contact deleted!" });
        }
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);
        
        return res.status(500).send({ message: "Internal server error!" });
    }
};
module.exports = { deleteContact };