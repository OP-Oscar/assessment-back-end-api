// variable to track if fortune and compliment buttons were used
let btnCounter = [];

let pokemon = document.getElementById('pokiInput').value


// function to display mainDiv section of page
const addingSmart = (x) => {
    if(x.length === 2){
        let ele = document.getElementById("mainDiv");
        if (ele.style.display === "none") {
          ele.style.display = "block";
        }
    }
};

// compliments front end js
const complimentBtn = document.getElementById("complimentButton")

// send request from front end to back end for a compliment
const getCompliment = () => {
    //adding to list to track buttons was used
    !btnCounter.includes('compliment') ? btnCounter.push('compliment'):btnCounter; 
    //invoking adding addingSmart 
    addingSmart(btnCounter) 
    //axios get route
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data; 
            //producing alert to user    
            alert(data);
    });
};
// event listener for compliment button click
complimentBtn.addEventListener('click', getCompliment)


// fortunes front end js
const fortuneBtn = document.getElementById("fortuneButton")
// send request from front end to back end for a fortune
const getFortune = () => {
    //adding to list to track buttons was used
    !btnCounter.includes('fortune') ? btnCounter.push('fortune'): btnCounter;
    // invoking adding addingSmart 
    addingSmart(btnCounter) 
    // axios request for fortunes route
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;  
            //producing alert to user    
            alert(data);

    });
};
// event listener for fortune button click
fortuneBtn.addEventListener('click', getFortune)

// query selecting form and area for letters
const letterContainer = document.querySelector('#letter-content-container')
const form = document.querySelector('form')

//setting base URL since optional actions will be avail
const baseURL = 'http://localhost:4000/api/smart'

// setting error and callback for data
const letterCallback = ({ data: letter }) => displayLetters(letter)
const errCallback = err => console.log(err)

// sending request to back end
const getAllLetters = () => axios.get(baseURL).then(letterCallback).catch(errCallback);
const createLetter = body => axios.post(baseURL, body).then(letterCallback).catch(errCallback)
const deleteLetter = (id) => axios.delete(`${baseURL}/${id}`).then(letterCallback).catch(errCallback)
// const updateLetter = (id,type) => axios.put(`${baseURL}/${id}`, {type}).then(letterCallback).catch(errCallback)
// const getPokemon = () => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((res)=>"")

// front end list drop dop
const helpList = document.getElementById("list")
// setting default id
let letter_id = 0

// // function to demonstrate new value
function displaySelection(){
    letter_id = this.value;
    return letter_id
}
// event listener
helpList.addEventListener('change',displaySelection)


function requestHandlingFront(stuff){
    //preventing refresh of content
    stuff.preventDefault()
    

    if(letter_id === 0){
        alert("Please select letter")
    }else if(document.querySelector("#letterContent").value === ""){
        alert("Don't forget to type something out")
    }
    else{
    //getting content from textarea box with id letterContent
    document.getElementById(`${letter_id}`).setAttribute("disabled", "disabled")

    let letter = document.querySelector("#letterContent")
        
        //creating new object with data sent in
        let bodyObj = {
            id: Number(letter_id),
            description: letter.value,
        }

        //reset-clearing out content written
        letter.value = ""

        //reset-setting the selected dropdown option as -select-
        helpList.value = 0

        //invoking create letter and sending new object
        createLetter(bodyObj)
    }
    };



// creating content for letters of SMART
function createLetterCard(letter) {
    const letterCard = document.createElement('div')
    letterCard.classList.add('letter-card')
    const referencer = {
        1: "S- Specific",
        2: "M- Measurable",
        3: "A- Attainable",
        4: "R- Relevant",
        5: "T- Time-Bound"
    }

    letterCard.innerHTML = `
    <p> ${referencer[letter.id]} </P 
    <p class="letterContent" id="${letter.id}">
    <textarea id="letterContent${letter.id}" cols="60" rows="4">${letter.description}</textarea>
    </p>
    <button onclick="deleteLetter(${letter.id})">delete</button>
    `

    letterContainer.appendChild(letterCard)
}


// fuction to display all letter content
function displayLetters(arr) {
    // object being used as spot checker for items deleted
    const letterRef = {
        1 : "Letter S",
        2: "Letter M",
        3: "Letter A",
        4: "Letter R",
        5: "Letter T"};
    letterContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
            //any item that has been created is being removed from list
            if(Object.keys(letterRef).includes(String(arr[i].id))){
                delete letterRef[String(arr[i].id)]
                 }
            createLetterCard(arr[i])
         }
         //any items previously deleted will be made active if disabled
        for(val of Object.keys(letterRef)){
            document.getElementById(`${val}`).removeAttribute("disabled")
        }
}

let searchBtn = document.getElementById('pokiSearch')
let query = document.querySelector('#pokiInput')

// // creating pokemon images
// function createPokemon(img) {
//     console.log('hello....')
//     const pokemonSpot = document.querySelector('#pokemonSpot');
//     console.log(`the value of img within createpoke is: ${img}`);
//     if(img.toLowerCase() === "pikachu"){
//         const pokeImg = document.createElement("/client/images/detective-pikachu.gif")
//         pokeImg.src =img
//         pokemonSpot.appendChild(pokeImg)
//     }else{
//     const pokeImg = document.createElement('img')
//     pokeImg.src =img
//     pokemonSpot.appendChild(pokeImg)
// }};

const submitHandler = (event) => {
    event.preventDefault()
    console.log(query.value)

    let pokemon = query.value.toLowerCase()
    if(pokemon === "pikachu" ){
            // doing multiple
        let imgs = document.querySelectorAll('.poke')
        imgs.forEach(el => el.src = "/client/images/detective-pikachu.gif"  )

    }else{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((res) => {
    console.log(res.data)
    console.log(res.data.sprites.front_default);

    // doing multiple
    let imgs = document.querySelectorAll('.poke')
    imgs.forEach(el => el.src = res.data.sprites.front_default )


}).catch(err => console.log(err))
}

}

searchBtn.addEventListener('click', submitHandler)



// card flip front end js
let cards = document.querySelectorAll('.card');
[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});


form.addEventListener('submit', requestHandlingFront)

getAllLetters()

