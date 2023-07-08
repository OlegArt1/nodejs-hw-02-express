const crypto = require("crypto");
const express = require("express");
const contacts = require("./contacts");
const schema = require("../schema/contact");

const router = express.Router();

router.get("/contacts", async (req, res)=>
{
    try
    {
        const contactsList = await contacts.listContacts();

        res.status(200).json(contactsList);

        console.log("\nGet contacts!\n");

        console.log(`Method - ${req.method};`);
        console.log(`Protocol - ${req.protocol};`);
        console.log(`Hostname - ${req.hostname};`);
        console.log(`Url - ${req.url};\n`);
    }
    catch (error)
    {
        res.status(500).send({ message: error });
    }
});
router.get("/contacts/:id", async (req, res) =>
{
    try
    {
        const { id } = req.params;

        const contactId = await contacts.getById(id);

        if (!contactId)
        {
            res.status(404).send({ message: "Contact not found!" });

            console.log("\nContact not found!\n");
        }
        else
        {
            res.status(200).json(contactId);

            console.log("\n Get contact by id!\n");

            console.log(`Id - ${id};`);
            console.log(`Type - ${typeof id};\n`);
        }
    }
    catch (error)
    {
        res.status(500).send({ message: error });
    }
});
router.post("/contacts", async (req, res) =>
{
    try
    {
        const response = schema.validate(req.body, { convert: false });

        const newContact = await contacts.addContact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        if (typeof response.error !== "undefined")
        {
            console.log("\nMissing required name field!\n");

            return res.status(400).send("Missing required name field!");
        }
        else if (!newContact)
        {
            res.status(404).send({ message: "Contact not found!" });

            console.log("\nContact not found!\n");
        }
        else
        {
            res.status(201).send({ message: "Contact added!" });

            console.log("\nContact added!\n");

            console.log(req.body + "\n");
        }
    }
    catch (error)
    {
        res.status(500).send({ message: error });
    }
});
router.put("/contacts/:id", async (req, res) =>
{
    try
    {
        const { id } = req.params;

        const response = schema.validate(req.body, { convert: false });

        const updateContact = await contacts.updateContact(id,
        {
            id: crypto.randomUUID(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        if (typeof response.error !== "undefined")
        {
            res.status(400).send("Missing fields!");

            console.log("\nMissing fields!\n");
        }
        else if (!updateContact)
        {
            res.status(404).send({ message: "Contact not found!" });

            console.log("\nContact not found!\n");
        }
        else
        {
            res.status(200).send({ message: "Contact updated!" });

            console.log("\nContact updated!\n");

            console.log(req.body + "\n");
        }
    }
    catch (error)
    {
        res.status(500).send({ message: error });
    }
});
router.delete("/contacts/:id", async (req, res) =>
{
    try
    {
        const { id } = req.params;

        const contactId = await contacts.removeContact(id);

        if (!contactId)
        {
            res.status(404).send({ message: "Contact not found!" });

            console.log("\nContact not found!\n");
        }
        else
        {
            res.status(200).send({ message: "Contact deleted!" });

            console.log("\nContact deleted!\n");
        }
    }
    catch (error)
    {
        res.status(500).send({ message: error });
    }
});
module.exports = router;