<template>
  <div class="dashboard">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo" @onChangeSearchKeyword="onChangeSearchKeyword($event)" @onChangeState="onChangeState($event)" />
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
            <v-card>
                <v-card-title>Search Results</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row dense>
                        <v-col
                        v-for="result in search_results"
                        :key="result.id"
                        cols="3"
                        >
                        <v-card class="mb-5 mr-2">
                            <div @click="singleProduct(result.id)">
                              <v-img
                              :src="result.logo_url"
                              class="white--text align-end"
                              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                              height="200px"
                              >
                              </v-img>
                            </div>
                            <v-card-title class="ml-0 py-0 pt-2 subtitle-2" v-if="result.user_type">{{result.business_name}}</v-card-title>
                            <v-card-title class="ml-0 py-0 pt-2 subtitle-2" v-else>Sold by - {{result.business_name}}</v-card-title>
                            <v-card-title class="ml-0 py-0 pb-2 subtitle-2" v-if="result.state">{{result.state}}, {{result.city}}</v-card-title>
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
          search_results: [],
          mobile_number: null,
          logo: null,
          valid:true,
          buyer: false,
        }
    }, 
    computed: {
        
    },
    methods: {
        singleProduct(id)
        {
          this.$router.push('/product-details/'+id)
        },
        validate() {
            
        },
        onChangeSearchKeyword()
        {
          //console.log('Hello' + this.$route.params.search_key)
          let data= {
            search_keyword: this.$route.params.search_key,
            state: ''
          }
          this.$store.dispatch('getSearchResult', data)
              .then((res) => {
                this.search_results = res.data.data
              //console.log(res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
        },
        onChangeState(e)
        {
          //console.log(e)
          let data= {
            search_keyword: this.$route.params.search_key,
            state: e
          }
          this.$store.dispatch('getSearchResult', data)
              .then((res) => {
                this.search_results = res.data.data
              //console.log(res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
        }
    },
    created() {
      let data= {
        search_keyword: this.$route.params.search_key,
        state: ''
      }
      this.$store.dispatch('getSearchResult', data)
          .then((res) => {
            this.search_results = res.data.data
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
