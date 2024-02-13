const saveToLocalStorage = (person) => {

    let people = getlocalStorage();

    if (!people.includes(person)) {
        people.push(person);
    }

    localStorage.setItem("People", JSON.stringify(people));
}

const getlocalStorage = () => {

    let localStorageData = localStorage.getItem("People");

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (person) => {

    let people = getlocalStorage();

    let namedIndex = people.indexOf(person);

    people.splice(namedIndex, 1);

    localStorage.setItem("People", JSON.stringify(people))

}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage}