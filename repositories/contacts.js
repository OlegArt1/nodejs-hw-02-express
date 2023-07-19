const Contacts = require("../models/contacts");

function find (page, limit)
{
    const skip = page > 0 ? (page - 1) * limit : 0;
  
    return Contacts.find().skip(skip).limit(limit).exec();
};
function count()
{
    return Contacts.countDocuments().exec();
};
function getContacts()
{
    return Contacts.find();
};
function getContactById (id)
{
 // return Contacts.findOne({ _id: id }).exec();
    return Contacts.findById(id);
};
function createContact (payload)
{
    return Contacts.create(payload);
};
function updateContact (id, payload)
{
 // return Contacts.findOneAndReplace({ _id: id }, payload, { new: true }).exec();
    return Contacts.findByIdAndUpdate(id, payload, { new: true });
};
function deleteContact (id)
{
 // return Contacts.deleteOne({ _id: id }).exec();
    return Contacts.findByIdAndRemove(id);
};
module.exports =
{
    count,
    find,
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};