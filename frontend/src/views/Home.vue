<template>
  <div class="home">
    <v-main 
      class="home-bg pt-2 pb-3"
    >
      <v-container
      >
        <v-row
        >
          <v-col
            cols="4"
            sm="6"
            md="8"
            class="top-navigation"
          >
            <v-btn text small v-if="logo"><img :src="logo" width="50" alt=""></v-btn>
            <v-btn text small v-else>logo</v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            cols="8"
            sm="6"
            md="4"
            
          >
          <div class="float-right top-navigation-menu">
            <PreSignUp v-model="showPreSignUp"/>
            <SignIn v-model="showSignIn"/>
            <ResetPassword v-model="showResetPassword"/>
            <div v-if="user">
              <v-btn text small color="#fff" @click="logout" class="float-right">Logout</v-btn>
            </div>
            <div v-else>
              <v-btn text small color="#fff" @click.stop="showSignIn=true">Sign In</v-btn>|
              <v-btn text small color="#fff" @click.stop="showPreSignUp=true">Sign Up</v-btn>
            </div>
          </div>
          </v-col>
        </v-row>

        <v-row 
          class="home-image" 
          align="center"
          justify="center">
          <v-col
            cols="12"
            sm="8"
            md="8"
          >
            <v-card
              color="#E6727B"
              align="center"
            >
              <h2 class="text-uppercase pt-3">B2B Order Management System</h2>
              <h5 class="pb-4">A customised platform for Brands, Disrtibutors,Wholesalers, Dealer and Retailers.</h5>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import PreSignUp from '@/components/PreSignUp.vue'
import SignIn from '@/components/SignIn.vue'
import ResetPassword from '@/components/ResetPassword.vue'

export default {
  name: 'Home',
  components: {
    Footer,
    PreSignUp,
    SignIn,
    ResetPassword
  },
  data () {
    return {
      showPreSignUp: false,
      showSignIn: false,
      showResetPassword: false,
      user: '',
      logo: '',
      token: '',
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          //this.$router.push('/')  
          this.user= ''  
        })
        .catch(err => {
            console.log(err)
      })
    },
  },
  created() {
    this.token = localStorage.getItem('token')
    //console.log(this.token)
    if(this.token) {
      this.$router.push('/dashboard') 
    }
  },
  mounted() {
    //console.log(this.$route.params.id);
  },
}
</script>

<style>
  .home h2, .home h5 {
    color: #fff;
  }
  .home-image {
    background-image: url('~@/assets/home.jpg');
    height: 62vh;
  }
  .hero-home-text {
    background-color: #E6727B;
  }
  .top-navigation {
    height: 10vh;
  }
  .top-navigation, .top-navigation-menu {
    color: #fff ! important;
  }
  .home-bg {
    background-color:#D4A58B;
    background-image: linear-gradient(to right,#ECC8A0 , #794C5F); /* Standard syntax (must be last) */
  }
  /* If the screen size is 601px wide or more */
  @media screen and (min-width: 601px) {
    .home h2 {
      font-size: 37px;
    }
    .home h5 {
      font-size: 16px;;
    }
  }

  /* If the screen size is 600px wide or less */
  @media screen and (max-width: 600px) {
    .home h2 {
      font-size: 20px;
    }
    .home h5 {
      font-size: 10px;;
    }
  }
</style>
