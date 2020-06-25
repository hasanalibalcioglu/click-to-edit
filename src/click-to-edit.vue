<template>
    <div class="click-to-edit">
        <input v-if="editing" :type="inputType" id="click-editor" v-on:focusout="endEditing" v-model="text" ref="editor">
        <div v-if="!editing" @click.prevent="startEditing">{{text}}</div>
    </div>
</template>

<script>
    export default {
        name: "ClickToEdit",
        props: {
            content : { default: 'text'},
            required : {
                type: Boolean,
                default: false
            },
            inputType : {
                type: String,
                default: 'text'
            },
            callbackFn : {
                type : Function,
                default: function () {}
            }
        },
        data(){
            return {
                editing : false,
                text : this.content
            }
        },
        methods: {
            startEditing(){
                this.editing = true
                this.$nextTick(function () {
                    this.$refs.editor.focus()
                })
            },
            endEditing(){
                this.editing = false
                if(this.text == '' && this.required){
                    this.text = this.content
                    return;
                }
                this.callbackFn(this.text)
            }
        }
    }
</script>