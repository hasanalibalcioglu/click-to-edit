
I needed something simple as this component and here it is.

# Installation

`npm i click-to-edit --save`

  

# How it works?

Define the content of editable box:

`<click-to-edit content='Here is the content to be edited!' />`


How do you pass the callback function:

The content of input will be passed as parameter

    //This is the callback function to be used in the end of editing action.
    myCustomFunction(editedContent){
	    console.log(editedContent)
    }

`<click-to-edit content='Here is the content to be edited!' :callback-fn='myCustomFunction' />`

  

Choose the type of input for editing:

`<click-to-edit content='Here is the content to be edited!' input-type='text' />`

Numeric example:

`<click-to-edit content='2020' input-type='number' />`

## Styling
CSS selector of input:

> .click-to-edit > input

