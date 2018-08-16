import React, { Component, createContext } from 'react';
import axios from 'axios';

const Store = createContext();
const { Provider, Consumer: WettyConsumer } = Store;

class WettyProvider extends Component {
  actions = {
    getDashboardList: async () => {
      return await axios.get('/proxy/dashboard');
    },

    getDashboardOne: async (id, pageNum) => {
      return await axios.get(`/proxy/dashboard/${id}?page=${pageNum}`);
    },

    getGraphOne: async (dashboardNo, graphId) => {
      return await axios.get(
        `/proxy/dashboard/${dashboardNo}/graph/${graphId}`,
      );
    },

    getFromLocalStorage(key) {
      let localStorage = {};
      if (global.localStorage) {
        try {
          localStorage = JSON.parse(global.localStorage.getItem(key)) || {};
        } catch (e) {
          /*Ignore*/
        }
      }
      return localStorage[key];
    },

    saveToLocalStorage(key, value) {
      if (global.localStorage) {
        global.localStorage.setItem(
          key,
          JSON.stringify({
            [key]: value,
          }),
        );
      }
    },

    getAllLocalStorage() {
      for (var i = 0, len = global.localStorage.length; i < len; ++i) {}
    },

    // removeLocalStorage(keyList) {
    //   for (var i = 0, len = global.localStorage.length; i < len; ++i) {
    //     for (var j = 0, keyLen = keyList.length; j < keyLen; ++j) {
    //       if (
    //         global.localStorage.getItem(i) === global.localStorage.getItem(j) {
    //           global.localStorage.removeItem()
    //         }
    //       );
    //     }
    //   }
    // },
  };

  render() {
    const { state, actions } = this;

    const value = {
      state,
      actions,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const withContext = Component => {
  return props => {
    return (
      <WettyConsumer>
        {value => {
          return <Component {...props} value={value} />;
        }}
      </WettyConsumer>
    );
  };
};

export { WettyProvider, WettyConsumer, withContext };
