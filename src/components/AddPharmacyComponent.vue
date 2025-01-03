<template>
    <div class="add-pharmacy">
      <h2>Add Pharmacy</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="pharmacy.name" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="pharmacy.address" required>
        </div>
        <div class="form-group">
          <label for="phone_number">Phone Number:</label>
          <input type="tel" id="phone_number" v-model="pharmacy.phone_number" required>
        </div>
        <button type="submit" v-if="isAdmin">Add Pharmacy</button> 
      </form>
      <div v-if="showSuccessMessage" class="success-message">
        Pharmacy added successfully!
      </div>
    </div>
</template>

<script>
export default {
    data() {
    return {
      pharmacy: {
        name: '',
        address: '',
        phone_number: '',
      },
      showSuccessMessage: false, 
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('/api/pharmacies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.pharmacy),
        });

        if (response.ok) {
          this.pharmacy = { name: '', address: '', phone_number: '' };
          this.showSuccessMessage = true; 
          setTimeout(() => {
            this.showSuccessMessage = false; 
          }, 3000); 
        } else {
          const error = await response.text();
          console.error('Failed to add pharmacy:', error);
        }
      } catch (error) {
        console.error('Failed to add pharmacy:', error);
      }
    }
  }
};
</script>

<style scoped>
.add-pharmacy {
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

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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