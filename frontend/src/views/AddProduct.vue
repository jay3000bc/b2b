<template>
  <div class="dashboard">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-card>
                <v-card-title>{{title}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-autocomplete 
                    v-if="product_categories_input"
                    outlined
                    ref="product_category"
                    v-model="product_category"
                    :items="product_categories"
                    label="Product category"
                    placeholder="Selct Product Category"
                  ></v-autocomplete>
                  <v-btn v-if="product_categories_input"  color="primary" text class="float-right d-block" @click="product_sub_categories_input=true">Add Sub-category</v-btn>
                  <v-autocomplete v-show="product_sub_categories_input"
                    outlined
                    ref="product_sub_category"
                    v-model="product_sub_category"
                    :items="product_sub_categories"
                    label="Product Sub category *"
                    placeholder="Selct Product Sub Category"
                    :search-input.sync="search"
                    v-on:keyup.enter="sub_category_change"
                    ></v-autocomplete>
                    <v-text-field
                        outlined
                        ref="product_name"
                        v-model="product_name"
                        :rules="[() => !! product_name || 'This field is required']"
                        label="Product Name*"
                        placeholder="Product Name*"
                        required
                    ></v-text-field>
                    <v-textarea
                        outlined
                        name="input-7-4"
                        v-model="product_description"
                        label="Product Description"
                        placeholder="You can add general product description"
                        ></v-textarea>
                    <label for="">Is taxable item ?</label>
                    <v-radio-group v-model="is_taxable" row>
                        <v-radio label="Yes" value="yes" @mousedown="tax_input=true"></v-radio>
                        <v-radio label="No" value="no" @mousedown="tax_input=false"></v-radio>
                    </v-radio-group>
                    <v-text-field
                        v-show="tax_input"
                        outlined
                        ref="tax"
                        v-model="tax"
                        label="Tax"
                        placeholder="Tax"
                    ></v-text-field>
                    <label for="">Is this item grouped ?</label>
                    <v-radio-group v-model="is_item_grouped" row>
                        <v-radio label="Yes" value="yes" @mousedown="add_unit_input=true"></v-radio>
                        <v-radio label="No" value="no" @mousedown="add_unit_input=false"></v-radio>
                    </v-radio-group>
                    <label for="">Upload your product photo(s)</label>
                    <image-gallery @onImageSelected ="onImageSelected($event)"/>
                    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                    <v-row class="mt-4" v-for="(product, index) in products" v-bind:key="index">
                        <v-col :sm="unit_inputbox_length" v-if="add_unit_input">
                            <v-text-field
                                outlined
                                ref="unit"
                                v-model="product.unit"
                                label="Add unit*"
                                placeholder="Add unit*"
                                :rules="[() => !! product.unit || 'This field is required']"
                            ></v-text-field>
                        </v-col>
                        <v-col sm="2" v-if="product_code_preference == 'yes'">
                           <v-text-field
                              outlined
                              ref="code"
                              v-model="product.code"
                              label="Pr.Code"
                              placeholder="Product Code"
                          ></v-text-field>
                        </v-col>
                        <v-col :sm="mrp_inputbox_length" v-if="product_mrp_preference == 'yes'">
                            <v-text-field
                               outlined
                                ref="mrp"
                                v-model="product.mrp"
                                label="MRP"
                                placeholder="MRP"
                            ></v-text-field>
                        </v-col>
                        <v-col :sm="rate_inputbox_length" v-if="product_rate_preference == 'yes'">
                            <v-text-field
                                outlined
                                ref="rate"
                                v-model="product.rate"
                                label="Rate"
                                placeholder="Rate"
                            ></v-text-field>
                        </v-col>
                        <v-col :sm="moq_inputbox_length">
                            <v-text-field
                                outlined
                                ref="moq"
                                v-model="product.moq"
                                label="MOQ"
                                placeholder="MOQ"
                            ></v-text-field>
                        </v-col>
                        <v-col sm="2">
                            <v-select
                            ref="available"
                            v-model="product.available"
                            :items="options_yes_no"
                            label="Available"
                            placeholder="Available"
                            outlined
                            ></v-select>
                        </v-col>
                        <v-col sm="2" v-if="product_stock_preference == 'yes'">
                            <v-text-field
                                outlined
                                ref="stock"
                                v-model="product.stock"
                                label="Stock"
                                placeholder="Stock"
                            ></v-text-field>
                        </v-col>
                        <v-col sm="1" v-if="add_unit_input">
                          <v-btn v-show="index==0" v-on:click="addNewProductUnit" class="float-right" color="success" x-large><i class="fa fa-plus"></i></v-btn>
                          <v-btn v-show="index >= 1" v-on:click="removeProductUnit(index)" class="float-right" color="success" x-large><i class="fa fa-minus"></i></v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <ProductPreview v-model="showPreviewProduct"/>
                  <v-btn text small color="primary" @click="previewProduct">Preview</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn  color="primary" v-show="save_btn" text :disabled="!valid"  @click="validate">Save</v-btn>
                  <v-btn  color="primary" v-show="update_btn" text :disabled="!valid"  @click="validate">Update</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import ProductPreview from '@/components/ProductPreview.vue'
import TopSearchBar from '@/components/TopSearchBar.vue'
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ImageGallery from '@/components/ImageGallery.vue'
export default {
    name: 'AddProduct',
    components: {
        ProductPreview,
        Footer,
        TopSearchBar,
        vueDropzone,
        ImageGallery
    },
    data () {
      return {
        showPreviewProduct: false,
        selected_images : [],
        business_name: null,
        unit_inputbox_length: 2,
        mrp_inputbox_length: 1,
        rate_inputbox_length: 1,
        moq_inputbox_length: 1,
        title: 'Add Product',
        product_code_disabled: false,
        save_btn: true,
        update_btn: false,
        valid: true,
        mobile_number: null,
        logo: null,
        product_categories: [],
        product_category: null,
        product_sub_categories: [],
        product_sub_category: null,
        product_sub_categories_input: false,
        product_code: null,
        product_name: null,
        product_description: null,
        is_taxable: 'no',
        is_item_grouped: 'yes',
        add_unit_input: true,
        tax: 0,
        tax_input: false,
        dropzoneOptions: {
            url: 'https://httpbin.org/post',
            maxFiles: 5,
            maxFilesize: 5,
            addRemoveLinks: true,
            acceptedFiles: ".jpeg,.jpg,.png,.gif,.bmp",
            uploadMultiple: false
        },
        options_yes_no: ['yes', 'no'],
        search: null,
        sub_category_input_val: null,
        product: {
          unit: '',
          code: '',
          mrp: '',
          rate: '',
          moq: 1,
          available: 'yes',
          stock: ''
        },
        products: [],
        product_code_preference: 'yes',
        product_mrp_preference: 'yes',
        product_rate_preference: 'yes',
        product_stock_preference: 'yes',
        product_categories_input: false,
        product_images: []
      }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
          if(this.$refs.form.validate())
          {
            if(this.$route.params.id) 
              this.updateProduct()
            else
              this.saveProduct()
          }
        },
        previewProduct() {
          let data = {
              category: this.product_category,
              sub_category: this.product_sub_category,
              name: this.product_name,
              description: this.product_description,
              tax: this.tax,
              product: this.products,
              product_images: this.product_images,
          }
          this.$store.dispatch('previewProduct', data)
          .then(() => {
            this.showPreviewProduct = true
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
        saveProduct() {
          let data = {
              category: this.product_category,
              sub_category: this.product_sub_category,
              name: this.product_name,
              description: this.product_description,
              tax: this.tax,
              is_item_grouped: this.is_item_grouped,
              product: this.products,
              product_images: this.product_images,
              selected_images: this.selected_images
          }
          this.$store.dispatch('saveProduct', data)
          .then((res) => {
            switch (res.data.status) {
                case 2:
                  this.valid = false;
                  this.sending = false;
                  this.$swal({
                      icon: 'success',
                      title: 'Congrats',
                      text: 'Product added successfully',
                  });
                  this.$router.push('/list-product') 
                  break;
                case 3:
                  var error = ''
                  for (const prop in res.data.data) {
                    error += res.data.data[prop]
                  }
                  this.$swal({
                      icon: 'error',
                      title: 'Oops...',
                      text: `${error}`,
                  });
                  break;
                default:
                break;
            }

          })
          .catch(err => {
            console.log(err)
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: `${err}`,
            });
          })
        },
        updateProduct() {
          let data = {
              category: this.product_category,
              sub_category: this.product_sub_category,
              name: this.product_name,
              description: this.product_description,
              tax: this.tax,
              is_item_grouped: this.is_item_grouped,
              product: this.products,
              product_images: this.product_images,
              selected_images: this.selected_images,
              id:  this.$route.params.id
          }
          this.$store.dispatch('updateProduct', data)
          .then(() => {
            //console.log(res)
            this.$swal({
                icon: 'success',
                title: 'Congrats',
                text: 'Product updated successfully',
            });
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
        afterComplete(file) {
            this.product_images.push(file.dataURL)
            //console.log(file.dataURL);
        },
        sub_category_change() {
          this.product_sub_categories.push(this.sub_category_input_val)
        },
        querySelections (v) {
          this.sub_category_input_val = v
        },
        addNewProductUnit() {
          this.products.push({
            unit: '',
            code:'',
            mrp: '',
            rate: '',
            moq: 1,
            available: '',
            stock: ''
          })
        },
        removeProductUnit(index) {
          this.products.splice(index,1)
        },
        onImageSelected(image){
            var file = { size: 200, name: '' };
            this.selected_images.push(image)
            this.$refs.myVueDropzone.manuallyAddFile(file, image);
                
          //console.log(e)
        },
    },
    watch: {
      search (val) {
        val && val !== this.product_sub_category && this.querySelections(val)
        //console.log(val)
      },
    },
    created() {
        this.$store.dispatch('getPreferences')
        .then((res) => {
            if(res.data.data) {
              console.log(res.data.data)
                this.preferences = res.data.data
                // this.customer_type = this.preferences.customer_type
                // this.visibility = this.preferences.visibility
                this.product_stock_preference = this.preferences.SKU
                this.product_code_preference = this.preferences.product_code
                this.product_rate_preference = this.preferences.display_rate
                this.product_mrp_preference = this.preferences.display_mrp
                // this.display_margin = this.preferences.display_margin
                // this.general_info = this.preferences.general_info
                this.product_categories = this.preferences.categories
                if(this.preferences.categories)
                  this.product_categories_input = true
                console.log(this.preferences.categories)
                if(this.product_stock_preference == 'no' && this.product_code_preference== 'no' && this.product_rate_preference == 'no' && this.product_mrp_preference == 'no' )
                {
                  this.unit_inputbox_length = 6
                  this.moq_inputbox_length = 3
                }
                else if(this.product_stock_preference == 'yes' && this.product_code_preference== 'no' && this.product_rate_preference == 'no' && this.product_mrp_preference == 'no' )
                {
                  this.unit_inputbox_length = 5
                  this.moq_inputbox_length = 2
                }
                else if(this.product_stock_preference == 'yes' && this.product_code_preference== 'yes' && this.product_rate_preference == 'no' && this.product_mrp_preference == 'no' )
                {
                  this.unit_inputbox_length = 4
                  this.moq_inputbox_length = 1
                }
                else if(this.product_stock_preference == 'yes' && this.product_code_preference== 'yes' && this.product_rate_preference == 'yes' && this.product_mrp_preference == 'no' )
                {
                  this.unit_inputbox_length = 3
                  this.moq_inputbox_length = 1
                }
                else if(this.product_stock_preference == 'yes' && this.product_code_preference== 'yes' && this.product_rate_preference == 'no' && this.product_mrp_preference == 'no' )
                {
                  this.unit_inputbox_length = 4
                  this.moq_inputbox_length = 1
                }
                else if(this.product_stock_preference == 'no' && this.product_code_preference== 'no' && this.product_rate_preference == 'yes' && this.product_mrp_preference == 'yes' )
                {
                  this.unit_inputbox_length = 5
                  this.moq_inputbox_length = 2
                }
                 else if(this.product_stock_preference == 'no' && this.product_code_preference== 'yes' && this.product_rate_preference == 'yes' && this.product_mrp_preference == 'yes' )
                {
                  this.unit_inputbox_length = 4
                  this.moq_inputbox_length = 1
                }
                 else if(this.product_stock_preference == 'yes' && this.product_code_preference== 'no' && this.product_rate_preference == 'yes' && this.product_mrp_preference == 'yes' )
                {
                  this.unit_inputbox_length = 4
                  this.moq_inputbox_length = 1
                }
                 else if(this.product_stock_preference == 'yes' && this.product_code_preference== 'yes' && this.product_rate_preference == 'no' && this.product_mrp_preference == 'yes' )
                {
                  this.unit_inputbox_length = 3
                  this.moq_inputbox_length = 1
                }
                 else if(this.product_stock_preference == 'no' && this.product_code_preference== 'yes' && this.product_rate_preference == 'no' && this.product_mrp_preference == 'yes' )
                {
                  this.unit_inputbox_length = 4
                  this.moq_inputbox_length = 2
                }
                 else if(this.product_stock_preference == 'yes' && this.product_code_preference== 'no' && this.product_rate_preference == 'yes' && this.product_mrp_preference == 'no' )
                {
                  this.unit_inputbox_length = 4
                  this.moq_inputbox_length = 2
                }
            }
        })
        .catch(err => {
            console.log(err)
        })


        if(this.$route.params.id) {
          this.title = 'Edit Product'
          this.product_code_disabled = true
          this.save_btn = false
          this.update_btn = true
          this.$store.dispatch('getProduct', this.$route.params.id)
          .then((res) => {
              if(res.data.data) {
                console.log(res.data.data)
                this.product_category = res.data.data[0].category,
                this.product_sub_category = res.data.data[0].sub_category,
                this.product_name = res.data.data[0].name,
                this.product_description = res.data.data[0].description,
                this.tax  = res.data.data[0].tax
                this.is_item_grouped = res.data.data[0].is_item_grouped
                if(res.data.data[0].is_item_grouped == 'yes')
                  this.add_unit_input = true
                else
                  this.add_unit_input = false
                if(res.data.data[0].tax)
                  this.tax_input = true 
                for (let i = 0; i < res.data.data[0].photos.length; i++) {
                  var file = { size: 200, name: res.data.data[0].photos[i].photo_name };
                  this.$refs.myVueDropzone.manuallyAddFile(file, res.data.data[0].photos[i].photo_url);
                }
                for (let i = 0; i < res.data.data[0].units.length; i++) {
                  this.products.push({
                    unit: res.data.data[0].units[i].units,
                    code: res.data.data[0].units[i].code,
                    mrp: res.data.data[0].units[i].mrp,
                    rate: res.data.data[0].units[i].rate,
                    moq: res.data.data[0].units[i].moq,
                    available: res.data.data[0].units[i].available,
                    stock: res.data.data[0].units[i].stock
                  })
                }
              }
          })
          .catch(err => {
              console.log(err)
          })
        }
    },
    mounted() {
      if(! this.$route.params.id) 
        this.products.push(this.product)

        //console.log(this.logo)
        
    }
}
</script>

<style>
  .dashboard-content {
    height: 300px;    
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
