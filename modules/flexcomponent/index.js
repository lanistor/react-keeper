import { addElement, removeElement, clearElement } from './FlexElementManager'

export const Flex = {
  add: addElement,
  remove: removeElement,
  clear: clearElement
}

export {
  default as FlexContainer
} from './ElementContainer'
