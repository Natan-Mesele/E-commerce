const app = require(".");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});