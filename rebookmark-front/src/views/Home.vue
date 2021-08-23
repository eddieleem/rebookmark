<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <PostLink />
  </div>
</template>

<script>
// @ is an alias to /src
import PostLink from "@/components/PostLink.vue";

export default {
  name: "Home",
  components: {
    PostLink,
  },
};
</script>
