<template>
  <div class="buyers">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Buyers</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="buyers-body">
                    <v-row dense>
                        <v-col
                        v-for="buyer in buyers"
                        :key="buyer.id"
                        cols="3"
                        >
                        <v-card class="mb-5 mr-2">
                            <v-img
                            :src="buyer.logo_url"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                            </v-img>
                            <v-card-title class="justify-center caption">{{buyer.business_name}}<br>{{buyer.city}}, {{buyer.state}} </v-card-title>
                        </v-card>
                        </v-col>
                    </v-row>
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
    name: 'Buyers',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            buyer: false,
            buyers: [],
        }
    }, 
    computed: {
        
    },
    methods: {
    },
    created() {
      this.$store.dispatch('getBuyers')
          .then((res) => {
            this.buyers = res.data.data
            console.log(res.data.data)

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
 .buyers-body {
   height: 300px;
 }
</style>
