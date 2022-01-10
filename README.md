# Where is the application?

The application is hosted using Heroku, click [here](https://inventory-tracker-application.herokuapp.com/).
The link is "https://inventory-tracker-application.herokuapp.com/" just in case clicking here does not work.

# How to use?

## Video Version

This video will demonstrate how to use this application: [video](https://1drv.ms/v/s!AifJ7njqYAoVo6Fg8KOtZvF4YgmlJQ?e=M5vheo)

## Text Version (Only if it’s not convenient to watch the video)

- How to Create?

  The link above will take you to the home page, and there are 3 sections on the home page. The 1st section with title "Create Item Here" is where you can enter data and create inventory items

- How to Read?

  The 2nd section with tittle "List of Items in The Inventory" on the home page is where all the added inventory item will be displayed, and you can read information about them there

- How to Update?

  Again, the 2nd section on the home page lists all the added items, and there are two buttons for each item, click the "edit" button of the inventory item you want to edit. The "edit" button will take you to a new page where you can change the attributes of that item and update it. On the bottom of that page, threre is a button to go back to the home page.

- How to Delete?

  The 2nd section on the home page lists all the added items, and there are two buttons for each item, click the "delete" button of the inventory item you want to delete.

- How to export product to csv?

  In the 3rd section of the home page with tittle "Export Product Data to CSV", there is a "Download CSV" button, click the button to export and download inventory item information into products.csv.

# Extra Explanations:

## Each inventory item have the following attributes:

- id: used to identify an item
- name: name of item
- weight: weight of item in the inventory
- category: category of this item
- sourceAddress: source address of this item
- sourcePhone: phone number of source
- destinationAddress: destination address of this item
- destinationPhone: phone number of destination
- delivered: true if item is already delievered to destination
- description: any other description for this item
- dateCreated: first creation date of this item
