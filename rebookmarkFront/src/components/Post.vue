<template>
  <div class="post">
    <!-- header -->
    <header class="header section">
      <div class="header-author">
        <div class="header-author-info">
          <div>
            <CustomText tag="b">#programming #ed</CustomText>
          </div>
        </div>
      </div>
      <div class="header-more">
        <button type="button">
          edit
        </button>
      </div>
    </header>

    <!-- media -->
    <div class="post-media">
      <img
        src="https://instagram.fist6-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/117325081_976996139418353_8160924534914653455_n.jpg?_nc_ht=instagram.fist6-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=jNBXBif9ELAAX8crGcC&oh=573d873be16560be501f2567940481f4&oe=5F604180"
        alt=""
      />
    </div>

    <!-- actions -->
    <div class="action-buttons section">
      <button type="button">
        delete
      </button>
      <button class="action-save" type="button">
        post
      </button>
    </div>

  </div>
</template>

<script>
import CustomText from '@/components/CustomText'

export default {
  name: 'Post',
  components: {
    CustomText
  }
}
</script>

<style scoped>
.post {
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

  button {
    margin-right: 16px;
  }

  .action-save {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>
