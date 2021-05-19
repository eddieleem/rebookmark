<template>
  <div class="home">
    <div class="timeline">
      <div class="sidebar">
        <p>
          upload your links
        </p>
      </div>

      <br />

      <Post />

      <br />
      <br />
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post'
export default {
  name: 'Home',
  components: { Post }
}
</script>

<style scoped>
.home {
  /* max-width: 300px; */
  margin-left: auto;
  margin-right: auto;

  @media (--t) {
    max-width: 500px;
    display: grid;
    /* grid-template-columns: 2fr 295px; */
    /* grid-gap: 30px; */
  }
}

.sidebar {
  display: none;
  @media (--t) {
    display: block;
  }
}
</style>
