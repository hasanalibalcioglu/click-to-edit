I needed something simple as this component and here it is.

# Installation
`npm i click-to-edit --save`

# How it works?
Define the content of editable box:  
`<click-to-edit content='Here is the content to be edited!' />`

How do you pass the callback function:  
`<click-to-edit content='Here is the content to be edited!' :callback-fn='myCustomFunction' />`

Choose the type of input for editing:  
`<click-to-edit content='Here is the content to be edited!' input-type='text' />`  
Numeric example:  
`<click-to-edit content='2020' input-type='number' />`