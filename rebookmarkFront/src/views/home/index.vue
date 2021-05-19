<template>
  <div class="home">
    <div class="timeline">
      <!-- <h1>Home</h1> -->

      <br />
      <br />

      <Read />

      <br />
      <br />
      <br />
    </div>

    <!-- <div class="sidebar">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, eius
        vero. Alias aut blanditiis commodi consectetur eligendi, et minima
        officiis omnis optio pariatur quod quos repudiandae rerum sed tempora
        voluptatibus?
      </p>
    </div> -->
  </div>
</template>

<script>
import Read from '@/components/Read'
export default {
  name: 'Home',
  components: { Read }
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
