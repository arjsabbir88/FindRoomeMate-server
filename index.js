const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("finding roomMate in the server");
})

app.listen(port, () => {
    console.log("server is running on port ", port)
})



// u2GWEIw9isGM0IYJ
// // arjsabbir88
// mongodb+srv://arjsabbir88:1EkJOcW3zKC3rVgP@arjsabbir.9jwrtji.mongodb.net/?retryWrites=true&w=majority&appName=arjSabbir