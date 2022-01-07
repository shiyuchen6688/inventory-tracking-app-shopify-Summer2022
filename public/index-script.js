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
        const { items } = result

        if (loaderItems.length < 1) {
            itemsDiv.innerHTML = "<p>You Don't Have Any Item Yet</p>"
            return
        }

        const itemSegments = items.map((item) => {
            const { name, description } = item
            return `<div class="ui segment">
            <h5>${name}</h5>
            <p>${description}</p>
            <div class="item-buttons">
            <!-- edit link -->
            <a href="item.html?id=${itemID}"  class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${itemID}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>`
        }).join("")

        itemsDiv.innerHTML = itemSegments

    } catch (error) {
        alert(error)
        itemsDiv.innerHTML = "<p>Error</p>"
    }
    loaderItems.style.visiblity = 'hidden'

}

displayItems() // call to display all items at the start

// Delete Task Button
tasksDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
        loaderItems.style.visibility = 'visible'
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/api/items/${id}`)
            displayItems()
        } catch (error) {
            console.log(error)
        }
    }
    loaderItems.style.visibility = 'hidden'
})

// Add Item Form
itemForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = itemNameInput.value
    const description = itemDescrition.value

    try {
        await axios.post("api/items", { name, description })
        displayItems()
    } catch (error) {
        alert(error)
    }
})