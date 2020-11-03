<template>
  <div class="orders">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Orders</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="orders-body">
                  
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
    name: 'OrderHistory',
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
  .orders-body {
    height: 300px;
  }
  .orders .v-image__image--cover {
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
