<template>
<v-dialog v-model="show" max-width="800px">
    <v-card>
        <div class="float-right">
            <v-btn text small @click.stop="show=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
        </div>
        <v-row no-gutters>
            <v-col
                cols="12"
                sm="12"
                md="12"
                class="pl-4"
            > 
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
                <v-card-title class="font-weight-black text-center d-block">
                    Change Shipping Address: <br><br>
                </v-card-title>    
                <v-text-field
                    outlined
                    ref="business_address"
                    v-model="business_address"
                    :rules="[
                    () => !!business_address || 'This field is required',
                    () => !!business_address && business_address.length <= 25 || 'Address must be less than 25 characters']"
                    label="Business Address *"
                    placeholder="Snowy Rock Pl"
                    counter="25"
                    required
                ></v-text-field>
                <v-autocomplete
                    outlined
                    ref="state"
                    v-model="state"
                    :rules="[() => !!state || 'This field is required']"
                    :items="states"
                    label="State *"
                    placeholder="Select..."
                    v-on:change="change_state"
                    required
                ></v-autocomplete>
                <v-autocomplete
                    outlined
                    ref="city"
                    v-model="city"
                    :rules="[() => !!city || 'This field is required']"
                    :items="cities"
                    label="City *"
                    placeholder="Select..."
                    required
                ></v-autocomplete>
                <v-text-field
                    outlined
                    ref="zip"
                    v-model="zip"
                    :rules="[() => !!zip || 'This field is required',
                    () => !! zip && /[0-9]/.test(zip) || 'Zip must be integer']"
                    label="ZIP / Postal Code *"
                    required
                    placeholder="799383"
                ></v-text-field>
                <v-autocomplete
                    outlined
                    ref="country"
                    v-model="country"
                    :rules="[() => !!country || 'This field is required']"
                    :items="countries"
                    label="Country *"
                    placeholder="Select..."
                    required
                ></v-autocomplete>
                <v-checkbox
                    v-model="default_address"
                    :label="`Choose as default address`"
                    >
                </v-checkbox>
                <v-card-actions>
                  <v-btn  @click.stop="show=false">Cancel</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :loading="sending"
                    :disabled="sending"  
                    color="primary" 
                     
                    @click="validate"
                  >Submit</v-btn>
                </v-card-actions>
            </v-form>  
            </v-col>
        </v-row>
    </v-card>
    
     
</v-dialog>
</template>

<script>


export default {
    data() {
        return {
            default_address: false,
            valid: true,
            sending: false,
            states: [ 
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"
            ],
            cities:[] ,
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
            business_address: null,
            city: null,
            state: null,
            zip: null,
            country: null, 
        }
    },
    props: {
        value: Boolean,
        order_id: Number
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
        validate () {
            if(this.$refs.form.validate())
            {
                this.updateAddress()
            }
        },
        showChangeShippingAddress() {
            this.$emit('showChangeShippingAddress')
        },
        updateAddress() {
            this.sending = true;
            let dataAddress = {
                order_id: this.order_id,
                business_address: this.business_address,
                city:  this.city,
                state: this.state,
                zip: this.zip,
                country: this.country,
                default_address: (this.default_address == true) ? 1 : 0
            }
            //console.log(dataAddress)
            this.$store.dispatch('updateAddress', dataAddress)
                .then((res) => {
                    switch (res.data.status) {
                        case 2:
                            if(res.data.data.default_address == true)
                                this.$emit('updateDefaultAddress')
                            this.show = false
                            this.sending = false;
                            this.$swal({
                                icon: 'success',
                                title: 'Congrats',
                                text: 'Address updated successfully',
                            });
                            this.$emit('choosedDefaultAddress', this.default_address )
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
            },
            change_state() {
                //console.log(this.state)
                if(this.state != null)
                {
                    this.$store.dispatch('getCities', this.state)
                    .then((res) => {
                    this.cities = res.data.data
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
            },
            // chooseDefaultAddress() {
            //     this.$emit('choosedDefaultAddress', this.default_address )
            // }
        },
        created() {
            this.$store.dispatch('getAddressByOrder', this.order_id)
            .then((res) => {
                //console.log(res.data.data.length)
                if(res.data.data.length > 0)
                {
                    this.user = res.data.data[0]
                    this.default_address = this.user.default_address
                    this.business_address = this.user.business_address
                    this.state = this.user.state
                    this.zip = this.user.zip
                    this.country = this.user.country
                    if(this.state != null)
                        this.change_state();
                    this.city = this.user.city
                }
                else
                {
                    this.$store.dispatch('getDefaultAddress')
                    .then((res) => {
                        if(res.data.data.length > 0)
                        {
                            this.user = res.data.data[0]
                            this.default_address = this.user.default_address
                            this.business_address = this.user.business_address
                            this.state = this.user.state
                            this.zip = this.user.zip
                            this.country = this.user.country
                            if(this.state != null)
                                this.change_state();
                            this.city = this.user.city
                        }
                        else
                        {
                            this.$store.dispatch('getProfile')
                                .then((res) => {
                                let user = res.data.data
                                this.business_address = user.business_address
                                this.city = user.city
                                this.zip = user.zip
                                this.state = user.state
                                this.country = user.country
                                if(this.state != null)
                                    this.change_state();
                                this.city = this.user.city
                                
                                //console.log(this.user_type)
                            
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            }) 

          
        }
    }
</script>
<style>
.divider-right {
    border-left:1px solid #000;
}
/* If the screen size is 600px wide or less */
  @media screen and (max-width: 600px) {
    .divider-right {
        border-left:none;
    }
  }
</style>