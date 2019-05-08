<template>
  <div class="chat-container">
    <div class="heading">
      <h1>{{title + '- User: ' + uuid }}</h1>
    </div>
    <div class="body">
      <div class="table">
        <chat-log></chat-log>
        <message-input></message-input>
      </div>
    </div>
  </div>
</template>

<script>
  import ChatLog from '@/components/ChatLog';
  import MessageInput from '@/components/MessageInput';
  import PubNubVue from 'pubnub-vue';
  import {mapGetters} from 'vuex';

  function fetchHistory(store){
    PubNubVue.getInstance().history(
        {
          channel: 'vueChat',
          count: 6, // how many items to fetch
          stringifiedTimeToken: true, // false is the default
        },
        function(status, response) {
          const msgs = response.messages;
          // Iterate msgs array and save each element in history
          msgs.forEach(elem => {
            store.commit('addHistory', {history: [elem]});
          })
        }
      )   
  }

  export default {
    name: 'chat-container',
    components: {
      ChatLog,
      MessageInput,
    },
    data() {
      return {
        title: 'PubNub & Vue Global Chat ',
      };
    },
    mounted() {
      // Subscribe to PubNub
      this.$pnSubscribe({
         channels: ['vueChat'],
      });
      this.$nextTick(fetchHistory(this.$store));
    },
    computed: {
    ...mapGetters({
      uuid: 'getMyUuid',
    }),
  },    
  };
</script>

<style scoped>
h1 {
  display: table-cell;
  vertical-align: middle;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
}

.chat-container {
  display: table;
  max-width: 400px;
  min-width: 300px;
  width: 25%;
  height: 500px;
  margin: auto;
  background-color: #FFFFFF;
  border: solid 1px #BFBFBF;
  border-radius: 3px;
}

.heading {
  display: table;
  width: 100%;
  height: 28px;
  text-align: center;
  background-color: #CDCDCD;
  border-radius: 3px 3px 0 0;
  -ms-user-select: none;
  user-select: none;
  background: linear-gradient(#EDEDED 0%, #CDCDCD 75%);
}

.body {
  display: block;
  width: auto;
  height: inherit;
  overflow: hidden;
}

.table {
  display: table;
  width: 100%;
  height: 100%;
}
</style>
