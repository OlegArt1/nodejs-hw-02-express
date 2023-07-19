const Users = require("../../models/users");

async function updateStatusAuth (req, res)
{
    try
    {
        const { id } = req.params;

        const newSubscription =
        {
            subscription: req.body.subscription,
        };
        const updatedSubscription = await Users.findByIdAndUpdate(id, newSubscription, { new: true });

        if (!updatedSubscription || updatedSubscription === null)
        {
            console.log("Subscription not found!");

            return res.status(404).send({ message: "Subscription not found!" });
        }
        else
        {
            console.log("Subscription updated!");
            console.log(req.body);

            return res.status(200).send({ message: "Subscription updated!" });
        }
    }
    catch (error)
    {
        console.log("Missing field subscription!");
        console.log(error);        
    
        return res.status(400).send({ message: "Missing field subscription!" });
    }
};
module.exports = { updateStatusAuth };