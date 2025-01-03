<template>
  <div class="appointments-page">
    <h2>My Appointments</h2>
    <div v-if="appointments.length > 0">
      <div v-for="(appointment, index) in appointments" :key="appointment.id"
           class="appointment-card" :class="{ gray: index % 2 === 0 }">
        <p>
          <strong>Doctor:</strong> {{ appointment.doctor.name }}
          <br>
          <strong>Specialty:</strong> {{ appointment.doctor.specialty }}
        </p>
        <p>
          <strong>Date:</strong> {{ formatDate(appointment.date) }}
          <br>
          <strong>Time:</strong> {{ appointment.time }}
        </p>
        <p><strong>Status:</strong> {{ appointment.status }}</p>
        <button @click="cancelAppointment(appointment.id)" v-if="appointment.status === 'pending'"> 
          Cancel Appointment
        </button>
      </div>
    </div>
    <div v-else>
      <p>You have no appointments scheduled.</p>
    </div>
    <div v-if="showSuccessMessage" class="success-message">
      Appointment cancelled successfully!
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [],
      showSuccessMessage: false, 
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`/api/appointments?user_id=${userId}`);
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
    async cancelAppointment(appointmentId) {
      try {
        const response = await fetch(`/api/appointments/${appointmentId}`, {
          method: 'DELETE', 
        });

        if (response.ok) {
          this.fetchAppointments(); 
          this.showSuccessMessage = true; 
          setTimeout(() => {
            this.showSuccessMessage = false; 
          }, 3000); 
        } else {
          const error = await response.text();
          console.error('Failed to cancel appointment:', error);
        }
      } catch (error) {
        console.error('Failed to cancel appointment:', error);
      }
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