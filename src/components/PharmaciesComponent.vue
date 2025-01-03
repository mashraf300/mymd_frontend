<template>
  <div class="pharmacies-page">
    <h2>Pharmacies</h2>
    <div v-if="pharmacies.length > 0">
      <div v-for="(pharmacy, index) in pharmacies" :key="pharmacy.id"
           class="pharmacy-card" :class="{ gray: index % 2 === 0 }">
        <h3>{{ pharmacy.name }}</h3>
        <p>
          <i class="fas fa-map-marker-alt"></i> {{ pharmacy.address }}
        </p>
        <p>
          <i class="fas fa-phone"></i> {{ pharmacy.phone_number }}
        </p>
        <div v-if="isAdmin"> 
          <router-link :to="`/update-pharmacy/${pharmacy.id}`" class="edit-button"> 
            <i class="fas fa-edit"></i> Edit
          </router-link>
        </div>
      </div>
      
    </div>
    <div v-else>
      <p>No pharmacies found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pharmacies: [],
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  },
  mounted() {
    this.fetchPharmacies();
  },
  methods: {
    async fetchPharmacies() {
      try {
        const response = await fetch('/api/pharmacies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.pharmacies = await response.json();
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    },
  },
};
</script>

<style scoped>
.pharmacies-page {
  padding: 20px;
}

.pharmacy-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
}

.pharmacy-card.gray {
  background-color: #f8f8f8;
}

.pharmacy-card h3 {
  margin-bottom: 10px;
}

.pharmacy-card p {
  margin-bottom: 5px;
}

.pharmacy-card a {
  color: #007bff;
  text-decoration: none;
}

.pharmacy-card a:hover {
  text-decoration: underline;
}

.edit-button {
  display: inline-block;
  background-color: #ffc107; 
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 10px; 
}
</style>