<template>
  <div id="login" :class="$style.login">
    <div :class="$style.allviewport">
      <div :class="$style.card">
        <img src="public/netflix-logo.png" :class="$style.logo" />
        <h3 :class="$style.connection">Connection</h3>
        <div :class="$style.form">
          <div id='loginwrapper' :class="$style.forminput">
            <input id='login' type="text" :class="$style.input" name="login" v-model="login" v-on:keyup.enter="postLogin()" v-on:focus="focusme('login')" v-on:focusout="unfocusme('login')">
            <label id='loginlabel' for="login" :class="$style.label">login</label>
          </div>
          <div id='passwordwrapper' :class="$style.forminput">
            <input id='password' type="password" :class="$style.input" name="password" v-model="password" v-on:keyup.enter="postLogin()" v-on:focus="focusme('password')" v-on:focusout="unfocusme('password')">
            <label id='passwordlabel' for="password" :class="$style.label">password</label>
          </div>
        </div>
        <div :class="$style.errormessages">
          <div id='serverrefuse' :class="$style.errormessage">Wrong login or password</div>
          <div id='nologin' :class="$style.errormessage">no login</div>
          <div id='nopassword' :class="$style.errormessage">no password</div>
        </div>
        <button :class="$style.button" v-on:click="postLogin()">Suivant</button>
      </div>
    </div>
    <appfooter/>
  </div>
</template>

<script>
  import appfooter from './footer.vue'

  export default  {
    name: 'login',
    computed: {
      token () {
        return this.$store.state.token
      }
    },
    components: {
      appfooter,
    },
    data: () => {
      return {
        login: "",
        password: ""
      }
    },
    methods: {
      postLogin: async function() {
        document.getElementById('serverrefuse').style.display = "none"
        document.getElementById('nologin').style.display = "none"
        document.getElementById('nopassword').style.display = "none"
        if (this.login == "" || this.password == "") {
          if (this.login == "") {
            document.getElementById('nologin').style.display = "block"
          }
          if (this.password == "") {
            document.getElementById('nopassword').style.display = "block"
          }
          return
        }
        try {
          let response = await fetch("http://localhost:3000/login", { 
            method: "POST", 
            body: JSON.stringify({ 
              login: this.login,
              password: this.password 
            }), 
            headers: { 
              "Content-type": "application/json; charset=UTF-8"
            } 
          })
          if (await response.ok) {
            this.$store.commit('setToken', await response.text())
          } else {
            if (response.status == 400) {
              document.getElementById('serverrefuse').style.display = "block"
            }
          }
        } catch(err) {
          console.log("fetch error: "+err.message)
        }
      },
      // label must stay in place if user wrote something
      focusme: function(target) {
        document.getElementById(target+'wrapper').classList.remove(this.$style.forminputnotempty)
        document.getElementById(target+'wrapper').classList.add(this.$style.forminputfocus)
        document.getElementById(target+'label').classList.add(this.$style.labelfocus)
      },
      unfocusme: function(target) {
        document.getElementById(target+'wrapper').classList.remove(this.$style.forminputfocus)
        if ((target == 'login' && this.login != '') || (target == 'password' && this.password != '')) {
          document.getElementById(target+'wrapper').classList.add(this.$style.forminputnotempty)
        } else {
          document.getElementById(target+'label').classList.remove(this.$style.labelfocus)
        }
      }
    }
  }
</script>

<style module scoped>
.login {
  height: 100vh;
  width: 100vw;
}
.allviewport {
  display: flex;
  background-color: #141414;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding-bottom: 50px;
}
.card {
  position: relative;
  align-self: center;
  height: auto;
  min-height: 500px;
  width: 450px;
  background-color:rgba(255, 255, 255, 0.1);
  border: solid 1px;
  border-radius: 10px;
  border-color: #e5e5e5;
}
.logo {
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  margin-left:auto;
  margin-right:auto;
  height: 40px;
  width: 125px;
} 
.connection {
  position: absolute;
  top: 125px;
  left: 0;
  right: 0;
  margin-left:auto;
  margin-right:auto;
  text-align: center;
  color:#e5e5e5;
}
.form {
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  margin-left:auto;
  margin-right:auto;
  width: 75%;
}
.forminput {
  position: relative;
  margin: 10px;
  padding: 10px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  border-bottom: 2px solid #e5e5e5;
  border-radius: 4px;
  transition: all 0.2s ease;
}
.forminputfocus {
  border: 2px solid #e5e5e5;
}
.forminputnotempty {
  border: none;
  border-bottom: 2px solid #e5e5e5;
  border-radius: 4px;
}
.input {
  background-color: transparent;
  width: 100%;
  color: #e5e5e5;
  font-family: inherit;
  border: none;
  font-size: 1.2rem;
  outline: 0;
}
.label {
  position: absolute;
  cursor: text;
  top: 10px;
  left: 10px;
  transition: all 0.2s ease;
  color: #e5e5e5;
  background-color: transparent;
}
.labelfocus {
  top: -10px;
  cursor: default;
  left: 0;
  background-color: #2c2c2c;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.8rem;
}
.errormessages {
  position: absolute;
  top: 350px;
  left: 75px;
  height: 100px;
  width: 150px;
  font-family: inherit;
  color: #e72525;
}
.errormessage {
  display: none;
}
.button {
  position: absolute;
  top: 375px;
  left: 300px;
  height: 40px;
  width: 125px;
  font-family: inherit;
  background-color: #e72525;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  color: #e5e5e5;
  cursor: pointer;
}
</style>
