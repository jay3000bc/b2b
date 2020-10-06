<template>
  <div class="dashboard">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
            <v-card>
                <v-card-title>Search Results</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <h3 class="mt-5 mb-3">Newly added Sellers</h3>
                    <v-row dense>
                        <v-col
                        v-for="seller in sellers"
                        :key="seller.id"
                        cols="3"
                        >
                        <v-card class="mb-5 mr-2">
                            <v-img
                            :src="seller.logo_url"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                            </v-img>
                            <v-card-title v-text="seller.bussiness_name" class="justify-center"></v-card-title>
                            <v-card-title class="justify-center" v-if="seller.state">{{seller.state}}, {{seller.city}}</v-card-title>
                            <v-card-actions class="justify-center pt-0 pb-6">
                                <v-btn class="success" :to="{ name: 'SingleSeller', params: { id: seller.id }}"> View </v-btn>
                            </v-card-actions>
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
    name: 'AddProduct',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            buyer: false,
            desserts: [
            {
              name: 'Sunil Traders',
              orderDate: '21/01/2020',
              dispatchDate: '25/01/2020',
              status: '1',
            },
            {
              name: 'National Traders',
              orderDate: '21/01/2020',
              dispatchDate: '25/01/2020',
              status: '0',
            }
          ],
          sellers: [],
          buyers: [],
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
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
  .dashboard .v-image__image--cover {
    background-size: 80% !important;
    margin-top: 25px;
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
