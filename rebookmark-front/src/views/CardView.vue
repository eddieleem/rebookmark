<template>
  <div>
    <LinkCard v-if="finished" :links="links" />
  </div>
</template>

<script>
import { getLinksByCardId } from "@/service/firebase";

import LinkCard from "@/components/LinkCard.vue";

export default {
  components: {
    LinkCard,
  },
  data() {
    return {
      cardId: this.$route.params.id,
      links: [],
      finished: false,
    };
  },
  created() {
    this.getLinks();
  },
  methods: {
    getLinks() {
      getLinksByCardId(this.cardId).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const link = doc.data();
          this.links.push(link);
        });
        this.finished = true;
      });
    },
  },
};
</script>

<style>
</style>