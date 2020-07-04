
I needed something simple as this component and here it is.

# Installation

`npm i click-to-edit --save`

  

# How it works?

Define the content of editable box:

`<click-to-edit v-model='testVariable' />`

## Callback
The content of input will be passed as parameter:
```vue
<click-to-edit v-model='testVariable' @change="updateDB" />
```

## Validation
```vue 
<click-to-edit v-model='testVariable' @change="updateDB" :validator="customValidator"/>
```
This will be changed with default validation function which is:
```javascript 
validator: {
    type: Function,
    default: function () {
        if(this.text === '' && this.options.required){
            this.reset();
            return false;
        }
        return true;
    }
}
```
## Options
```javascript 
options: {
    type: 'text', // type of the editor input
    // min: 1, // attributes for type number input
    // max: 5, // attributes for type number input
    // step: 1, // attributes for type number input
    // required: true // No need if you use your own validator function
}
```
```vue 
<click-to-edit v-model='testVariable' @change="updateDB" :validator="customValidator"  :options="options"/>
```

### General Look Of Usage
```vue 
export default Vue.extend({
  name: 'ServeDev',
  components: {
    ClickToEdit,
  },
  data(){
    return {
      testVariable: "Here is the text to be edited!",
      options: {
        type: 'text',
        // min: 1,
        // max: 5,
        // step: 1,
        // required: true // No need if you use your own validator function
      }
    }
  },
  methods:{
    updateDB(val){
      console.log(val);
      this.testVariable = val;
      // and some requests
    },
    customValidator(message, validation, reset){
      if (message === 'not accepted things' || message === ''){
        reset(); // Reset the input value to last valid state
        validation('Try something else!'); // Validation message to be shown bellow input
        return false;
      }
      return true;
    }
  }
});
</script>

<template>
  <div id="app">
    <click-to-edit v-model="testVariable" @change="updateDB" :validator="customValidator" :options="options"></click-to-edit>
  </div>
</template>
```
## Styling
CSS selectors:
```
.click-to-edit input
.click-to-edit input.validation-failed
.validation-message
.content
```

