const ContactsRepository = require("../../repositories/contacts");

async function getContacts (req, res, next)
{
    try
    {
        const contacts = await ContactsRepository.getContacts();

        console.log("Get contacts!");
        console.log(`Method - ${req.method};`);
        console.log(`Protocol - ${req.protocol};`);
        console.log(`Hostname - ${req.hostname};`);
        console.log(`Url - ${req.url};`);

        return res.status(200).json(contacts);
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);
        
        res.status(500).send({ message: "Internal server error!" });

        return next(error);
    }
};
module.exports = { getContacts };