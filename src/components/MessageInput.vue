<template>
  <div class="message-input">
    <textarea
      ref="messageInput"
      placeholder="message..."
      maxlength="20000"
      @keydown.enter="submitMessage"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'message-input',
  data() {
    return {};
  },
  methods: {
    submitMessage(event) {
      if (!event.shiftKey) {
        event.preventDefault();
      } else {
        return;
      }

      // If the message body is empty, do not submit
      if (event.target.value.length === 0) {
        return;
      }

      const userUUID = this.$store.getters.getMyUuid;

      // console.log(even.target.value);
      // Publish to PubNub the text and user's uuid
      this.$pnPublish({ 
        channel: 'vueChat', 
        message: {
          text: event.target.value,
          uuid: userUUID,
         },
        })

      // Reset the text input
      event.target.value = '';
      }
  },
};
</script>

<style scoped>
.message-input {
  display: table-row;
  width: 100%;
  height: 26px;
}

textarea {
  width: 98%;
  height: 30px;
  padding: 0 5px;
  margin: 0;
  box-sizing: border-box;
  line-height: 20pt;
  resize: none;
  outline: none;
  font-size: 14px;
  border: solid 1px #AAAAAA;
  border-radius: 3px;
  font-family: Helvetica;
}
</style>