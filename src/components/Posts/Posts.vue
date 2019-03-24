<template>
  <div>
    <app-post v-for="post in posts" :post="post"></app-post>
    <h1 style="text-align: center">hi</h1>
  </div>
</template>

<script>
  import Post from './Post.vue';

  export default {
    components: {
      appPost: Post
    },
    computed: {
      posts() {
        return this.$store.getters.posts;
      }
    }
  }
</script>