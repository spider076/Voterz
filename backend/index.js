const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get("/", (req, res) => {
    return res.send("hello hello !");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

