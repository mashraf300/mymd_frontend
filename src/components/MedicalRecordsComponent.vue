<template>
  <div class="medical-records">
    <h2>My Medical Records</h2>

    <div v-if="records.length > 0">
      <div v-for="(record, index) in records" :key="record.id"
           class="record-card" :class="{ gray: index % 2 === 0 }">
        <img :src="record.image_url" alt="Medical Image" class="record-image">
        <div class="record-details">
          <p v-if="record.description">{{ record.description }}</p>
          <p><strong>Uploaded:</strong> {{ formatDate(record.created_at) }}</p>
          <p><strong>Accessible By:</strong></p>
          <ul>
            <li v-for="doctor in record.doctors" :key="doctor.id">
              {{ doctor.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p>You have no medical records uploaded.</p>
    </div>

    <h3>Add New Medical Record</h3>
    <form @submit.prevent="addRecord">
      <div class="form-group">
        <label for="image_url">Image URL:</label>
        <input type="text" id="image_url" v-model="newRecord.image_url" required>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="newRecord.description"></textarea>
      </div>
      <div class="form-group">
        <label for="doctors">Accessible by Doctors:</label>
        <select id="doctors" v-model="newRecord.doctor_ids" multiple> 
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
      <button type="submit">Add Record</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: [],
      doctors: [],  
      newRecord: {
        image_url: '',
        description: '',
        doctor_ids: [], 
      },
    };
  },
  mounted() {
    this.fetchMedicalRecords();
    this.fetchDoctors(); 
  },
  methods: {
    async fetchMedicalRecords() {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`/api/medical_records?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.records = await response.json();
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    },
    async fetchDoctors() {
      try {
        const response = await fetch('/api/doctors'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.doctors = await response.json();
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async addRecord() {
      try {
        const userId = localStorage.getItem('user_id');
        const recordData = {
          patient_id: userId,
          image_url: this.newRecord.image_url,
          description: this.newRecord.description,
          doctor_ids: this.newRecord.doctor_ids, 
        };

        const response = await fetch('/api/medical_records', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recordData),
        });

        if (response.ok) {
          this.fetchMedicalRecords(); 
          this.newRecord.image_url = '';
          this.newRecord.description = '';
          this.newRecord.doctor_ids = []; 
        } else {
          const error = await response.text();
          console.error('Failed to add record:', error);
        }
      } catch (error) {
        console.error('Failed to add record:', error);
      }
    },
  },
};
</script>

<style scoped>
.medical-records {
  padding: 20px;
}

.record-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex; 
  align-items: flex-start; 
}

.record-card.gray {
  background-color: #f8f8f8;
}

.record-image {
  width: 100px;
  height: 100px;
  object-fit: cover; 
  margin-right: 15px;
}

.record-details {
  flex: 1; 
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; 
}

.record-details {
  text-align: left; 
}

.record-details p, 
.record-details ul {
  text-align: left; 
  margin-bottom: 5px; 
}
</style>