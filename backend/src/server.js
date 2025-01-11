const app = require(".");
const connectDB = require("./config/db");

const PORT = 3001;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});