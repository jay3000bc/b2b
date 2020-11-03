<template>
  <div class="single-product">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>
                  <v-row>
                      <v-col cols="12" sm="5" >
                        <img :src="logo" width="50" alt=""> 
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-btn class="float-right mt-2">Order Quantity [{{totalQuantity}}]</v-btn>
                      </v-col>
                      <v-col cols="12" sm="4" class="float-right">
                         <v-autocomplete
                          :items="product_autocomplete"
                          outlined
                          item-text="name"
                          item-value="id"
                          :placeholder="business_name"
                          @change="searchProduct"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="single-product-content pa-5">
                      <v-row>
                          <v-col md="6">
                            <VueSlickCarousel
                              ref="c1"
                              :infinite = "images.length"
                              :slidesToShow="1"
                              slidesToScroll: 1,
                              :asNavFor="$refs.c2"
                              :focusOnSelect="true">
                              <div v-for="(image,i) in images"
                                :key="i"><img :src="image.src"></div>
                            </VueSlickCarousel>
                            <VueSlickCarousel
                              ref="c2"
                              :infinite = "thumbnail_images.length"
                              :asNavFor="$refs.c1"
                              :slidesToShow="4"
                              :focusOnSelect="true">
                              <div v-for="(item,j) in thumbnail_images"
                                :key="j"><img :src="item.src"></div>
                            </VueSlickCarousel>
                            </v-col>
                             <v-col md="6">
                                <h2>{{name}}</h2><br>
                                <h4>{{description}}</h4><br>
                                <v-simple-table>
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Available options</th>
                                            <th class="text-left">Price</th>
                                            <th class="text-left">Order Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in products" :key="product.name">
                                            <td width="50%">{{ product.unit }}
                                                <v-chip
                                                    class="ma-2"
                                                    color="green"
                                                    text-color="white"
                                                    v-if="product.stock > 0"
                                                    >
                                                    Available
                                                </v-chip>
                                                <v-chip
                                                    class="ma-2"
                                                    color="red"
                                                    text-color="white"
                                                    v-else-if="product.stock == 0"
                                                    >
                                                    Not available
                                                    </v-chip>
                                            </td>
                                            <td width="30%">Rs. {{ product.mrp }}</td>
                                            <td width="20%"><v-text-field
                                                outlined
                                                dense
                                                ref="quantity"
                                                v-model="product.quantity"
                                                label="quantity"
                                                placeholder="quantity"
                                                class="mt-4"
                                            ></v-text-field></td>
                                        </tr>
                                    </tbody>
                                     <tfoot>
                                        <tr>
                                            <td colspan="3" class="pa-0 ma-0"><v-divider></v-divider></td>
                                        </tr>
                                        <tr>
                                            <th class="text-left"></th>
                                            <th class="text-left">Total Qauntity</th>
                                            <th class="text-left">{{totalQuantity}}</th>
                                        </tr>
                                        <tr>
                                          <td colspan="3" class="text-right"><v-btn class="success">Confirm Order</v-btn></td>
                                        </tr>
                                    </tfoot>
                                    </template>
                                </v-simple-table>
                            
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    name: 'SingleProduct',
    components: {
        Footer,
        TopSearchBar,
        VueSlickCarousel 
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            images: [],
            name: null,
            description: null,
            products: [],
            total: 0,
            order_quantity: 0,
            product_autocomplete: [],
            business_name: null,
            thumbnail_images: [],
        }
    }, 
    computed: {
        totalQuantity()
        {
          let total = 0
          Object.keys(this.products).forEach(key => {
              total = parseInt(total) + parseInt(this.products[key].quantity) // value of the current key

          })
          return total
        }
    },
    methods: {
        searchProduct(id) 
        {
          console.log(id)
          this.getProductDetails(id)
        },
        getProductDetails(id) {
          this.$store.dispatch('getProduct', id)
          .then((res) => {
              if(res.data.data) {
                //console.log(res.data.data)
                this.images = []
                this.products = []
                this.thumbnail_images = []
                this.product_category = res.data.data[0].category,
                this.product_sub_category = res.data.data[0].sub_category,
                this.name = res.data.data[0].name,
                this.description = res.data.data[0].description,
                this.tax  = res.data.data[0].tax
                if(res.data.data[0].tax)
                  this.tax_input = true 
                for (let i = 0; i < res.data.data[0].photos.length; i++) {
                    this.images.push({
                        src: res.data.data[0].photos[i].big_image
                    }) 
                }
                for (let i = 0; i < res.data.data[0].photos.length; i++) {
                    this.thumbnail_images.push({
                        src: res.data.data[0].photos[i].thumbnail_image
                    }) 
                }
                //console.log(this.images)
                // this.thumbnail_images = res.data.data.thumbnail_image
                // console.log(this.thumbnail_images)
                for (let i = 0; i < res.data.data[0].units.length; i++) {
                  this.products.push({
                    unit: res.data.data[0].units[i].units,
                    code: res.data.data[0].units[i].code,
                    mrp: res.data.data[0].units[i].mrp,
                    rate: res.data.data[0].units[i].rate,
                    moq: res.data.data[0].units[i].moq,
                    available: res.data.data[0].units[i].available,
                    stock: res.data.data[0].units[i].stock,
                    quantity: 0
                  })
                  
                }
              }
          })
          .catch(err => {
              console.log(err)
          })
        }
    },
    created() {
      if(this.$route.params.id) 
      {
        this.getProductDetails(this.$route.params.id)
      }
      
      this.$store.dispatch('getProfile')
          .then((response) => {
          //console.log(res)
          let user = response.data.data
          this.logo = user.logo_url
          this.business_name = `Search in ${user.business_name}`
          //console.log(this.user_type)
      
      })
      .catch(err => {
        console.log(err)
      })
      this.$store.dispatch('getProducts')
        .then((res_product_list) => {
        this.product_autocomplete = res_product_list.data.data
        //console.log(this.product_autocomplete);
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
  .slick-slider:focus {
     outline: none;
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
