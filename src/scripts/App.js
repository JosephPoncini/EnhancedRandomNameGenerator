import { getlocalStorage, removeFromLocalStorage, saveToLocalStorage } from "./LocalStorage.js";


let addNameBtn = document.getElementById("addNameBtn");
let randomGroupBtn = document.getElementById("randomGroupBtn");

let namesGoHere = document.getElementById("namesGoHere");
let groupsGoHere = document.getElementById("groupsGoHere");

let nameHere = document.getElementById("nameHere");
let groupSlider = document.getElementById("groupSlider");

let totalPeople = document.getElementById("totalPeople");
let sliderValue = document.getElementById("sliderValue");

let getRandNameBtn = document.getElementById("getRandNameBtn");
let modalTitle = document.getElementById("modalTitle");

let genRandNameBtn = document.getElementById("genRandNameBtn");

const FetchRandomName = async () => {
    const promise = await fetch('https://randomuser.me/api/')
    const data = await promise.json();
    return data;
}

const saveName = () => {
    let name = nameHere.value;
    let people = getlocalStorage();
    if (name && !people.includes(name)) {
        saveToLocalStorage(name);
    }
}

const addName = (name) => {
    // let name = nameHere.value;
    // console.log(name)

    let personContainer = document.createElement("div");
    personContainer.classList = "flex flex-row justify-between w-full border-b-2 border-white pt-3 pb-2 items-center px-[5%]";

    let nameTag = document.createElement("div");
    nameTag.classList = "text-xl"
    nameTag.innerText = name;

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove"
    removeBtn.classList = "removeBtn";
    removeBtn.type = "button";

    removeBtn.addEventListener("click", () => {
        removeFromLocalStorage(name);
        loadNames();
    })

    personContainer.appendChild(nameTag);
    personContainer.appendChild(removeBtn);




    namesGoHere.appendChild(personContainer);
}

const loadNames = () => {

    namesGoHere.innerHTML = "";
    let people = getlocalStorage();
    totalPeople.innerText = `Total People: ${people.length}`
    loadSlider(people.length);
    people.forEach(person => {
        addName(person)
    })
}

const loadSlider = (num) => {
    if (num > 1) {
        groupSlider.disabled = false;
        groupSlider.max = `${num}`;
        sliderValue.innerText = groupSlider.value
    } else {
        groupSlider.disabled = true;
        sliderValue.innerText = `#`;
    }
}

const getGroups = () => {
    let people = getlocalStorage();
    let total = people.length;
    let num = groupSlider.value;

    let randPeopleArray = randomizedList(people);

    let GroupsArray = [];
    let numOfGroups = getNumOfGroups(num, total)

    for (let i = 0; i < numOfGroups; i++) {
        GroupsArray.push([]);
    }

    let counter = 0;

    randPeopleArray.forEach((person) => {
        let index = Math.floor(counter / num);
        if (index == numOfGroups) {
            GroupsArray[0].push(person)
        } else {
            GroupsArray[index].push(person)
        }
        counter++;
    })

    // console.log(GroupsArray);

    return GroupsArray;

}

const displayGroups = (groups) => {
    modalTitle.innerText = "Groups:"
    groupsGoHere.innerHTML = "";
    let counter = 0;
    groups.forEach(group => {
        counter++;
        let names = "";
        group.forEach(person => {
            names += person + ", "
        })
        let nameList = document.createElement("p");
        nameList.classList = "text-white text-xl tabbed tw-full break-words";
        nameList.innerText = `Group ${counter}: \t` + names.substring(0, names.length - 2);
        groupsGoHere.appendChild(nameList);
    })
}

const getNumOfGroups = (num, total) => {
    let remainder = total % num;

    if (remainder > 1) {
        console.log(Math.floor(total / num) + 1);
        return Math.floor(total / num) + 1;
    }
    console.log(Math.floor(total / num));
    return Math.floor(total / num);

}

const randomizedList = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

const getRandomName = () => {
    let people = getlocalStorage();
    let total = people.length;
    let randIndex = Math.floor(Math.random() * total);

    return people[randIndex];
}

const displayRandomName = (randName) => {
    if (randName) {
        modalTitle.innerText = "Randomly Selected Name:"
        groupsGoHere.innerHTML = "";
        let nameList = document.createElement("div");
        nameList.classList = "text-white text-xl tabbed tracking-wider";
        nameList.innerText = `\t` + randName;
        groupsGoHere.appendChild(nameList);
    } else {
        modalTitle.innerText = "Randomly Selected Name:"
        groupsGoHere.innerHTML = "";
        let nameList = document.createElement("div");
        nameList.classList = "text-white text-xl tabbed tracking-wider";
        nameList.innerText = `\t` + "No Names to Select";
        groupsGoHere.appendChild(nameList);
    }


}

const genRandName = async () => {
    let data = await FetchRandomName();
    // console.log(data.results[0].name.first + " " + data.results[0].name.last)
    let name = data.results[0].name.first 

    saveRandomName(name);
    loadNames();
}

const saveRandomName = (name) => {
    let people = getlocalStorage();
    if (name && !people.includes(name)) {
        saveToLocalStorage(name);
    }
}

const genRandNameBtnFunction = async () => {
    let randName = await genRandName();
    saveRandomName(randName);
    loadNames();
}

groupSlider.addEventListener("click", () => {
    sliderValue.innerText = groupSlider.value
})

nameHere.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        saveName();
        loadNames();
        nameHere.value = ""
    }
})

addNameBtn.addEventListener("click", () => {
    saveName();
    loadNames();
    nameHere.value = ""
})

randomGroupBtn.addEventListener("click", () => {
    let groups = getGroups();
    displayGroups(groups);
})

getRandNameBtn.addEventListener("click", () => {
    let randName = getRandomName();
    displayRandomName(randName)
})

genRandNameBtn.addEventListener("click", () => {
    let randName = genRandName();
    // saveRandomName(randName);
    // loadNames();
})


loadNames();