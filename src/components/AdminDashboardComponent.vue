<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>
    <div class="options">
      <router-link to="/add-pharmacy" class="option-card">
        <i class="fas fa-plus"></i> Add Pharmacy
      </router-link>
      <router-link to="/add-mental-health-article" class="option-card">
        <i class="fas fa-plus"></i> Add Mental Health Resource
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.options {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.option-card {
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #333;
  width: 200px;
  transition: background-color 0.3s ease;
}

.option-card:hover {
  background-color: #e2e6ea;
}

.option-card i {
  margin-bottom: 10px;
  font-size: 24px;
}
</style>