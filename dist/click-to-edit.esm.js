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
    required: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    callbackFn: {
      type: Function,
      default: function () {}
    }
  },

  data() {
    return {
      editing: false,
      text: this.content
    };
  },

  methods: {
    startEditing() {
      this.editing = true;
      this.$nextTick(function () {
        this.$refs.editor.focus();
      });
    },

    endEditing() {
      this.editing = false;

      if (this.text == '' && this.required) {
        this.text = this.content;
        return;
      }

      this.callbackFn(this.text);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "click-to-edit"
  }, [_vm.inputType === 'checkbox' && _vm.editing ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.text,
      expression: "text"
    }],
    ref: "editor",
    attrs: {
      "id": "click-editor",
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.text) ? _vm._i(_vm.text, null) > -1 : _vm.text
    },
    on: {
      "focusout": _vm.endEditing,
      "change": function ($event) {
        var $$a = _vm.text,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.text = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.text = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.text = $$c;
        }
      }
    }
  }) : _vm.inputType === 'radio' && _vm.editing ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.text,
      expression: "text"
    }],
    ref: "editor",
    attrs: {
      "id": "click-editor",
      "type": "radio"
    },
    domProps: {
      "checked": _vm._q(_vm.text, null)
    },
    on: {
      "focusout": _vm.endEditing,
      "change": function ($event) {
        _vm.text = null;
      }
    }
  }) : _vm.editing ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.text,
      expression: "text"
    }],
    ref: "editor",
    attrs: {
      "id": "click-editor",
      "type": _vm.inputType
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "focusout": _vm.endEditing,
      "input": function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.text = $event.target.value;
      }
    }
  }) : _vm._e(), _vm._v(" "), !_vm.editing ? _c('div', {
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.startEditing($event);
      }
    }
  }, [_vm._v(_vm._s(_vm.text))]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

// Import vue component

const install = function installClickToEdit(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ClickToEdit', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
