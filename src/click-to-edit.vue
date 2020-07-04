<template>
    <div class="click-to-edit">
        <div class="validation-message" v-if="validationMessage && validationFailed">{{validationMessage}}</div>
        <div v-if="!editing" class="edit-trigger content" @click.prevent="startEditing">{{text}}</div>
        <input
                v-if="editing"
                id="click-editor"
                :type="options.type"
                :min="options.min"
                :max="options.max"
                :step="options.step"
                :required="options.required"
                v-on:focusout="endEditing"
                v-model="text" ref="editor"
                :class="validationMessage && 'validation-failed'"
        >
    </div>
</template>

<script>
    export default {
        name: "ClickToEdit",
        props: {
            content : { default: 'text'},
            options: {
                type: Object,
                default: function () {
                    return {
                        type: 'number',
                        min: false,
                        max: false,
                        step: false,
                        required: false,

                    }
                }
            },
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
        },
        model: {
            prop:'content',
            event: 'change'
        },
        data(){
            return {
                editing : false,
                text : this.content,
                validationMessage: false
            }
        },
        methods: {
            startEditing(){
                this.editing = true;
                this.$nextTick(function () {
                    this.$refs.editor.focus()
                })
            },
            endEditing(){

                let validation = this.validator(this.text, this.show, this.reset);
                if(!validation){
                    this.validationFailed = true;
                    return;
                }

                this.editing = false;
                this.validationFailed = false;
                this.validationMessage = false;

                if (this.text !== this.content)
                    this.$emit('change', this.text)

            },
            reset(){
                this.text = this.content;
            },
            show(message){
                this.validationMessage = message
            }
        },
        watch:{
            content(val){
                this.text = val;
            }
        }
    }
</script>

<style scoped>
    .click-to-edit input{
        min-width: 150px;
        min-height: 30px;
        border: 1px solid #c2c2c2;
        border-radius: 8px;
        padding-left: 10px;
    }
    .click-to-edit input.validation-failed{
        border-color: red;
    }
    .validation-message{
        color: red;
        font-size: 0.7rem;
        margin-bottom: 5px;
    }
    .content{
        min-height: 30px;
        line-height: 15px;
        min-width: 150px;
        /*display: flex;*/
        /*align-items: center;*/
        /*padding-left: 10px;*/
        /*border: 1px solid #c2c2c2;*/
        /*border-radius: 8px;*/
    }
</style>