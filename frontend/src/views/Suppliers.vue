<template>
  <div class="suppliers">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Suppliers</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row dense>
                        <v-col
                        v-for="supplier in suppliers"
                        :key="supplier.id"
                        cols="3"
                        >
                        <a @click="shop_page(supplier.id)">
                          <v-card class="mb-5 mr-2">
                            <v-img
                            :src="supplier.logo_url"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                            </v-img>
                            <v-card-title class="justify-center caption">{{supplier.business_name}}<br>{{supplier.city}}, {{supplier.state}} </v-card-title>
                        </v-card>
                        </a>
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
    name: 'suppliers',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            supplier: false,
            suppliers: [],
        }
    }, 
    computed: {
        
    },
    methods: {
      shop_page(id) {
        this.$router.push('/my-shop/'+id)
      }
    },
    created() {
      this.$store.dispatch('getSellers')
          .then((res) => {
            this.suppliers = res.data.data
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
 
</style>
