<template>
  <div class="read">
    <!-- header -->
    <header class="header section">
      <div class="header-author">
        <div class="header-author-info">
          <div>
            <CustomText tag="b"
              >#programming #ed #dfs #df #asdf #adfasdf #afsdfasd</CustomText
            >
          </div>
        </div>
      </div>
      <div class="header-more">
        <!-- <v-btn type="button">
          edit
        </v-btn> -->
      </div>
    </header>

    <!-- links -->
    <div class="post-media">
      <v-data-table
        :headers="tableHeaders"
        :items="list"
        :loading="loading"
        item-key="id"
        :show-select="false"
        :disable-pagination="true"
        :hide-default-footer="true"
        class="page__table"
      >
        <template v-slot:body="props">
          <draggable :list="props.items" tag="tbody" disabled="disabled">
            <tr v-for="(link, index) in props.items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <a :href="link.url" target="_blank">{{ link.url }}</a>
              </td>
              <!-- <p>{{ link.url }}</p> -->
              <!-- <td>
                <v-icon small @click="editLink(link.url)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="removeAt(index)">
                  mdi-delete
                </v-icon>
              </td> -->
            </tr>
          </draggable>
        </template>
      </v-data-table>
    </div>

    <!-- actions -->
    <div class="action-buttons section">
      <!-- <v-btn type="button">
        delete
      </v-btn> -->
      <!-- <v-btn class="mx-2" fab dark color="indigo" @click="add">
        <v-icon small class="page__grab-icon">
          mdi-plus
        </v-icon>
      </v-btn> -->
      <!-- <v-btn class="action-save" type="button" @click="post">
        post
      </v-btn> -->
    </div>
  </div>
</template>

<script>
import CustomText from '@/components/CustomText'
import draggable from 'vuedraggable'

export default {
  name: 'Post',
  components: {
    CustomText,
    draggable
  },
  data: () => ({
    guide: null,
    loading: true,
    tableHeaders: [
      { text: '#', sortable: false },
      { text: 'URL', value: 'url', sortable: false }
    ],
    id: 1,
    list: [
      {
        url: 'https://github.com/eddieleem/rebookmark/graphs/code-frequency'
      },
      {
        url: 'http://localhost:8082/#/simple'
      },
      {
        url:
          'https://www.bing.com/?toWww=1&redig=75CFF10DF4C245A2BC14A229CDD344ED'
      }
    ]
  }),
  methods: {
    post() {
      alert('hip hop!')
    },
    removeAt(idx) {
      this.list.splice(idx, 1)
    },
    add() {
      this.list.push({ url: '' })
    }
  },
  created() {
    // console.log(this.list)
  }
}
</script>

<style scoped>
.read {
  border-radius: 3px;
  border: 1px solid rgb(var(--b6a));
}

.section {
  padding-left: 16px;
  padding-right: 16px;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;

  &-author {
    display: flex;
    align-items: center;

    &-info {
      margin-left: 8px;
    }
  }

  &-more {
    margin-left: auto;
  }
}

.action-buttons {
  height: 45px;
  display: flex;
  align-items: center;
}

button {
  margin-right: 16px;
}

.action-save {
  margin-left: auto;
  margin-right: 0;
}

a:link {
  color: blue;
  background-color: transparent;
  text-decoration: none;
}
</style>
