<template>
  <div class="become-seller">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Become a  Seller</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="become-seller-body">
                  <v-btn @click="becomeSeller">Become a Seller</v-btn>
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
    name: 'BecomeSeller',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        },
        becomeSeller() {
            this.$store.dispatch('becomeSeller')
                .then(() => {
                  this.$router.push('/dashboard') 
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
      
    },
    mounted() {
        //console.log(this.logo)
    }
}
</script>

<style>
  .become-seller-body {
    height: 300px;
  }
</style>
