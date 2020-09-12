<template>
  <div class="single-product">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Product Details</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="single-product-content pa-5">
                      <v-row>
                          <v-col md="4">
                              <v-carousel :show-arrows="false">
                                    <v-carousel-item
                                    v-for="(item,i) in images"
                                    :key="i"
                                    :src="item.src"
                                    ></v-carousel-item>
                                </v-carousel>
                            </v-col>
                             <v-col md="8">
                                <h2>{{name}}</h2>
                                <h4>{{description}}</h4>
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
                                            <th class="text-left">{{total}}</th>
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

export default {
    name: 'SingleProduct',
    components: {
        Footer,
        TopSearchBar
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
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        }
    },
    created() {
      if(this.$route.params.id) 
      {
          this.$store.dispatch('getProduct', this.$route.params.id)
          .then((res) => {
              if(res.data.data) {
                console.log(res.data.data)
                this.product_category = res.data.data[0].category,
                this.product_sub_category = res.data.data[0].sub_category,
                this.name = res.data.data[0].name,
                this.description = res.data.data[0].description,
                this.tax  = res.data.data[0].tax
                if(res.data.data[0].tax)
                  this.tax_input = true 
                for (let i = 0; i < res.data.data[0].photos.length; i++) {
                    this.images.push({
                        src: res.data.data[0].photos[i].photo_url
                    }) 
                }
                for (let i = 0; i < res.data.data[0].units.length; i++) {
                  this.products.push({
                    unit: res.data.data[0].units[i].units,
                    code: res.data.data[0].units[i].code,
                    mrp: res.data.data[0].units[i].mrp,
                    rate: res.data.data[0].units[i].rate,
                    moq: res.data.data[0].units[i].moq,
                    available: res.data.data[0].units[i].available,
                    stock: res.data.data[0].units[i].stock,
                    quantity: null
                  })
                  
                }
                for (let index = 0; index < this.products.length; index++) {

                    this.total = this.total + this.products[index].quantity 
                }
              }
          })
          .catch(err => {
              console.log(err)
          })
        }
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
