<template>
   <v-dialog v-model="show" max-width="1200px">
        <v-card>
            <v-card-title>Product Preview<v-spacer></v-spacer><v-btn text small @click.stop="show=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
            <div class="single-product-content pa-5">
                <v-row>
                    <v-col md="4">
                        <VueSlickCarousel
                            ref="c1"
                            :asNavFor="$refs.c2"
                            :focusOnSelect="true">
                            <div v-for="(item,i) in images"
                                :key="i"><img width="300" :src="item.src"></div>
                            </VueSlickCarousel>
                            <VueSlickCarousel
                            ref="c2"
                            :asNavFor="$refs.c1"
                            :slidesToShow="4"
                            :focusOnSelect="true">
                            <div v-for="(item,i) in images"
                                :key="i"><img width="50" :src="item.src"></div>
                            </VueSlickCarousel>
                        </v-col>
                        <v-col md="8">
                            <h2>{{name}}</h2><br>
                            <h4>{{description}}</h4><br>
                            <h4>Is item taxable {{description}}</h4><br>
                            <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Available options</th>
                                        <th class="text-left">Price</th>
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
                                                Available ({{product.stock}})
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
                                        <td width="30%">&#x20B9; {{ product.mrp | formatPrice }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                        
                        </v-col>
                </v-row>
            </div>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click.stop="show=false">Close</v-btn>
            </v-card-actions>
        </v-card>
                
    </v-dialog>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    name: 'ProductPreview',
    components: {
        VueSlickCarousel 
    },
    props: {
        value: Boolean
    },
    data () {
        return {
            images: [],
            name: null,
            description: null,
            products: [],
            total: 0,
            order_quantity: 0,
        }
    }, 
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        validate() {
            
        }
    },
    created() {
      
          
    },
    watch: {
        value(visible) {
            if (visible) 
            {   
                this.$store.dispatch('previewProductDetails', 1)
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
                            quantity: 0
                        })
                        
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            } 
            else 
            {
                console.log("Dialog was closed!")
            }
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
