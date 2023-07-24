const express = require("express");
const
{
    Contacts, ContactById, CreateContact, UpdateContact, UpdateStatusContact, DeleteContact,
}
= require("../controllers/contacts/index");

const router = express.Router();

router.use(express.json());
router.get("/", Contacts.getContacts);
router.get("/:id", ContactById.getContactById);
router.post("/", CreateContact.createContact);
router.put("/:id", UpdateContact.updateContact);
router.patch("/:id", UpdateStatusContact.updateStatusContact);
router.delete("/:id", DeleteContact.deleteContact);

module.exports = router;