// imports
const express = require("express");
const cors = require("cors");
const { getCompliment,getFortune, getLetters, createLetter,updateLetter, deleteLetter  } = require('./controller')

// invoking express
const app = express();

// middleware
app.use(cors());
app.use(express.json());


// routes
app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get('/api/smart', getLetters);
app.post(`/api/smart`, createLetter);
app.put(`/api/smart/:letter_id`, updateLetter);
app.delete(`/api/smart/:letter_id`, deleteLetter);

// event listener 
app.listen(4000, () => console.log("Server running on 4000"));
