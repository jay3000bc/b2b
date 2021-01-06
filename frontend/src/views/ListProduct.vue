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
                      <v-text-field
                        label="Seach"
                        placeholder="Search"
                        outlined
                        v-model="searchQuery"
                      ></v-text-field>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">CODE</th>
                                        <th class="text-left">NAME</th>
                                        <th class="text-left">PRICE</th>
                                        <th class="text-left">IMAGE</th>
                                        <th class="text-left">STOCK</th>
                                        <th class="text-left">AVAILABILITY</th>
                                        <th class="text-left">STATUS</th>
                                        <th class="text-left">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-show="index <= producttoshow" v-for="(item, index) in resultQuery" :key="item.name">
                                        <td>{{ item.code }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>
                                          {{ item.rate }}
                                        </td>
                                        <td v-if="item.thumbnail_image.length > 0 ">
                                            <span class="mr-2"  v-for="photo in item.thumbnail_image" :key="photo">
                                                <img width="50" height="50" :src="photo" alt="no-image">
                                            </span>
                                        </td>
                                        <td v-else>
                                            <img src="@/assets/no-image.png" width="40" alt="">
                                        </td>
                                        <td>{{item.stock}}</td>
                                        <td>
                                             <v-select 
                                                style="width: 100px;"
                                                :items="options_yes_no"
                                                label="Select"
                                                :value="(item.stock > 0) ? 'yes' : 'no'"
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
                                        <td width="300"><v-btn :to="{ name: 'SingleProduct', params: { id: item.slug }}"  class="mr-2"><span class="mdi mdi-eye"></span></v-btn><v-btn  :to="{ name: 'AddProduct', params: { id: item.id }}"><span class="mdi mdi-tooltip-edit"></span></v-btn><v-btn class="ml-2"  @click="delete_product(item.id)"><span class="mdi mdi-delete"></span></v-btn></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                       <div class="text-center ma-3">
                          <v-btn v-show="producttoshow < totalProducts" @click="producttoshow += 5">Load more...</v-btn>
                       </div>
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
            producttoshow: 5,
            totalProducts: 0,
            searchQuery: null,
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
      change_available(e, unit_id) {
        //console.log(e, unit_id);
        let data = {
          unit_id: unit_id,
          availability: e
        } 
        this.$store.dispatch('updateProductAvalibility', data)
        .then(() => {
          //console.log(res)
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
        //console.log(e, unit_id);
        let data = {
          unit_id: unit_id,
          status: e
        } 
        this.$store.dispatch('updateProductStatus', data)
        .then(() => {
          //console.log(res)
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
      delete_product(id)
      {
        console.log(id)
        this.$swal({
          title: 'Are you sure?',
          text: 'Once deleted, you will not be able to recover this product!',
          icon: 'warning',
          showCancelButton: true,
            confirmButtonText: 'Yes Delete it!',
            cancelButtonText: 'No, Keep it!',
            showCloseButton: true,
          }).then((result) => {
            if(result.value) 
            {
              //this.$swal('Deleted', 'You successfully deleted this file', 'success')
              this.$store.dispatch('deleteProduct', id)
                .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.$swal({
                            icon: 'success',
                            title: 'Congrats',
                            text: 'Product deleted successfully',
                        });
                        var removeIndex = this.products.map(function(item) { return item.id; }).indexOf(id);
                        this.products.splice(removeIndex, 1);
                        break;
                    case 4:
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                        break;
                    case 6:
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong !',
                        });
                        break;
                    default:
                    break;
                }
                })
                .catch(err => {
                // console.log(err)
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            })
            } 
            else 
            {
              this.$swal('Cancelled', 'Your Order is still intact', 'info')
            }
          })
      },
    },
    created() {
      this.$store.dispatch('getProducts')
        .then((res) => {
        //console.log(res.data.data);
        this.products = res.data.data
        this.totalProducts = this.products.length
      })
      .catch(err => {
          console.log(err)
      })
      
    },
    mounted() {
      //console.log(this.totalProducts)
        
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
