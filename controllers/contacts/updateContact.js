const ContactById = require("../../repositories/contacts/contacts");
const ContactsRepository = require("../../repositories/contacts/contacts");

async function updateContact (req, res, next)
{
    const { id } = req.params;
    
    try
    {
        const contactId = await ContactById.getBookById(id);

        const contact =
        {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            favorite: req.body.favorite,
        };
        if (!contactId)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found" });
        }
        else if (typeof contact.email !== "string" && typeof contact.email !== "undefined")
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
            await ContactsRepository.updateContact(id, contact);
            
            console.log("Contact updated!");
            console.log(req.body);

            return res.status(200).send({ message: "Contact updated!" });
        }
    }
    catch (error)
    {
        console.log("Missing fields!");
        console.log(error);

        res.status(400).send({ message: "Missing fields!" });

        return next(error);
    }
};
module.exports = { updateContact };