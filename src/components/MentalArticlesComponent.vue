<template>
  <div class="mental-health-articles">
    <h2>Mental Health Resources</h2>

    <div v-if="articles.length > 0">
      <div v-for="(article, index) in articles" :key="article.id"
           class="article-card" :class="{ gray: index % 2 === 0 }">
        <div v-if="article.image_url" class="article-image">
          <img :src="article.image_url" alt="Article Image">
        </div>
        <div class="article-details">
          <h3>{{ article.title }}</h3>
          <p>{{ article.content }}</p>
        </div>
        <div v-if="isAdmin" class="edit-button-container">
          <router-link :to="`/update-article/${article.id}`" class="edit-button">
            <i class="fas fa-edit"></i> Edit
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No mental health articles found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await fetch('/api/mental_health_articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.articles = await response.json();
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
  },
};
</script>

<style scoped>
.mental-health-articles {
  padding: 20px;
}

.article-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex; 
  align-items: flex-start; 
}

.article-card.gray {
  background-color: #f8f8f8;
}

.article-image {
  margin-right: 15px; 
}

.article-image img {
  width: 100px; 
  height: 100px; 
  object-fit: cover; 
}

.article-details h3 {
  margin-bottom: 10px;
}

.edit-button-container {
  margin-left: auto; 
}

.edit-button {
  display: inline-block;
  background-color: #ffc107;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
}
</style>