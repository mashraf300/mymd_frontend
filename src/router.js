// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginComponent.vue';
import Registration from './components/RegistrationComponent.vue'; 
import Home from './components/HomeComponent.vue'; 
import DoctorDetails from './components/DoctorDetailsComponent.vue'; 
import Appointments from './components/AppointmentsComponent.vue'; 
import MedicalRecords from './components/MedicalRecordsComponent.vue'; 
import DoctorAppointments from './components/DoctorAppointmentsComponent.vue'; 
import ManageSchedule from './components/ManageScheduleComponent.vue'; 

const routes = [
  { path: 
 '/login', component: Login },
  { path: '/register', component: Registration },
  { path: '/home', component: Home,
    meta: { requiresAuth: true }
   },
   { path: '/doctor/:id', component: DoctorDetails, meta: { requiresAuth: true } },
   { path: '/appointments', component: Appointments, meta: { requiresAuth: true } },
   { path: '/records', component: MedicalRecords, meta: { requiresAuth: true } },

   { path: '/doctor-appointments', component: DoctorAppointments, meta: { requiresAuth: true } },
   { path: '/manage-schedule', component: ManageSchedule, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('username')) {
    next('/login'); 
  } else {
    next();
  }
});

export default router;