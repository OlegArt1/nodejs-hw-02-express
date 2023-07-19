const Contacts = require("../../models/contacts");
const ContactsRepository = require("../../repositories/contacts");

async function getContacts (req, res)
{
    try
    {
        const contacts = await Contacts.find();
        const contactsRepository = await ContactsRepository.getContacts();

        console.log("Get contacts!");
        console.log(`Method - ${req.method};`);
        console.log(`Protocol - ${req.protocol};`);
        console.log(`Hostname - ${req.hostname};`);
        console.log(`Url - ${req.url};`);

        return res.status(200).json(contactsRepository);
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);
        
        return res.status(500).send({ message: "Internal server error!" });
    }
};
async function getContactById (req, res)
{
    try
    {
        const { id } = req.params;

        const contactId = await Contacts.findById(id);
        const contactIdRepository = await ContactsRepository.getContactById(id);
    /*
        if (!contactId)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
    */
        if (contactIdRepository === null)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
        else
        {
            console.log("Get contact by id!");
            console.log(`Id - ${id};`);
            console.log(`Type - ${typeof id};`);
            
            return res.status(200).json(contactIdRepository);
        }
    }
    catch (error)
    {
        console.log("Internal server error!");
        console.log(error);

        return res.status(500).send({ message: "Internal server error!" });
    }
};
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
        const updatedContactRepository = await ContactsRepository.updateContact(id, newContact);
    /*
        if (!updatedContact)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
    */
        if (!updatedContactRepository)
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
async function updateStatusContact (req, res)
{
    try
    {
        const { id } = req.params;

        const newContact =
        {
            favorite: req.body.favorite,
        };
        const updatedContact = await Contacts.findByIdAndUpdate(id, newContact, { new: true });
        const updatedContactRepository = await ContactsRepository.updateContact(id, newContact);
    /*
        if (!updatedContact)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
    */
        if (!updatedContactRepository)
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
        console.log("Missing field favorite!");
        console.log(error);        
    
        return res.status(400).send({ message: "Missing field favorite!" });
    }
};
async function deleteContact (req, res)
{
    try
    {
        const { id } = req.params;

        const contactId = await Contacts.findByIdAndRemove(id);
        const contactIdRepository = await ContactsRepository.deleteContact(id);
    /*
        if (!contactId)
        {
            console.log("Contact not found!");

            return res.status(404).send({ message: "Contact not found!" });
        }
    */
        if (!contactIdRepository)
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
module.exports =
{
    getContacts,
    getContactById,
    createContact,
    updateContact,
    updateStatusContact,
    deleteContact,
};