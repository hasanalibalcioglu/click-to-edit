'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "ClickToEdit",
  props: {
    content: {
      default: 'text'
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          type: 'number',
          min: false,
          max: false,
          step: false,
          required: false
        };
      }
    },
    validator: {
      type: Function,
      default: function _default() {
        if (this.text === '' && this.options.required) {
          this.reset();
          return false;
        }

        return true;
      }
    }
  },
  model: {
    prop: 'content',
    event: 'change'
  },
  data: function data() {
    return {
      editing: false,
      text: this.content,
      validationMessage: false
    };
  },
  methods: {
    startEditing: function startEditing() {
      this.editing = true;
      this.$nextTick(function () {
        this.$refs.editor.focus();
      });
    },
    endEditing: function endEditing() {
      var validation = this.validator(this.text, this.show, this.reset);

      if (!validation) {
        this.validationFailed = true;
        return;
      }

      this.editing = false;
      this.validationFailed = false;
      this.validationMessage = false;
      if (this.text !== this.content) this.$emit('change', this.text);
    },
    reset: function reset() {
      this.text = this.content;
    },
    show: function show(message) {
      this.validationMessage = message;
    }
  },
  watch: {
    content: function content(val) {
      this.text = val;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "click-to-edit"
  }, [_vm._ssrNode((_vm.validationMessage && _vm.validationFailed ? "<div class=\"validation-message\" data-v-6782cfb6>" + _vm._ssrEscape(_vm._s(_vm.validationMessage)) + "</div>" : "<!---->") + " " + (!_vm.editing ? "<div class=\"edit-trigger content\" data-v-6782cfb6>" + _vm._ssrEscape(_vm._s(_vm.text)) + "</div>" : "<!---->") + " " + (_vm.options.type === 'checkbox' && _vm.editing ? "<input id=\"click-editor\"" + _vm._ssrAttr("min", _vm.options.min) + _vm._ssrAttr("max", _vm.options.max) + _vm._ssrAttr("step", _vm.options.step) + _vm._ssrAttr("required", _vm.options.required) + " type=\"checkbox\"" + _vm._ssrAttr("checked", Array.isArray(_vm.text) ? _vm._i(_vm.text, null) > -1 : _vm.text) + _vm._ssrClass(null, _vm.validationMessage && 'validation-failed') + " data-v-6782cfb6>" : _vm.options.type === 'radio' && _vm.editing ? "<input id=\"click-editor\"" + _vm._ssrAttr("min", _vm.options.min) + _vm._ssrAttr("max", _vm.options.max) + _vm._ssrAttr("step", _vm.options.step) + _vm._ssrAttr("required", _vm.options.required) + " type=\"radio\"" + _vm._ssrAttr("checked", _vm._q(_vm.text, null)) + _vm._ssrClass(null, _vm.validationMessage && 'validation-failed') + " data-v-6782cfb6>" : _vm.editing ? "<input id=\"click-editor\"" + _vm._ssrAttr("min", _vm.options.min) + _vm._ssrAttr("max", _vm.options.max) + _vm._ssrAttr("step", _vm.options.step) + _vm._ssrAttr("required", _vm.options.required) + _vm._ssrAttr("type", _vm.options.type) + _vm._ssrAttr("value", _vm.text) + _vm._ssrClass(null, _vm.validationMessage && 'validation-failed') + " data-v-6782cfb6>" : "<!---->"))]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6782cfb6_0", {
    source: ".click-to-edit input[data-v-6782cfb6]{min-width:150px;min-height:30px;border:1px solid #c2c2c2;border-radius:8px;padding-left:10px}.click-to-edit input.validation-failed[data-v-6782cfb6]{border-color:red}.validation-message[data-v-6782cfb6]{color:red;font-size:.7rem;margin-bottom:5px}.content[data-v-6782cfb6]{min-height:30px;line-height:15px;min-width:150px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-6782cfb6";
/* module identifier */

var __vue_module_identifier__ = "data-v-6782cfb6";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installClickToEdit(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ClickToEdit', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;