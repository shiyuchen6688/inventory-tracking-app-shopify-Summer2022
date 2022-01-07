const { default: axios } = require("axios")

const itemForm = document.querySelector(".item-form")
const itemNameInput = document.querySelector("item-name")
const itemDescrition = document.querySelector("item-description")
const itemsDiv = document.querySelector(".items")
const loaderItems = document.querySelector(".loader-items")

// Display items onto index.html, get items in strorage from backend api
const displayItems = async () => {
    loaderItems.style.visiblity = 'visible'
    try {
        const result = await axios.get("api/items")
    } catch (error) {
        alert(error)
    }

}


// Add Item Form
itemForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = itemNameInput.value
    const description = itemNameInput.description

    try {
        await axios.post("api/items", { name, description })
        displayItems()
    } catch (error) {
        alert(error)
    }
})