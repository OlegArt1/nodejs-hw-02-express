const express = require("express");
const ContactsSchema = require("../schemas/schema");
const validate = require("../middleware/validation");

const getContactsController = require("../controllers/contacts/getContacts");
const getContactByIdController = require("../controllers/contacts/getContactById");
const getFilterFavoriteContactController = require("../controllers/contacts/getFilterContact");
const postCreateContactController = require("../controllers/contacts/createContact");
const putUpdateContactController = require("../controllers/contacts/updateContact");
const patchUpdateStatusContactController = require("../controllers/contacts/updateStatusContact");
const deleteContactController = require("../controllers/contacts/deleteContact");

const router = express.Router();

router.use(express.json());
router.get("/", validate(ContactsSchema.getContacts), getContactsController.getContacts);
router.get("/:id", validate(ContactsSchema.getContactById), getContactByIdController.getContactById);
router.get("/", getFilterFavoriteContactController.getFilterContact);
router.post("/", validate(ContactsSchema.createContact), postCreateContactController.createContact);
router.put("/:id", validate(ContactsSchema.updateContact), putUpdateContactController.updateContact);
router.patch("/:id", validate(ContactsSchema.updateContact), patchUpdateStatusContactController.updateStatusContact);
router.delete("/:id", validate(ContactsSchema.deleteContact), deleteContactController.deleteContact);

module.exports = router;