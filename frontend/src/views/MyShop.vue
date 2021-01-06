<template>
  <div class="my-shop">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>
                  <v-row>
                    <v-col cols="12" sm="8" >
                      <img :src="logo" width="50" alt=""> 
                    </v-col>
                    <v-col cols="12" sm="4" class="align-right">
                      <v-text-field
                        label="Seach"
                        :placeholder="business_name"
                        outlined
                        v-model="searchQuery"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="my-shop-content">
                     <v-row dense>
                        <v-col
                        v-for="product in resultQuery"
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
                            <v-card-title style="white-space:nowrap" v-text="product.name.length < 20  ? product.name : product.name.slice(0,20)" class="justify-center ml-0 py-0 pt-2 mb-2 subtitle-2"></v-card-title>
                            <v-card-actions class="justify-center pt-0 pb-6">
                                <v-btn small class="success" :to="{ name: 'SingleProduct', params: { id: product.name.replace(' ', '-').toLowerCase() +'-'+ product.id }}"> View Options</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-col>
                         <v-col class="mb-5 text-center" v-show="products.length == 0">
                          <p>Products not available !</p>
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
            business_name: null,
            products: [],
            searchQuery: null,
            user_id: null,
        }
    }, 
    computed: {
      resultQuery(){
        if(this.searchQuery){
          return this.products.filter((item)=>{
            return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
          })
        }else{
          return this.products;
        }
      }
    },
    methods: {
        validate() {
            
        }
    },
    created() {
        if(this.$route.params.id) 
        {
          this.$store.dispatch('getUser', this.$route.params.id)
            .then((res) => {
            //console.log(res.data)
            let user = res.data.user
            this.logo = user.logo_url
            this.user_id = user.id
            this.business_name = `Search in ${user.business_name}`
          })
          .catch(err => {
            console.log(err)
          })
          this.$store.dispatch('getSellerProducts', this.$route.params.id)
            .then((res) => {
            console.log(res.data.status);
            
            this.products = res.data.data
            //console.log(this.products[0].photos[0].photo_url);
          })
          .catch(err => {
              console.log(err)
          })
        }
        else
        {
          this.$store.dispatch('getProfile')
            .then((res) => {
            //console.log(res)
            let user = res.data.data
            this.logo = user.logo_url
            this.user_id = user.id
            this.business_name = `Search in ${user.business_name}`
            //console.log(this.user_type)
        
          })
          .catch(err => {
            console.log(err)
          })

          this.$store.dispatch('getProducts')
            .then((res) => {
            console.log(res.data.data);
            
            this.products = res.data.data
            //console.log(this.products[0].photos[0].photo_url);
          })
          .catch(err => {
              console.log(err)
          })
        }

    },
    mounted() {
        //console.log(this.$route.params.id)
        
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
