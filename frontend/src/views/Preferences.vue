<template>
  <div class="preferences">
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
              <v-card ref="form">
                <v-card-title>Preferences</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="pb-0">
                            Customer Type
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="pb-0">
                          Who are your customers? <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="pb-0">
                        <v-select v-on:change="customer_type_change"
                        v-model="customer_type"
                        :items="customer_types"
                        label="Select"
                        outlined
                        dense
                        ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="py-0">
                            Visibility &amp; Privacy
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="py-0">
                          Would you like your product to be visible to everyone? <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                            <v-select
                                v-model="visibility"
                                :items="options_yes_no"
                                label="Select"
                                outlined
                                dense
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="py-0">
                            SKU 
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="py-0">
                            Would you like to maintain a Stock Keeping Unit? <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                        <v-select
                        v-model="SKU"
                        :items="options_yes_no"
                        label="Select"
                        outlined
                        dense
                        ></v-select>
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="py-0">
                            Product Code
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="py-0">
                            Do you want to show Product Codes for your Products? <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                        <v-select
                        v-model="product_code"
                        :items="options_yes_no"
                        label="Select"
                        outlined
                        dense
                        ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="py-0">
                            Display Rate 
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="py-0">
                            Would you like to show rate of your products to retailers?  <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                            <v-select
                            v-model="display_rate"
                            :items="options_yes_no"
                            label="Select"
                            outlined
                            dense
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row v-show="show_display_mrp">
                        <v-col cols="12" sm="3" md="3" lg="3" class="py-0">
                            Display MRP <span v-show="show_to_retailers">to retailers</span>
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="py-0">
                            Would you like to show MRP of your products to retailers?   <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                            <v-select
                            v-model="display_mrp"
                            :items="options_yes_no"
                            label="Select"
                            outlined
                            dense
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="py-0">
                            Display Margin 
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="py-0">
                            Would you like to show Margin?   <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                            <v-select
                            v-model="display_margin"
                            :items="options_yes_no"
                            label="Select"
                            outlined
                            dense
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="pt-0">
                            Category  
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="pt-0">
                            You can create different categories to group your products   <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="pt-0">
                            
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3" class="pt-0"> 
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7" class="pt-0">
                             <v-combobox multiple
                                outlined
                                v-model="categories" 
                                label="Categories" 
                                append-icon
                                chips
                                deletable-chips
                                class="tag-input"
                                :search-input.sync="search" 
                                @keyup.tab="updateTags"
                                @paste="updateTags">
                            </v-combobox>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2" class="pt-0">
                            
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            General Info/ Message  
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7">
                           If you add a general info or message. It wil appear at the top of the page  <v-btn small color="success">Help?</v-btn>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2">
                            
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3"> 
                        </v-col>
                        <v-col cols="12" sm="7" md="7" lg="7">
                           <v-textarea
                                outlined
                                name="input-7-4"
                                v-model="general_info"
                                ></v-textarea>
                         </v-col>
                        <v-col cols="12" sm="2" md="2" lg="2">
                            
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <v-btn text>Cancel</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!valid" color="primary" text @click="validate">Submit</v-btn>
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
import TopSearchBar from '@/components/TopSearchBar.vue'

export default {
    name: 'Preferences',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            customer_type: null,
            visibility:null,
            SKU: null,
            product_code: null,
            display_rate: null,
            display_mrp: null,
            display_margin: null,
            show_display_mrp: true,
            show_to_retailers: false,
            categories: [],
            subCategories: [],
            general_info: null,
            customer_types: ['Only Retailers', 'Individual Customer', 'Both'],
            options_yes_no: ['yes', 'no'],
            items: [],
            search: "" //sync search
        }
    }, 
    computed: {
        
    },
    methods: {
        preferenceUpdate() {
            let data = {
                customer_type: this.customer_type,
                visibility: this.visibility,
                SKU: this.SKU,
                product_code: this.product_code,
                display_rate:  this.display_rate,
                display_mrp: this.display_mrp,
                display_margin: this.display_margin,
                general_info: this.general_info,
                categories: this.categories

            }
            this.$store.dispatch('preferenceUpdate', data)
            .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.$swal({
                            icon: 'success',
                            title: 'Congrats',
                            text: 'Preferences updated successfully',
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
        },
        validate() {
            this.preferenceUpdate()
        },
        customer_type_change() {
            if(this.customer_type == 'Individual Customer')
            {
                this.display_mrp = 'Yes'
                this.show_display_mrp = false
                this.show_to_retailers = false
            }
            else if(this.customer_type == 'Both')
            {
                this.display_mrp = ''
                this.show_display_mrp = true,
                this.show_to_retailers = true
            }
            else 
            {
                this.display_mrp = ''
                this.show_display_mrp = true
                this.show_to_retailers = false
            }
        },
        updateTags() {
            this.$nextTick(() => {
                this.categories.push(...this.search.split(","));
                this.$nextTick(() => {
                this.search = "";
                });
            });
    }
    },
    created() {
        this.$store.dispatch('getPreferences')
        .then((res) => {
            if(res.data.data) {
                this.preferences = res.data.data
                this.customer_type = this.preferences.customer_type
                this.visibility = this.preferences.visibility
                this.SKU = this.preferences.SKU
                this.product_code = this.preferences.product_code
                this.display_rate = this.preferences.display_rate
                this.display_mrp = this.preferences.display_mrp
                this.display_margin = this.preferences.display_margin
                this.general_info = this.preferences.general_info
                console.log(this.preferences.categories)
                if(this.preferences.categories[0] != null  )
                    this.categories = this.preferences.categories
            }
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

<style scoped>
  .tag-input span.chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 1em;
}

.tag-input span.v-chip {
  background-color: #1976d2;
  color: #fff;
  font-size:1em;
  padding-left:7px;
}

.tag-input span.v-chip::before {
    content: "label";
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}
</style>
