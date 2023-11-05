const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

let myLeads = [];
let listItems = "";

// store tab functionality only works inside of chrome, when run as an extension
const storeTab = () => {
  let activeTab = "";
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    activeTab = tabs[0].url;
    saveInput(activeTab);
  });
};

const renderLeads = (leads) => {
  listItems = "";
  leads.map((item) => {
    listItems += `<li><a href="${item}" target="_blank">${item}</a></li>`;
  });
  ulEl.innerHTML = listItems;
};

const renderStoredLeads = () => {
  if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
  }
  renderLeads(myLeads);
};
renderStoredLeads();

const saveInput = (newLead) => {
  if (newLead !== "") {
    myLeads.push(newLead);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    newLead = "";
    inputEl.value = "";
  } else {
    console.log("The input field is invalid");
  }
  renderLeads(myLeads);
};

const clearLocalStorage = () => {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
};

inputBtn.addEventListener("click", () => saveInput(inputEl.value));
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveInput();
  }
});

deleteBtn.addEventListener("dblclick", () => clearLocalStorage());

tabBtn.addEventListener("click", () => storeTab());

// something to explore later
// const urlRegex =
//   /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
// the regex check for some reason didn't pass into the if else statement, might have to try with async/await later, very weird

//   let regexCheck = urlRegex.test(newLead);
//   console.log(newLead, regexCheck);
