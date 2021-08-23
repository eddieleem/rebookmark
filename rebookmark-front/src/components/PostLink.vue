<template>
  <div class="">
    <h1>Post Link</h1>
    <div>
      <textarea rows="10" v-model="linksStr"></textarea>
      <br />
      <input type="text" v-model="tagsStr" /><br />
      <button @click="post">Post</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { createNewUser, upsertLink, generateString } from "@/service/firebase";
import { SET_USER_ID } from "@/store/actions.type";

export default {
  name: "PostLink",
  // props: {
  //   msg: String,
  // },
  computed: {
    ...mapGetters(["currentUserId"]),
    links: function () {
      return this.linksStr
        .split("\n")
        .map((link) => link.trim())
        .filter((link) => link);
    },
    tags: function () {
      return this.tagsStr
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
    },
  },
  data() {
    return {
      linksStr: "google.com\nmicrosoft.com\n",
      tagsStr: "tech, IT",
    };
  },
  methods: {
    async post() {
      const newPublicCode = generateString(6);
      if (!this.currentUserId) {
        const newUserResp = await createNewUser(newPublicCode);
        console.log("resp", newUserResp);
        const userId = newUserResp.id;
        console.log("UserID", userId);
        await this.$store.dispatch(SET_USER_ID, userId);
      }

      const newCardId = generateString(8);
      this.links.forEach((url) => {
        upsertLink(
          this.currentUserId,
          url,
          this.tags,
          newPublicCode,
          newCardId
        );
      });

      this.$emit("post");

      if (this.$route.name !== "MyPage") {
        this.$router.push({
          name: "MyPage",
          params: { id: this.currentUserId },
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
