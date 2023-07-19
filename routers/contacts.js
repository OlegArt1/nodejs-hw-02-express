const express = require("express");
const
{ 
    getContacts,
    getContactById,
    createContact,
    updateContact,
    updateStatusContact,
    deleteContact,
} = require("../controllers/contacts");

const router = express.Router();

router.use(express.json());
router.get("/", getContacts.getContacts);
router.get("/:id", getContactById.getContactById);
router.post("/", createContact.createContact);
router.put("/:id", updateContact.updateContact);
router.patch("/:id", updateStatusContact.updateStatusContact);
router.delete("/:id", deleteContact.deleteContact);

module.exports = router;