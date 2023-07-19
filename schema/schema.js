const Joi = require("joi");
const ContactsSchema = require("../schemas/contacts");

const getContacts = Joi.object().keys({
    query: Joi.object().keys({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(50),
    }),
});
const getContactById = Joi.object().keys({
    params: Joi.object().keys({
        id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId'),
    }),
});
const createContact = Joi.object().keys({
    body: ContactsSchema,
});
const updateContact = Joi.object().keys({
    params: Joi.object().keys({
        id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId'),
    }),
    body: ContactsSchema,
});
const deleteContact = Joi.object().keys({
    params: Joi.object().keys({
        id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId'),
    }),
});
module.exports =
{
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};