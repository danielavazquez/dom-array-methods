const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//*First pull in all the DOM elements then we need each of these inputs through const variables
//*Second add event listeners that call specific functions
//*Third create getRandomUser function
//*Fourth create addData function
//*Fifth want the users being created in the above steps to displayed in the DOM, in addData function call another function updateDOM
//*Sixth create Formatmoney function to format the randomly generated numbers
//*Seventh Add addUserBtn eventListener 
//*Eighth Add doubltBtn eventListener and doubleMoney function using Map();
//*Ninth Add sortBtn eventListener and sortByRichest function using sort();
//*Tenth Add showMillionairesBtn eventListener and showMillionaires function using sort();
//*Eleventh Add calculateWealthBtn eventListener and calculateWealth function using reduce();

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and add money
//put fetch into a variable called res for response, fetch is async and happens behind the scenes so it returns a promise once its finished
//have to put await in front of it since its running in the background
//set data variable by calling res.jason so create another variable called data
//set a variable called user set it to data we get back and then the results array with the first item in the array

//create a newUser object:
//for name from the API call which is an object with a name.first and name.last template literal so it gives us a random first and last name
//for money generate a random number up to 1 million have a number rounded down (generating a random decimal) * 1 million

//take newUser variable and pass it into a function called addData(newUser);

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json()

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

//Double eveyones money
//use data arr from above because that's where stuff is getting stored and since it used let we can reassign it, then return the same thing and reassign that doubled data value
//take data arr and set it to same data arr and map through it using a function saying for each iteration return an object and copy everything name and money
//use spread operator to copy what we have in the user object
//need to call updateDOM(); everytime we want to change something
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by richest
//use data arr and pass in a compare function (a must when using sort) that sorts in descending richest to poorest first
function sortByRichest() {
  console.log(123);
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
//take the data arr and can reassign it we used let 
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
//create variable set equal to data arr takes an accumulator and also our userand returns acc append user.money and start at 0
//create wealthE1 to get it displayed on DOM, createElement and set innerHTML to `` an h3 Total Wealth
//main.appendChild(wealthE1)
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}




//Add new object to data array:
//take the data array and call the push method that pushes something onto the end of an array
function addData(obj) {
  data.push(obj);

  updateDOM();
}


//Update DOM:
//has providedData parameter because in the updateDOM(); used above we are not passing in anything if we don't pass anything we want a default value of the data arr
//Take providedData and loop through it
//Will create a brand new element for each of the randomly generated people
//Want to add a class onto the new div created called person
//Fill it in with whatever HTML we want in there in the format we constructed in getRandomUser then we added it to the array addData(obj) function and looping through it
//To actually insert it into the domain appendChild

function updateDOM(providedData = data) {
  //Clear main div don't want to keep adding to it
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'; //set main to its default this is clearing it

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
//Copied code that uses reg expression and takes in a number adds two decimals with toFixed and formats it
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);