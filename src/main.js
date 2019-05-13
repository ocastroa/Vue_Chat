// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store';
import PubNubVue from 'pubnub-vue'

Vue.config.productionTip = false;
 
const publish_Key = 'YOUR_PUBLISH_KEY_HERE';
const subscribe_Key = 'YOUR_SUBSCRIBE_KEY_HERE';

// Make a unique uuid for each client
const myUuid = fourCharID();
const me = {
  uuid: myUuid,
};

try{
  if(!publish_Key || !subscribe_Key){
    throw 'PubNub Keys are missing.';
  }
}
catch(err){
  console.log(err);
}

// Initialize the PubNub client API
Vue.use(PubNubVue, {
  subscribeKey: subscribe_Key,
  publishKey: publish_Key,
  ssl: true
}, store);

// Execute when the Vue instance is created
function created(){
  this.$store.commit('setMe', {me});
}

/**
 * Get a new 4 character ID. It is recommended to use a standard 128-bit UUID
 *     in production apps instead.
 *
 * @return {string} A unique ID for each user.  */

function fourCharID() {
  const maxLength = 4;
  const possible = 'abcdef0123456789';
  let text = '';

  for (let i = 0; i < maxLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  created
})
