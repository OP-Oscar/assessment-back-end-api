// variable to track if fortune and compliment buttons were used
let btnCounter = [];

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
const updateLetter = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(letterCallback).catch(errCallback)

// front end list drop dop
const helpList = document.getElementById("list")
// let selected = document.getElementById('changed');

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
    helpList.remove(helpList.selectedIndex)

    if(letter_id === 0){
        alert("Please select letter")
    }
    else{
    //getting content from textarea box with id letterContent
    let letter = document.querySelector("#letterContent")
    
        let bodyObj = {
            id: Number(letter_id),
            description: letter.value,
        }
        console.log(`you just made an object with id: ${bodyObj.id}`)
        createLetter(bodyObj)
    }
    };



// creating content for letters of SMART
function createLetterCard(letter) {
    const letterCard = document.createElement('div')
    letterCard.classList.add('letter-card')
    const referencer = {
        1: "S- Specific",
        2: "M- Specific",
        3: "S- Specific",
        4: "S- Specific",
        5: "S- Specific"
    }
    letterCard.innerHTML = `
    <p> The ID for this item is ${letter.id} </P 
    <p class="letterContent">${letter.description}</p>
    <div class="btns-container">
        <button onclick="updateLetter(${letter.id}, 'minus')">-</button>
        <button onclick="updateLetter(${letter.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteLetter(${letter.id})">delete</button>
    `


    letterContainer.appendChild(letterCard)
}


// fuction to display all letter content
function displayLetters(arr) {
    letterContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createLetterCard(arr[i])
    }
}


// card flip front end js
let cards = document.querySelectorAll('.card');
[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});


form.addEventListener('submit', requestHandlingFront)

getAllLetters()