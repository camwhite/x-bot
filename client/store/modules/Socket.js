const state = {
  connect: false,
  image: null
}

const mutations = {
  SOCKET_CONNECT: (state,  status) => {
    state.connect = true
  },
  SOCKET_IMAGE: (state,  message) => {
    state.image = image
  }
}

export default {
  state,
  mutations
}
