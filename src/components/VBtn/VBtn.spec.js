import { mount } from 'avoriaz'
import { compileToFunctions } from 'vue-template-compiler'
import { test } from '~util/testing'
import Vue from 'vue'
import VBtn from '~components/VBtn'
import VProgressCircular from '~components/VProgressCircular'

const stub = {
  name: 'router-link',
  render: h => h('button')
}

test('VBtn.js', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VBtn)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color prop and match snapshot', () => {
    const wrapper1 = mount(VBtn, {
      propsData: {
        color: 'green darken-1'
      }
    })

    expect(wrapper1.html()).toMatchSnapshot()

    const wrapper2 = mount(VBtn, {
      propsData: {
        color: 'green darken-1',
        flat: true
      }
    })

    expect(wrapper2.html()).toMatchSnapshot()
  })

  it('should render component with loader slot and match snapshot', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        loading: true
      },
      slots: {
        loader: [compileToFunctions('<span>loader</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with loader and match snapshot', () => {
    const wrapper = mount(VBtn, {
      components: {
        VProgressCircular
      },
      propsData: {
        loading: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an <a> tag when using href prop', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        href: 'http://www.google.com'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.getAttribute('href')).toBe('http://www.google.com')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a <button> tag when using to prop', () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)

    const wrapper = mount(VBtn, {
      propsData: {
        to: '/home'
      },
      instance
    })

    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.vm.$props.to).toBe('/home')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render specified tag when using tag prop', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        tag: 'a'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})