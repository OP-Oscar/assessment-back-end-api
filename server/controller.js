//importing db
const db = require('../server/db.json')

//exporting modules
module.exports = {
    // compliment handler from back end
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
        //send respond to front end with random compliment
        res.status(200).send(randomCompliment);
    },

    // fortune handler from back end
    getFortune: (req, res) => {
        const fortunes = ["Congratulations, you are on your way to success.", 
                        "Do not make extra work for yourself, just give 100s.", 
                        "Every flower blooms in its own sweet time.",
                        "Imagination rules the world, don't underestimate yourself.",
                        "Enjoy the small moments, happiness will follow.",
                        "You are a talented individual, don't let uncertainty get in the way."];
        
        // choose random compliment
        let randomIndexx = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndexx];
        //send respond to front end with random fortune
        res.status(200).send(randomFortune);
    },

    // module to respond with all smart plan sections
    getLetters : (req, res) => {
        const allLetters = db; // => variable getting copy of data in database
        res.status(200).send(allLetters); // => sending copy of all database elements
    },

    //module to remove house from DB
    deleteLetter : (req,res) => {
        console.log(req.params)
        let {letter_id} = req.params; //=> variable getting request id
        console.log(`letter id being sent from front end ${letter_id}`);
        const allLetters = db; //=> variable getting copy of DB

        
        //using findIndex method with callback to find correct letter
        let index = allLetters.findIndex( ele => ele.id === +letter_id);
        
        if(index != -1){ // => if value is found then remove it
            db.splice(index,1);
        }
        else console.log(typeof letter_id)

        res.status(200).send(allLetters);
    },
    // module to create letter in database
    createLetter: (req, res) => {

        let {id, description} = req.body
                
        let newletter = {
            id,
            description
        }
        db.push(newletter)

        res.status(200).send(db)

    },

        // module to update letter in database
        updateLetter : (req, res) => {
            const {letter_id} = req.params; // => variable getting request id
            let {type} = req.body // => capturing plus or minus
    
            let index = db.findIndex( ele => +ele.id === letter_id); // => obtaining index
    
            console.log(`found ${type} update request to letter ${letter_id}`)
    
            res.status(200).send(db)
        }
        //add additional logic here
}