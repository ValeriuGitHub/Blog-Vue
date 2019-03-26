<template>
  <div>
    <app-post v-for="post in posts" :post="post"></app-post>
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
   //  created() {
			// this.$store.dispatch('initPosts');
   //  }
  }
</script>