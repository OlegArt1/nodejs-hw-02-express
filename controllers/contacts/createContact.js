const ContactsRepository = require("../../repositories/contacts");

async function createContact (req, res, next)
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
        await ContactsRepository.createContact(contact);

        if (typeof contact.email !== "string" && typeof contact.email !== "undefined")
        {
            console.log("Missing required name field!");

            return res.status(400).send({ message: "Missing required name field!" });
        }
        else if (typeof contact.phone !== "string" && typeof contact.phone !== "undefined")
        {
            console.log("Missing required name field!");

            return res.status(400).send({ message: "Missing required name field!" });
        }
        else if (typeof contact.favorite !== "boolean")
        {
            console.log("Missing required name field!");

            return res.status(400).send({ message: "Missing required name field!" });
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

        res.status(400).send({ message: "Missing required name field!" });

        return next(error);
    }
};
module.exports = { createContact };