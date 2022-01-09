const id = new URLSearchParams(window.location.search).get('id')
const itemOrgNameDom = document.querySelector(".item-original-info")
const updateItemForm = document.querySelector(".update-item-form")
const itemEditButton = document.querySelector(".item-edit-btn")
const itemEditName = document.querySelector(".item-edit-name")
const itemEditWeight = document.querySelector(".item-edit-weight")
const itemEditSourceAddress = document.querySelector(".item-edit-src-addr")
const itemEditSourcePhone = document.querySelector(".item-edit-src-phone")
const itemEditDestAddress = document.querySelector(".item-edit-dest-addr")
const itemEditDestPhone = document.querySelector(".item-edit-dest-phone")
const itemEditDelievered = document.querySelector(".item-edit-delivered")
const itemEditCategory = document.querySelector(".item-edit-category")
const itemEditDescription = document.querySelector(".item-edit-description")
const formAlertDOM = document.querySelector('.form-alert')

// get and show information about the selected item
const displayItem = async () => {
    try {
        const result = await axios.get(`/api/items/${id}`)
        const { data } = result
        const { item } = data
        const {
            name, description, category, weight, sourceAddress, destinationAddress,
            sourcePhone, destinationPhone, delivered
        } = item[0]

        let deliveredStr;
        if (Boolean(delivered) === true)
            deliveredStr = "Yes"
        else
            deliveredStr = "No"

        const itemInfo = ("Original Item: <br/>" +
            `Name: ${name} <br/>` +
            `Category: ${category} <br/>` +
            `Weight: ${weight} <br/>` +
            `Source Address: ${sourceAddress} <br/>` +
            `Source Phone: ${sourcePhone} <br/>` +
            `Destination Address: ${destinationAddress} <br/>` +
            `Destination Phone: ${destinationPhone} <br/>` +
            `Delivered: ${deliveredStr} <br/>` +
            `Description: ${description} `)

        itemOrgNameDom.innerHTML = itemInfo

        // populate form with original values
        itemEditName.value = name
        itemEditWeight.value = weight
        itemEditCategory.value = category
        itemEditSourceAddress.value = sourceAddress
        itemEditSourcePhone.value = sourcePhone
        itemEditDestAddress.value = destinationAddress
        itemEditDestPhone.value = destinationPhone
        itemEditDelievered.checked = (Boolean(delivered) === true)
        itemEditDescription.value = description

    } catch (error) {
        alert(error)
    }
}

// Script Start Here

displayItem()
formAlertDOM.style.display = 'none' // hide alert at the start


// handle update request on item
updateItemForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        const updatedName = itemEditName.value
        const updatedWeight = Number(itemEditWeight.value)
        const updatedSrcAddr = itemEditSourceAddress.value
        const updatedSrcPhone = itemEditSourcePhone.value
        const updatedDestAddr = itemEditDestAddress.value
        const updatedDestPhone = itemEditDestPhone.value
        const updatedDelievered = itemEditDelievered.checked
        const updatedCategory = itemEditCategory.value
        const updatedDescription = itemEditDescription.value
        console.log(updatedDescription)


        const result = await axios.put(`/api/items/${id}`, {
            name: updatedName,
            weight: updatedWeight,
            sourceAddress: updatedSrcAddr,
            sourcePhone: updatedSrcPhone,
            destinationAddress: updatedDestAddr,
            destinationPhone: updatedDestPhone,
            delivered: updatedDelievered,
            category: updatedCategory,
            description: updatedDescription,
        })


        // alert(`success, if you're done, press the Back Home button at the bottom`)
        displayItem()
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, if you're done, press the Back Home button at the bottom`
        formAlertDOM.classList.add('positive')
    } catch (error) {
        // console.log(error)
        formAlertDOM.classList.add('negative')
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = "error, please try again later"
    }

    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('positive')
        formAlertDOM.classList.remove('negative')
    }, 3000)
})

