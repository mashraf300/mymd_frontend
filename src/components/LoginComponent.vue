<template>
  <div class="login-container">
    <div class="background-image"></div>
    <div class="content">
      <img src="https://i.imgur.com/k019KSe.png" alt="MyMD Logo" class="logo">
      <h1 class="welcome-text">Welcome to MyMD</h1>

      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="login-button">Login</button>

        <router-link to="/register" class="register-link">Don't have an account? Register</router-link>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods:
 {
    async login() {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        if (response.ok) {
          const data = await response.json(); 
          localStorage.setItem('username', this.username);
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('role', data.role);
          console.log("UserID: ", data.role)
          if(data.role == "admin") {
            this.$router.push({ path: '/admin-dashboard', query: { requiresAuth: true, requiresAdmin: true } });
          } else {
            this.$router.push({ path: '/home', query: { requiresAuth: true } });
          }
        } else {
          const error = await response.text();
          console.error('Login failed:', error);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

.background-image {
  background-image: url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); /* Replace with your image URL */
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: -1;
}

.content {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 5px;
  text-align: center;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 24px;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.register-link {
  margin-top: 15px;
  font-size: 14px;
}
</style>