const PAGE_HOME          = 'index';
const PAGE_GALLERY       = 'gallery-id';
const PAGE_CONTACTS      = 'contacts';

export const state = {
  pageCurrent: PAGE_HOME,
  pagePrev: PAGE_HOME,

  loadProgress: 0,

  timeoutId: null,
  ready: null,

  menuOpened: true,
  menuFixed: true,
  menuRightOpened: false,
  disableLoader: false
}

export const mutations = {
  pageOpen(state, payload) {
    const to = payload.to;
    const from = payload.from || {};

    let menuOpened = false;
    if (to.name == PAGE_HOME || to.name == PAGE_CONTACTS)
      menuOpened = true;

    let loadProgress = 0;

    let pagePrev = from.name ? from.name : state.pagePrev;
    let prevParams = from.params ? from.params : state.prevParams;

    state.pageCurrent = to.name;
    state.pagePrev = pagePrev;
    state.prevParams = prevParams;
    state.loadProgress = loadProgress;
    state.menuOpened = menuOpened;
    state.menuFixed = menuOpened;
    state.menuRightOpened = false
  },

  menuOpen(state) {
    state.menuOpened = true;
    state.menuRightOpened = false;
  },

  makeMenuUnfixed(state) {
    state.menuFixed = false;
  },

  hideLoader(state) {
    state.disableLoader = false
  },

  showLoader(state) {
    state.disableLoader = true;
  },

  makeMenuFixed(state) {
    state.menuFixed = true;
  },

  menuClose(state) {
    state.menuOpened = false;
  },

  menuRightOpen(state) {
    state.menuRightOpened = true
  },

  menuRightClose(state) {
    state.menuRightOpened = false;
  },

  onLoad(state, progress) {
    if (progress === 100) { 
      state.ready.then(() => {
        state.loadProgress = 100
      })
    }
    if (progress > state.loadProgress && progress !== 100) {
      state.loadProgress = progress
    }
    else {
      return state;
    }
  }
}

export const actions = {
  throttle({state}) {
    state.ready = new Promise((res, rej) => {
      setTimeout(() => res('result'), 3000);
    })
  },

  // setThrottle({commit, dispatch}, payload) {
  //   dispatch('throttle');
  //   commit('pageOpen', payload);
  // }
}