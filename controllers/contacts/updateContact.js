const Contacts = require("../../models/contacts");

async function updateContact (req, res)
{
    try
    {
        const { id } = req.params;

        const newContact =
        {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        };
        const updatedContact = await Contacts.findByIdAndUpdate(id, newContact, { new: true });
    
        if (updatedContact === null)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            console.log("Contact updated!");
            console.log(req.body);

            return res.status(200).send({ message: "Contact updated!" });
        }
    }
    catch (error)
    {
        console.log("Missing fields!");
        console.log(error);
        
        return res.status(400).send({ message: "Missing fields!" });
    }
};
module.exports = { updateContact };