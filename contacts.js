const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "./db/contacts.json");

async function readContacts()
{
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
};
async function writeContacts (contacts)
{
    await fs.writeFile(filePath, JSON.stringify(contacts));
};
async function listContacts()
{
    try
    {
     // Variant I
    /*
        const contacts = await fs.readFile(filePath, "utf8")
            .then((data) => res.status(200).json(JSON.parse(data)))
            .catch((err) => res.status(500).send(err));
    */
     //
     // Variant II

        const contacts = await readContacts();
    
        return contacts;
     //
    }
    catch (error)
    {
        console.error(error);
    }
};
async function getById (id)
{
    try
    {
        const contacts = await listContacts();

        const contactId = contacts.find((contact) => contact.id === id);

        return contactId;
    }
    catch (error)
    {
        console.error(error);
    }
};
async function addContact (contact)
{
    try
    {
        const contacts = await readContacts();
  
        const newContact = { ...contact, id: crypto.randomUUID() };

        contacts.push(newContact);

        await writeContacts(contacts);

        return newContact;
    }
    catch (error)
    {
        console.error(error);
    }
};
async function updateContact (id, contact)
{
    try
    {
        const contacts = await readContacts();

        const index = contacts.findIndex((contact) => contact.id === id);
      
        const updatedContact =  
        [
            ...contacts.slice(0, index),

            { ...contact, id },

            ...contacts.slice(index + 1)
        ];
        await writeContacts(updatedContact);
  
        return { ...contact, id };
    }
    catch (error)
    {
        console.error(error);
    }
};
async function removeContact (id)
{
    try
    {
        const contacts = await listContacts();

        const index = contacts.findIndex((contact) => contact.id === id);

        const removeContact = [ ...contacts.slice(0, index), ...contacts.slice(index + 1) ];

        await writeContacts(removeContact);

        return removeContact;
    }
    catch (error)
    {
        console.error(error);
    }
};
module.exports = { listContacts, getById, addContact, updateContact, removeContact };