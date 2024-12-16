import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  avatar: '',
}

const changeState = (state = initialState, { type, ...payload }) => {
  switch (type) {
    case 'set':
      return { ...state, ...payload }
    case 'setAvatar':
      return { ...state, avatar: payload.avatar }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
