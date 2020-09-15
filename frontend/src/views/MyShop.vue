<template>
  <div class="my-shop">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>My Shop</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="my-shop-content">
                     <v-row dense>
                        <v-col
                        v-for="product in products"
                        :key="product.name"
                        cols="3"
                        >
                        <v-card class="mb-5">
                            <v-img
                            :src="product.banner_image"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                            </v-img>
                            <v-card-title v-text="product.name" class="justify-center"></v-card-title>
                            <v-card-actions class="justify-center pt-0 pb-6">
                                <v-btn class="success" :to="{ name: 'SingleProduct', params: { id: product.id }}"> View Options</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-col>
                    </v-row>
                  </div>
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
    name: 'MyShop',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            products: [],
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        }
    },
    created() {
       this.$store.dispatch('getProducts')
        .then((res) => {
        console.log(res.data.data);
        
        this.products = res.data.data
        //console.log(this.products[0].photos[0].photo_url);
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
