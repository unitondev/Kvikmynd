export const conditionalPropType = (condition) => {
  if (typeof condition !== 'function')
    return new Error("Wrong argument type 'condition' supplied to 'conditionalPropType'")
  return function (props, propName, componentName) {
    if (condition(props, propName, componentName)) {
      return new Error(
        `Invalid prop '${propName}' '${props[propName]}' supplied to '${componentName}'.`
      )
    }
  }
}
