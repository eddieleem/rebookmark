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

    <!-- links -->
    <div class="post-media">
      <p>ppppp</p>
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
