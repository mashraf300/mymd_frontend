<template>
    <div class="manage-schedule">
      <h2>Manage My Schedule</h2>
  
      <div class="week-schedule">
        <div v-for="day in daysOfWeek" :key="day.value" class="day-schedule">
          <h3>{{ day.label }}</h3>
          <div class="time-inputs">
            <input v-model="schedule[day.value].startTime">
            <span> to </span>
            <input v-model="schedule[day.value].endTime">
          </div>
        </div>
      </div>
  
      <button @click="saveSchedule">Save Schedule</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        const daysOfWeek = [
        { label: 'Sunday', value: 0 },
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
        ];

        const schedule = daysOfWeek.reduce((acc, day) => {
        acc[day.value] = { startTime: '09:00', endTime: '17:00' };
        return acc;
        }, {});

        return {
            daysOfWeek,
            schedule,
        };
    },
    mounted() {
      this.fetchSchedule();
    },
    methods: {
      
      async fetchSchedule() {
        try {
          const doctorId = localStorage.getItem('user_id');
          const response = await fetch(`/api/doctor_schedule?doctor_id=${doctorId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
  
          data.forEach(item => {
            const startTime = item.start_time;
            const endTime = item.end_time
            this.schedule[item.day] = { startTime, endTime };
          });
        } catch (error) {
          console.error('Error fetching schedule:', error);
        }
      },
      async saveSchedule() {
        console.log(this.schedule)
        try {
          const doctorId = localStorage.getItem('user_id');
          const response = await fetch(`/api/doctor_schedule?doctor_id=${doctorId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.schedule),
          });
  
          if (response.ok) {
            console.log('Schedule saved successfully');
          } else {
            const error = await response.text();
            console.error('Failed to save schedule:', error);
          }
        } catch (error) {
          console.error('Failed to save schedule:', error);
        }
      },
    },
  };
  </script>

<style scoped>

.manage-schedule button { 
  background-color: #007bff; 
  color: white;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease; 
}

.manage-schedule button:hover {
  background-color: #0056b3;
}
</style>