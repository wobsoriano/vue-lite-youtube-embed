import { h as hDemi, isVue2 } from 'vue-demi'

interface Options {
  props?: Record<any, any>
  domProps?: Record<any, any>
  attrs?: Record<any, any>
  on?: Record<any, any>
}

function adaptOnsV3(ons: Record<string, unknown>) {
  if (!ons)
    return null
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1)
    key = `on${key}`
    return { ...ret, [key]: handler }
  }, {})
}

function h(type: string | Record<string, unknown>, options: Options & any = {}, children?: any) {
  if (isVue2)
    return hDemi(type, options, children)

  const { props, domProps, on, attrs, ...extraOptions } = options
  const ons = adaptOnsV3(on)
  const params = { ...extraOptions, ...props, ...domProps, ...ons, ...attrs }
  return hDemi(type, params, children)
}

export default h
