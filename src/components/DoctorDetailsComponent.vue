<template>
  <div class="doctor-details">
    <div class="doctor-profile">
      <img :src="doctor.image_url" alt="Doctor Image" class="doctor-image">
      <div class="doctor-info">
        <h2>{{ doctor.name }}</h2>
        <p>{{ doctor.specialty }}</p>
        <p>{{ doctor.location }}</p>
        <p><i class="fas fa-phone"></i> {{ doctor.phone }}</p> 
        <p><i class="fas fa-envelope"></i> {{ doctor.email }}</p>
        <p v-if="doctor.bio">{{ doctor.bio }}</p> 
      </div>
    </div>

    <h3>Schedule an Appointment</h3>

    <div class="schedule-section"> 
      <div class="calendar">
        <Calendar @dayclick="onDayClick" :attributes="attrs" />
      </div>
      <div class="timeslots" v-if="selectedDate">
        <div v-for="slot in filteredTimeslots" :key="slot.time" class="timeslot"
             :class="{ disabled: !slot.available }">
          <label>
            <input type="radio" v-model="selectedTimeslot" :value="slot.time" :disabled="!slot.available">
            {{ slot.time }}
          </label>
        </div>
      </div>
    </div>

    <button @click="scheduleAppointment" :disabled="!selectedDate || !selectedTimeslot" class="schedule-button"> 
      Schedule Appointment
    </button>
  </div>
</template>

<script>
import { Calendar } from 'v-calendar'; 
import 'v-calendar/dist/style.css';

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      doctor: {},
      selectedDate: null,
      selectedTimeslot: null,
      userId: null,
      attrs: [ 
        {
          key: 'selected', 
          highlight: true,
          dates: this.selectedDate, 
        },
      ],
    };
  },
  mounted() {
    this.fetchDoctorDetails();
    this.userId = localStorage.getItem('user_id') || null;
  },
  computed: {
    filteredTimeslots() {
      console.log('filteredTimeslots computed property called'); 
      if (!this.selectedDate) return [];

      const selectedDayOfWeek = this.selectedDate.getDay();
      return this.doctor.timeslots.filter(slot => slot.day === selectedDayOfWeek);
    }
  },
  methods: {
    onDayClick(day) {
      console.log('DayClick:', day.date);
      this.selectedDate = day.date; 
      this.selectedTimeslot = null;
      this.attrs = [ 
        {
          key: 'selected', 
          highlight: true,
          dates: this.selectedDate, 
        },
      ];
    },
    async fetchDoctorDetails() {
      try {
        const doctorId = this.$route.params.id; 
        const response = await fetch(`/api/doctors/${doctorId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.doctor = await response.json();
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    },
    async scheduleAppointment() {
      try {
        const appointmentData = {
          patient_id: this.userId, 
          doctor_id: this.doctor.id,
          date: this.selectedDate.toISOString().split('T')[0],
          time: this.selectedTimeslot,
        };

        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Appointment created successfully:', data.appointment_id);
          this.selectedDate = null;
          this.selectedTimeslot = null;
        } else {
          const error = await response.text();
          console.error('Failed to create appointment:', error);
        }
      } catch (error) {
        console.error('Failed to create appointment:', error);
      }
    },
  },
};
</script>

<style scoped>
.doctor-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.doctor-profile {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.doctor-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.doctor-info {
  text-align: left; 
}

.doctor-info p {
  text-align: left; 
}

.calendar {
  margin-bottom: 20px;
}

.schedule-section {
  display: flex; 
  gap: 20px; 
  align-items: flex-start; 
  margin-bottom: 20px; 
}

.timeslots {
  display: flex;
  flex-direction: column; 
  gap: 10px;
}

.schedule-button {
  background-color: #007bff; 
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold; 
  width: 200px; 
  align-self: center; 
}

.schedule-button:disabled {
  background-color: #ccc; 
  cursor: not-allowed;
}
</style>