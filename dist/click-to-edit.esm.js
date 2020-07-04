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
//
var script = {
  name: "ClickToEdit",
  props: {
    content: {
      default: 'text'
    },
    options: {
      type: Object,
      default: function () {
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
      default: function () {
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

  data() {
    return {
      editing: false,
      text: this.content,
      validationMessage: false
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
      let validation = this.validator(this.text, this.show, this.reset);

      if (!validation) {
        this.validationFailed = true;
        return;
      }

      this.editing = false;
      this.validationFailed = false;
      this.validationMessage = false;
      if (this.text !== this.content) this.$emit('change', this.text);
    },

    reset() {
      this.text = this.content;
    },

    show(message) {
      this.validationMessage = message;
    }

  },
  watch: {
    content(val) {
      this.text = val;
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

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
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
  }, [_vm.validationMessage && _vm.validationFailed ? _c('div', {
    staticClass: "validation-message"
  }, [_vm._v(_vm._s(_vm.validationMessage))]) : _vm._e(), _vm._v(" "), !_vm.editing ? _c('div', {
    staticClass: "edit-trigger content",
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.startEditing($event);
      }
    }
  }, [_vm._v(_vm._s(_vm.text))]) : _vm._e(), _vm._v(" "), _vm.options.type === 'checkbox' && _vm.editing ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.text,
      expression: "text"
    }],
    ref: "editor",
    class: _vm.validationMessage && 'validation-failed',
    attrs: {
      "id": "click-editor",
      "min": _vm.options.min,
      "max": _vm.options.max,
      "step": _vm.options.step,
      "required": _vm.options.required,
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
  }) : _vm.options.type === 'radio' && _vm.editing ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.text,
      expression: "text"
    }],
    ref: "editor",
    class: _vm.validationMessage && 'validation-failed',
    attrs: {
      "id": "click-editor",
      "min": _vm.options.min,
      "max": _vm.options.max,
      "step": _vm.options.step,
      "required": _vm.options.required,
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
    class: _vm.validationMessage && 'validation-failed',
    attrs: {
      "id": "click-editor",
      "min": _vm.options.min,
      "max": _vm.options.max,
      "step": _vm.options.step,
      "required": _vm.options.required,
      "type": _vm.options.type
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
  }) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-6782cfb6_0", {
    source: ".click-to-edit input[data-v-6782cfb6]{min-width:150px;min-height:30px;border:1px solid #c2c2c2;border-radius:8px;padding-left:10px}.click-to-edit input.validation-failed[data-v-6782cfb6]{border-color:red}.validation-message[data-v-6782cfb6]{color:red;font-size:.7rem;margin-bottom:5px}.content[data-v-6782cfb6]{min-height:30px;line-height:15px;min-width:150px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-6782cfb6";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

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
