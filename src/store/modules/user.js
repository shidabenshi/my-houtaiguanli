import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  name: '',
  avatar: ''
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password })
        .then(response => {
          const { token } = response;
          commit('SET_TOKEN', token);
          setToken(token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', '超级管理员');
      commit('SET_AVATAR', 'https://s2.ax1x.com/2019/06/05/VNXWVS.jpg');
      resolve({
        name: '超级管理员',
        avatar: 'https://s2.ax1x.com/2019/06/05/VNXWVS.jpg'
      });
      // getInfo(state.token)
      //   .then(response => {
      //     const { data } = response;
      //     if (!data) {
      //       reject("Verification failed, please Login again.");
      //     }
      //     const { name, avatar } = data;
      //     commit("SET_NAME", name);
      //     commit("SET_AVATAR", avatar);
      //     resolve(data);
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '');
      removeToken();
      resetRouter();
      resolve();
      // logout(state.token)
      //   .then(() => {
      //     commit('SET_TOKEN', '');
      //     removeToken();
      //     resetRouter();
      //     resolve();
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
