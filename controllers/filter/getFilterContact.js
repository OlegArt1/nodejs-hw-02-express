const Contacts = require("../../models/contacts");

async function getFilterContact (__, res)
{
    try
    {
        const filterFavoriteContact = await Contacts.find({ favorite: true });

        return res.status(200).json(filterFavoriteContact);
    }
    catch (error)
    {
        console.log("Internal server error!");
        
        console.log(error);

        return res.status(500).send({ message: "Internal server error!" });
    }
};
module.exports = { getFilterContact };