const Contacts = require("../../models/contacts");

async function getContacts (req, res)
{
    try
    {
        const contacts = await Contacts.find();

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
        
        return res.status(500).send({ message: "Internal server error!" });
    }
};
module.exports = { getContacts };