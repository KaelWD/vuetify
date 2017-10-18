import Input from '../../mixins/input'

export default {
  name: 'v-file',

  mixins: [Input],

  inheritAttrs: false,

  methods: {
    onChange (e) {
      console.log(e.target.files)
    },
    onInput (e) {
      console.log(e)
    },
    genInput () {
      const data = {
        domProps: {
          type: 'file'
        },
        on: Object.assign({}, this.$listeners, {
          change: this.onChange,
          input: this.onInput
        })
      }

      return this.$createElement('input', data)
    }
  },

  render (h) {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } })
  }
}
