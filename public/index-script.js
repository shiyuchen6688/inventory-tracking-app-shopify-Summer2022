const itemForm = document.querySelector(".item-form")
const itemNameInput = document.querySelector(".item-name")
const itemWeightInput = document.querySelector(".item-weight")
const itemCategoryInput = document.querySelector(".item-category")
const itemSrcAddrInput = document.querySelector(".item-src-addr")
const itemSrcPhoneInput = document.querySelector(".item-src-phone")
const itemDestAddrInput = document.querySelector(".item-dest-addr")
const itemDestPhoneInput = document.querySelector(".item-dest-phone")
const itemDelieveredInput = document.querySelector(".item-delivered")
const itemDescrition = document.querySelector(".item-description")
const itemsDiv = document.querySelector(".items")
const loaderItems = document.querySelector(".loader-items")

// Display items onto index.html, get items in strorage from backend api
const displayItems = async () => {
    loaderItems.style.visiblity = 'visible'
    try {
        const result = await axios.get("api/items")
        console.log(result)
        const { items } = result.data

        if (items.length < 1) {
            itemsDiv.innerHTML = `<h5 class="ui inverted header">You Don't Have Any Item Yet</h5>`
            return
        }

        const itemSegments = items.map((item) => {
            const { _id, name, description, weight, category, dateCreated, sourceAddress, sourcePhone, destinationAddress, destinationPhone,
                delivered } = item
            let deliveredStr;
            if (Boolean(delivered) === true)
                deliveredStr = "Yes"
            else
                deliveredStr = "No"


            return `
            <div class="ui segment">
            <h4 class="ui dividing header">Name: ${name}</h5>
            <p>Weight: ${weight}</h5>
            <p>Category: ${category}</h5>
            <p>Date Created: ${dateCreated}</h5>
            <p>Source Address: ${sourceAddress}</h5>
            <p>Source Phone: ${sourcePhone}</h5>
            <p>Destination Address: ${destinationAddress}</h5>
            <p>Destination Phone: ${destinationPhone}</h5>
            <p>Delivered: ${deliveredStr}</h5>
            <p>Date Created: ${dateCreated}</h5>
            <p>Description: ${description}</p>
                <div class="ui buttons">

                    <a href="item.html?id=${_id}"  class="ui green button">
                    edit
                    </a>

                    <div class="or"></div>

                    <button type="button" class="ui button red delete-btn" data-id="${_id}">
                    delete
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
itemsDiv.addEventListener('click', async (e) => {
    console.log("Item Clicked")
    console.log(e.target.classList)
    console.log(e.target.parentElement.classList.contains('delete-btn'))
    if (e.target.classList.contains('delete-btn')) {
        console.log("Delete button clicked")
        loaderItems.style.visibility = 'visible'
        const id = e.target.dataset.id
        console.log(id)
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
    try {
        const name = itemNameInput.value
        const category = itemCategoryInput.value
        const weight = Number(itemWeightInput.value)
        const sourceAddress = itemSrcAddrInput.value
        const destinationAddress = itemDestAddrInput.value
        const sourcePhone = itemSrcPhoneInput.value
        const destinationPhone = itemDestPhoneInput.value
        const delivered = itemDelieveredInput.checked
        const description = itemDescrition.value

        await axios.post("api/items", {
            name, description, category, weight, sourceAddress, destinationAddress,
            sourcePhone, destinationPhone, delivered
        })
        alert("success, new item added, you can see it in the list below")
        displayItems()
    } catch (error) {
        alert(error)
    }
})