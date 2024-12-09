<template>
  <div class="home-page">
    <div class="hero-image"></div>
    <div class="search-card">
      <h1>Find a Doctor</h1>
      <div class="search-filters">
        <input type="text" v-model="searchQuery" placeholder="Search by name or specialty">
        <select v-model="selectedSpecialty">
          <option value="">All Specialties</option>
          <option value="cardiology">Cardiology</option>
          <option value="dermatology">Dermatology</option>
          <option value="pediatrics">Pediatrics</option>
        </select>
        <button @click="searchDoctors" class="search-button">
          <font-awesome-icon icon="search" /> Search 
        </button>
      </div>
    </div>

    <div class="doctor-list">
      <router-link :to="`/doctor/${doctor.id}`"  v-for="(doctor, index) in doctors" :key="doctor.id" 
           class="doctor-card" :class="{ gray: index % 2 === 0 }"> 
        <img :src="doctor.image_url" alt="Doctor Image" class="doctor-image"> 
        <div class="doctor-info"> 
          <h3>{{ doctor.name }}</h3>
          <p>{{ doctor.specialty }}</p>
          <p>{{ doctor.location }}</p>
        </div>
      </router-link> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedSpecialty: '',
      doctors: [], 
    };
  },
  mounted() {
    this.fetchDoctors(); 
  },
  methods: {
    async fetchDoctors() {
      try {
        const url = `/api/doctors?search=${this.searchQuery}&specialty=${this.selectedSpecialty}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.doctors = await response.json();
        console.error('Doctors:', this.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    },
    searchDoctors() {
      this.fetchDoctors(); 
    },
  },
};
</script>

<style scoped>
.home-page {
  position: relative;
}

.hero-image {
  background-image: url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); /* Replace with your image */
  background-size: cover;
  background-position: center;
  height: 400px;
  width: 100%;
}

.search-card {
  background-color: rgba(255, 255, 255, 0.8); 
  padding: 20px;
  border-radius: 5px;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%; 
  max-width: 600px; 
  z-index: 1;
}

.search-filters {
  display: flex;
  flex-direction: column; 
  gap: 15px;
  padding: 20px; 
}

.search-filters input,
.search-filters select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  background-color: #007bff; 
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex; 
  align-items: center; 
  gap: 5px;
  justify-content: center;
}

.doctor-list {
  padding: 20px;
}

.doctor-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px; 
  width: 60%; 
  margin-left: auto; 
  margin-right: auto;
  display: flex; 
  align-items: center; 
  text-decoration: none; 
  color: inherit;
}

.doctor-card.gray {
  background-color: #f8f8f8;
}

.doctor-image {
  width: 50px; 
  height: 50px;
  border-radius: 50%; 
  margin-right: 15px; 
}

.doctor-info {
  text-align: left; 
}

.doctor-card:hover {
  background-color: #f0f0f5; 
}
</style>