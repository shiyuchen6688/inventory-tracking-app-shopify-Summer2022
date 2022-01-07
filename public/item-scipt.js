const { default: axios } = require("axios")

const id = new URLSearchParams(window.location.search).get('id')
const itemOrgNameDom = document.querySelector(".item-original-name")
const updateItemForm = document.querySelector(".update-item-form")
const itemEditButton = document.querySelector(".item-edit-btn")
const itemEditName = document.querySelector(".item-edit-name")
const itemEditDescription = document.querySelector(".iitem-edit-description")

// get and show information about the selected item
const displayItem = async () => {
    try {
        const result = await axios.get(`api/items/${id}`)
        const { data } = result
        const { item } = data
        const { name, description } = item

        itemOrgNameDom.value = name

    } catch (error) {
        alert(error)
    }
}

displayItem()

// handle update request on item
updateItemForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        const updatedName = itemEditName.value
        const updatedDescription = itemEditDescription.value

        const result = await axios.patch(`/api/tasks/${id}`, {
            name: updatedName,
            description: updatedDescription,
        })

        const { name, description } = result.data.task

        itemOrgNameDom.value = name
        alert(`Succefullly changed name to ${name} and description to ${description}`)

    } catch (error) {
        alert(error)
    }
})