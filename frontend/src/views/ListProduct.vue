<template>
  <div class="product">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Product List <v-spacer></v-spacer><v-btn to="/add-product">Add Product</v-btn></v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="product-content">
                      <div>Category: </div>
                      <div>Sub-Category: </div>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">CODE</th>
                                        <th class="text-left">NAME</th>
                                        <th class="text-left">PRICE</th>
                                        <th class="text-left">IMAGE</th>
                                        <th class="text-left">AVAILABILITY</th>
                                        <th class="text-left">STATUS</th>
                                        <th class="text-left">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in products" :key="item.name">
                                        <td>{{ item.code }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>
                                          {{ item.rate }}
                                        </td>
                                        <td>
                                            <span class="mr-2"  v-for="photo in item.photos" :key="photo.photo_name">
                                                <img width="50" :src="photo.photo_url" :alt="photo.photo_name">
                                            </span>
                                        </td>
                                         <td>
                                             <v-select 
                                                style="width: 100px;"
                                                :items="options_yes_no"
                                                label="Select"
                                                :value="item.available"
                                                @change="change_available($event, item.unit_id)"
                                                dense
                                                solo
                                                class="mt-2"
                                                ></v-select>
                                         </td>
                                        <td>
                                            <v-select
                                                style="width: 100px;"
                                                :value="item.status"
                                                :items="options_active_inactive"
                                                 @change="change_status($event, item.unit_id)"
                                                label="Select"
                                                dense
                                                solo  
                                                class="mt-2"
                                                ></v-select>
                                        </td>
                                        <td><v-btn :to="{ name: 'SingleProduct', params: { id: item.id }}" small class="mr-2">View</v-btn><v-btn small :to="{ name: 'AddProduct', params: { id: item.id }}">Edit</v-btn></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
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
    name: 'ListProduct',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            products: [],
            options_yes_no: ['yes', 'no'],
            availability: null,
            status: null,
            options_active_inactive: ['active', 'inactive'],
        }
    }, 
    computed: {
        
    },
    methods: {
      change_available(e, unit_id) {
        console.log(e, unit_id);
        let data = {
          unit_id: unit_id,
          availability: e
        } 
        this.$store.dispatch('updateProductAvalibility', data)
        .then((res) => {
          console.log(res)
        })
        .catch(err => {
          // console.log(err)
          this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: err,
          });
        })
      },
      change_status(e, unit_id) {
        console.log(e, unit_id);
        let data = {
          unit_id: unit_id,
          status: e
        } 
        this.$store.dispatch('updateProductStatus', data)
        .then((res) => {
          console.log(res)
        })
        .catch(err => {
          // console.log(err)
          this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: err,
          });
        })
      },
    },
    created() {
      this.$store.dispatch('getProducts')
        .then((res) => {
        console.log(res.data.data);
        this.products = res.data.data
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
  /* .product-content {
    height: 300px;    
  } */
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
