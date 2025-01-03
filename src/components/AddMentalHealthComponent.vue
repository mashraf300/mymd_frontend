<template>
  <div class="add-article">
    <h2>Add Mental Health Article</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="image_url">Image URL:</label>
        <input type="text" id="image_url" v-model="article.image_url">
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="article.title" required>
      </div>
      <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" v-model="article.content" required></textarea>
      </div>
      <button type="submit">Add Article</button>
    </form>
    <div v-if="showSuccessMessage" class="success-message">
      Article added successfully!
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        image_url: '',
        title: '',
        content: '',
      },
      showSuccessMessage: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('/api/mental_health_articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.article),
        });

        if (response.ok) {
          this.article = { image_url: '', title: '', content: '' };
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        } else {
          const error = await response.text();
          console.error('Failed to add article:', error);
        }
      } catch (error) {
        console.error('Failed to add article:', error);
      }
    }
  }
};
</script>

<style scoped>
.add-article {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group textarea {
  height: 200px;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.success-message {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
}
</style>