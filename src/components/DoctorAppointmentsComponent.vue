<template>
  <div class="appointments-page">
    <h2>My Appointments</h2>
    <div v-if="appointments.length > 0">
      <div v-for="(appointment, index) in appointments" :key="appointment.id"
           class="appointment-card" :class="{ gray: index % 2 === 0 }">
        <p>
          <strong>Patient:</strong> {{ appointment.patient.name }} 
        </p>
        <p>
          <strong>Date:</strong> {{ formatDate(appointment.date) }}
          <br>
          <strong>Time:</strong> {{ appointment.time }}
        </p>
        <p><strong>Status:</strong> {{ appointment.status }}</p>
      </div>
    </div>
    <div v-else>
      <p>You have no appointments scheduled.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [],
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const doctorId = localStorage.getItem('user_id'); 
        const response = await fetch(`/api/doctor_appointments?doctor_id=${doctorId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.appointments = await response.json();
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.appointments-page {
  padding: 20px;
}

.appointment-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
}

.appointment-card.gray {
  background-color: #f8f8f8;
}
</style>