<template>
  <div style="border: 2px solid #ccc; margin-bottom: 8px">
    <h2>Card</h2>
    <ul v-if="links.length > 0">
      <li v-for="link in links" :key="link.id">
        {{ link.url }}
        <button @click="remove(link.id)" v-if="isOwner">delete</button>
      </li>
    </ul>
    <div v-else>No Links</div>
    <div v-if="isOwner">
      Add Link
      <input type="text" v-model="newLink" />
      <button @click="add">Add Link</button>
    </div>
    <div>
      Tags: <span v-for="tag in tags" :key="tag">{{ tag }}, </span>
    </div>
    <div>
      Share Link: <span>/card/{{cardId}}</span>
      <!-- <button @click="share">
        Share
      </button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { upsertLink, removeLink } from "@/service/firebase.js";

export default {
  props: {
    links: Array,
  },
  computed: {
    ...mapGetters(["currentUserId"]),
    isOwner: function () {
      return this.userId === this.currentUserId;
    },
  },
  data() {
    return {
      cardId: "",
      userId: "",
      tags: [],
      newLink: "",
    };
  },
  created() {
    this.userId = this.links[0].createdBy;
    this.cardId = this.links[0].cardId;
    this.tags = [...this.links[0].tags];
  },
  methods: {
    add() {
      if (!this.newLink.trim()) return;
      const { createdBy, tags, publicCode, cardId } = this.links[0];

      upsertLink(createdBy, this.newLink, tags, publicCode, cardId).then(
        (doc) => {
          console.log("addLink", doc);
          this.$emit("add");
        }
      );
      // const newLink = {
      //   userId, url: this.newLink, tags, publicCode, cardId
      // }
    },
    remove(id) {
      removeLink(id).then((resp) => {
        console.log("remove resp", resp);
        alert("Link removed");
        this.$emit("add");
      });
    },
    share() {
      // const { cardId } = this.links[0];
    },
  },
};
</script>

<style>
</style>