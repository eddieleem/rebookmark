<template>
  <div class="">
    <h1>My Page</h1>
    <div>
      BOOKMARK TIHS FREAKING PAGE.
    </div>
    <div>
      <PostLink @post="update++" />
      <div style="border-top: 1px solid #CCC; margin-top:48px; padding-top: 16px;">
        <Links :userId="userId" :key="update" />
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { SET_USER_ID } from "@/store/actions.type";

import PostLink from "@/components/PostLink.vue";
import Links from "@/views/Links.vue";

export default {
  components: {
    PostLink,
    Links,
  },
  name: "MyPage",
  // props: {
  //   msg: String,
  // },
  computed: {
    // ...mapGetters(["currentUserId"]),
  },
  created() {
    // console.log("currentUserId", this.currentUserId)
    this.setUserId();
  },
  data() {
    return {
      userId: this.$route.params.id,
      update: 0,
    };
  },
  methods: {
    setUserId() {
      this.$store.dispatch(SET_USER_ID, this.userId);
    }
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
