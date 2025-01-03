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
import AdminDashboard from './components/AdminDashboardComponent.vue'; 
import AddPharmacy from './components/AddPharmacyComponent.vue';
import AddMentalHealthArticle from './components/AddMentalHealthComponent.vue';
import Pharmacies from './components/PharmaciesComponent.vue';
import MentalArticles from './components/MentalArticlesComponent.vue';
import UpdatePharmacy from './components/UpdatePharmacyComponent.vue';
import UpdateMentalArticle from './components/UpdateMentalArticleComponent.vue';

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
   { path: '/admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } },
   { path: '/add-pharmacy', component: AddPharmacy, meta: { requiresAuth: true, requiresAdmin: true } },
   { path: '/add-mental-health-article', component: AddMentalHealthArticle, meta: { requiresAuth: true, requiresAdmin: true } },
   { path: '/pharmacies', component: Pharmacies, meta: { requiresAuth: true } },
   { path: '/mental-articles', component: MentalArticles, meta: { requiresAuth: true } },
   { path: '/update-pharmacy/:id', component: UpdatePharmacy, meta: { requiresAuth: true, requiresAdmin: true } },
   { path: '/update-article/:id', component: UpdateMentalArticle, meta: { requiresAuth: true, requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('username')) {
    next('/login'); 
  } else {
    if (to.meta.requiresAdmin && localStorage.getItem('role') != "admin") {
      next('/home');
    } else {
      next();
    }
  }
});

export default router;