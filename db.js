const mongoose = require("mongoose");

// const DB_URI = process.env.DB_URI;
const DB_URI = 'mongodb+srv://art777oleg:y9IZuTf1EQjXgkE5@cluster0.1z4hvbl.mongodb.net/Contacts?retryWrites=true&w=majority';

async function run()
{
    try
    {
        await mongoose.connect(DB_URI);

        console.log("Database connection successful!");
    }
    catch (error)
    {
        console.error(error);
        
        process.exit(1);
    }
};
run().catch(console.error);