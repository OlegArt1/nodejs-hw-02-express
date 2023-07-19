const Contacts = require("../../models/contacts");
const ContactsRepository = require("../../repositories/contacts");

async function createContact (req, res)
{
    try
    {
        const contact =
        {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            favorite: req.body.favorite,
        };
        const newContact = await Contacts.create(contact);
        const newContactRepository = await ContactsRepository.createContact(contact);
    /*
        if (!newContact)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
    */
        if (!newContactRepository)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            console.log("Contact added!");
            console.log(req.body);
        
            return res.status(201).send({ message: "Contact added!" });
        }
    }
    catch (error)
    {
        console.log("Missing required name field!");
        console.log(error);
        
        return res.status(500).send({ message: "Missing required name field!" });
    }
};
module.exports = { createContact };