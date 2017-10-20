import Input from '../../mixins/input'

export default {
  name: 'v-file',

  mixins: [Input],

  inheritAttrs: false,

  data: () => ({
    //
  }),

  props: {
    multiple: Boolean
  },

  computed: {
    computedPlaceholder () {
      return this.placeholder || (this.multiple ? 'Choose Files...' : 'Choose File...')
    },
    computedSelections () {
      //
    }
  },

  methods: {
    onChange (e) {
      if (this.multiple) {
        const filesCount = e.target.files.length
        const files = []
        for (let i = 0; i < filesCount; ++i) {
          files.push(e.target.files.item(i))
        }
        this.lazyValue = files
      } else {
        this.lazyValue = e.target.files.item(0)
      }
      this.$emit('input', this.lazyValue)
    },
    onClick (e) {
      this.$refs.input.click()
    },
    onInput (e) {
      console.log(e)
    },
    genInput () {
      const data = {
        attrs: this.$attrs,
        domProps: {
          type: 'file',
          multiple: this.multiple
        },
        style: { display: 'none' },
        on: {
          change: this.onChange,
          input: this.onInput
        },
        ref: 'input'
      }

      return this.$createElement('input', data)
    },
    genSelections () {
      return this.$createElement('div', {
        staticClass: 'input-group__selections',
        style: { overflow: 'hidden' },
        on: {
          click: this.onClick
        },
        ref: 'activator'
      }, this.computedPlaceholder)
    }
  },

  render (h) {
    return this.genInputGroup([this.genSelections(), this.genInput()], { attrs: { tabindex: false } })
  }
}
