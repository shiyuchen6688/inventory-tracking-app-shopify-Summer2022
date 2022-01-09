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
const formAlertDOM = document.querySelector('.form-alert')

// Display items onto index.html, get items in strorage from backend api
const displayItems = async () => {
    loaderItems.style.visiblity = 'visible'
    try {
        const result = await axios.get("api/items")
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

// Script Start Here

displayItems() // call to display all items at the start
formAlertDOM.style.display = 'none' // hide alert at the start

// Delete Task Button
itemsDiv.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        loaderItems.style.visibility = 'visible'
        const id = e.target.dataset.id
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

        itemForm.reset() // clear form
        const result = await axios.post("api/items", {
            name, description, category, weight, sourceAddress, destinationAddress,
            sourcePhone, destinationPhone, delivered
        })
        // TODO: if !result.item and result.message, display error

        displayItems()
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, new item added, you can check it in the list below`
        formAlertDOM.classList.add('positive')
    } catch (error) {
        // alert(error)
        // console.log(error)
        formAlertDOM.classList.add('negative')
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = "error, please check if the required fields are not empty, phone number and weight is valid"
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('positive')
        formAlertDOM.classList.remove('negative')
    }, 3000)
})