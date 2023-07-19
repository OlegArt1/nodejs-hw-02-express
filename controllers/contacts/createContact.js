const Contacts = require("../../models/contacts");

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
        await Contacts.create(contact);
    
        console.log("Contact added!");
        console.log(req.body);
        
        return res.status(201).send({ message: "Contact added!" });
    }
    catch (error)
    {
        console.log("Missing required name field!");
        console.log(error);
        
        return res.status(400).send({ message: "Missing required name field!" });
    }
};
module.exports = { createContact };