<template>
  <div>
    <h2>Links by CardId</h2>
    <div v-if="cardIds.length > 0">
      <div v-for="cardId in cardIds" :key="cardId">
        <LinkCard :links="linksByCardId[cardId]" @add="getLinks" @remove="getLinks" />
      </div>
    </div>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { getLinksByUserId } from "@/service/firebase.js";

import LinkCard from "@/components/LinkCard.vue";

export default {
  name: "Links",
  components: {
    LinkCard,
  },
  props: {
    userId: String,
  },
  computed: {
    // ...mapGetters(["currentUserId"]),
  },
  created() {
    this.getLinks();
  },

  data() {
    return {
      linksByCardId: {},
      cardIds: [],
    };
  },
  methods: {
    async getLinks() {
      console.log("getting links for " + this.userId);
      const linksResp = await getLinksByUserId(this.userId);
      console.log("Links Resp", linksResp);
      this.linksByCardId = {};
      linksResp.forEach((doc) => {
        const link = doc.data();
        if (!this.linksByCardId[link.cardId]) {
          this.linksByCardId[link.cardId] = [];
        }
        this.linksByCardId[link.cardId].push(link);
        // this.links.push();
        // console.log("Link", doc.data());
      });
      this.cardIds = Object.keys(this.linksByCardId);
    },
  },
};
</script>

<style>
</style>