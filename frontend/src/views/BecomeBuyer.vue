<template>
  <div class="dashboard">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Become a  Buyer</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="become-buyer">
                  <v-btn @click="becomeBuyer">Become a buyer</v-btn>
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <v-btn text>B2B @2020</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn  color="primary" text>Version 1.0.0</v-btn>
                </v-card-actions>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import TopSearchBar from '@/components/TopSearchBar.vue'

export default {
    name: 'BecomeBuyer',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        },
        becomeBuyer() {
            this.$store.dispatch('becomeBuyer')
                .then(() => {
                this.$router.push('/dashboard') 
            
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
      this.$store.dispatch('getProfile')
          .then((res) => {
          //console.log(res.data.data)
          let user = res.data.data
          if(user.user_type == 'b')
              this.buyer = true
          //console.log(this.user_type)
      
      })
      .catch(err => {
        console.log(err)
      })
      this.$store.dispatch('getSellers')
          .then((res) => {
            this.sellers = res.data.data
          //console.log(res.data.data)

        })
      .catch(err => {
        console.log(err)
      })
      this.$store.dispatch('getBuyers')
          .then((res) => {
            this.buyers = res.data.data
          //console.log(res.data.data)

        })
      .catch(err => {
        console.log(err)
      })
    },
    mounted() {
        //console.log(this.logo)
        
    }
}
</script>

<style>
  .become-buyer {
    height: 300px;
  }
</style>
