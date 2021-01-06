<template>
  <div class="become-seller">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Buyer Details</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="become-seller-body">
                 
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
    name: 'BuyerDetails',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
          
        }
    }, 
    computed: {
        
    },
    methods: {
        
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
