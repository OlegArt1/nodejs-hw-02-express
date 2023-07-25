const ContactsModel = require("../../models/contacts");

function getContacts ()
{
    return ContactsModel.find();
};
function getContactById (id)
{
    return ContactsModel.findById(id);
};
function createContact (contact)
{
    return ContactsModel.create(contact);
};
function updateContact (id, contact)
{
    return ContactsModel.findByIdAndUpdate(id, contact, { new: true });
};
function deleteContact (id)
{
    return ContactsModel.findByIdAndRemove(id);
};
module.exports =
{
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};