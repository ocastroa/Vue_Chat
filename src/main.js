// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PubNubVue from 'pubnub-vue'

Vue.config.productionTip = false

const publish_Key = 'pub-c-d654dbd4-5d01-456c-b535-0786258382a2';
const subscribe_Key = 'sub-c-67d4e790-6c35-11e9-89f1-56e8a30b5f0e';
const myUuid = fourCharID();
const me = {
  name: myUuid,
  uuid: myUuid,
};
// console.log(newUUID);
Vue.use(PubNubVue, {
  subscribeKey: subscribe_Key,
  publishKey: publish_Key,
  ssl: true
})

if (!publish_Key || !subscribe_Key) {
  console.error('PubNub Keys are missing.');
}

/**
 * Get a new 4 character ID. This is used in the ChatEngine User configuration
 *     as the 'uuid' property. It is recommended to use a standard 128-bit UUID
 *     in production apps instead.
 *
 * @return {string} A unique ID for ChatEngine, and to give to friends.
 */
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
  components: { App },
  template: '<App/>'
})
