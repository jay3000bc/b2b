<template>
  <div class="profile">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo" v-show="profile_update"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-card ref="form">
                <v-card-title>Profile</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-card-title class="pl-0 mb-2" v-if="business_category">Business Category: {{ business_category }}</v-card-title>
                  <v-text-field
                    outlined
                    ref="business_name"
                    v-model="business_name"
                    :rules="[() => !! business_name || 'This field is required']"
                    :error-messages="errorMessages"
                    label="Business Name *"
                    placeholder="Tomato Inc."
                    required
                    autofocus
                  ></v-text-field>
                  <v-autocomplete
                    v-if="business_category == null"
                    outlined
                    ref="business_category"
                    v-model="business_category"
                    :items="business_categories"
                    label="Business category *"
                    placeholder="Selct Business Type or Category"
                    v-on:change="change_business_category"
                  ></v-autocomplete>
                  <v-text-field
                    outlined
                    ref="others"
                    v-model="others"
                    :rules="[() => !! others || 'This field is required',
                      () => !! others && others.length <  100 || 'The maximum character allowed is 100',
                      (others) => !! others && /[A-Za-z0-9_]/.test(others) || 'Only alphanumeric character allowed'
                      ]"
                    label="Other *"
                    required
                    placeholder="other"
                    v-if="other_type"
                  ></v-text-field>
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
                    () => !! zip && zip.length ==  6 || 'Zip must not be less than 6 digits',
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
                  <v-text-field
                    outlined
                    ref="gst"
                    v-model="gst"
                    :rules="[() => !!gst || 'This field is required']"
                    label="GST *"
                    placeholder="GSTIN1234567"
                    required
                  ></v-text-field>
                  <v-list class="ma-0 pa-0">
                    <v-list-item class="ma-0 pa-0">
                      <v-text-field
                        outlined
                        ref="mobile_number"
                        v-model="mobile_number"
                        label="Contact numbers *"
                        :disabled="true"
                      ></v-text-field>
                      <v-btn @click="addRow" class="ml-2 mb-7 float-right" color="success" x-large><i class="fa fa-plus"></i></v-btn>
                    </v-list-item>
                  </v-list>
                  <v-list class="ma-0 pa-0">
                    <v-list-item class="ma-0 pa-0" v-for="(contact, index) in contacts" :key="index">
                      <v-text-field
                        outlined
                        ref="contact.one"
                        v-model="contact.one"
                        :rules="[() => !! contact.one || 'This field is required',
                        () => !! contact.one && contact.one.length ==  10 || 'Contact number must not be less than 10 digits',
                        () => !! contact.one && /[0-9]/.test(contact.one) || 'Contact number must be integer'
                        ]"
                        label="Contact numbers *"
                        placeholder="7812312369"
                        required
                      ></v-text-field>
                      <v-btn @click="deleteRow(index)" class="float-right ml-2 mb-7" color="error" x-large><i class="fa fa-minus"></i></v-btn>
                    </v-list-item>
                  </v-list>
                  <v-text-field
                    outlined
                    ref="email"
                    v-model="email"
                    :rules="[() => !! email || 'This field is required', 
                    (email) => /.+@.+/.test(email) || 'E-mail must be valid' ]"
                    label="Email *"
                    placeholder="asd@company.com"
                    required
                  ></v-text-field>
                  <label for="dropzone">Bussiness logo</label>
                  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <v-btn text>Cancel</v-btn>
                  <v-spacer></v-spacer>
                  <v-slide-x-reverse-transition>
                    <v-tooltip
                      v-if="formHasErrors"
                      left
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          class="my-0"
                          v-bind="attrs"
                          @click="resetForm"
                          v-on="on"
                        >
                          <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                      </template>
                      <span>Refresh form</span>
                    </v-tooltip>
                  </v-slide-x-reverse-transition>
                  <v-btn :disabled="!valid" color="primary" text @click="validate">Update</v-btn>
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
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import TopSearchBar from '@/components/TopSearchBar.vue'

export default {
  name: 'Profile',
  components: {
    Footer,
    TopSearchBar,
    vueDropzone
  },
 data () {
    return {
      location: null,
      user: null,
      data: '',
      valid: true,
      contacts: [],
      state_selceted: [],
      business_categories: [process.env.VUE_APP_GARMENTS, process.env.VUE_APP_GROCERY, process.env.VUE_APP_PHAMACIST+'/ '+ process.env.VUE_APP_DRIGGIST],
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
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          maxFiles: 1,
          maxFilesize: 2,
          addRemoveLinks: true,
          acceptedFiles: ".jpeg,.jpg,.png,",
          uploadMultiple: false
      },
      errorMessages: '',
      business_name: null,
      business_category: null,
      business_address: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      gst: null,
      mobile_number: null,
      contact_numbers: [],
      email: null,
      logo: null,
      formHasErrors: false,
      profile_update: false,
      user_type: null,
      other_type: false,
      others: null,
      business_category_disabled: false
    }
  }, 
  computed: {
    filterIt(arr, searchKey) {
      return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
    },
  },
  methods: {
    addRow() {
      if(Object.keys(this.contacts).length < 2)
      {
        this.contacts.push({
          one: ''
        })
      }
    },
    deleteRow(index) {
      this.contacts.splice(index,1)
      //this.contact_numbers.splice(index, 1);
    },
    validate () {
      if(this.$refs.form.validate())
      {
        this.contact_numbers = [];
        for (let i = 0; i < this.contacts.length; i++) {
          this.contact_numbers.push(this.contacts[i].one);
        }
        //console.log(this.contact_numbers);
        this.profileUpdate()
      }
     
    },
    afterComplete(file) {
      this.logo = file.dataURL
      //console.log(file.dataURL);
    },
    profileUpdate() {
      let data = {
          business_name: this.business_name,
          business_category: this.business_category,
          contact_numbers: this.contact_numbers,
          business_address: this.business_address,
          city:  this.city,
          state: this.state,
          zip: this.zip,
          country: this.country,
          gst: this.gst,
          email: this.email,
          logo: this.logo,
          others: this.others

      }
      this.$store.dispatch('profileUpdate', data)
      .then((res) => {
        this.profile_update = true
        console.log(res)
        this.$swal({
            icon: 'success',
            title: 'Congrats',
            text: 'Profile updated successfully',
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
    change_business_category(e) {
      if(this.user_type == 'b' && e == 'Others')
      {
        //console.log(e)
        this.other_type =  true
      }
      else
      {
        this.other_type =  false
      }
    },
  },
  created() {
    this.$store.dispatch('getLocation')
        .then((response) => {
        this.country = response.data.country;
    })
    .catch(err => {
      console.log(err)
    })
    this.$store.dispatch('getProfile')
      .then((res) => {
        this.user = res.data.data
        this.business_name = this.user.business_name
        this.business_category = this.user.business_category
        this.business_address = this.user.business_address
        this.state = this.user.state
        this.zip = this.user.zip
        this.country = this.user.country
        this.gst = this.user.gst
        this.mobile_number = this.user.mobile_number
        this.contact_numbers = this.user.contact_numbers
        this.email = this.user.email
        this.logo = this.user.logo_url
        var file = { size: 200, name: "company-logo", type: "image/jpeg" };
        if(this.logo)
          this.$refs.myVueDropzone.manuallyAddFile(file, this.logo);
        for (let i = 0; i < this.contact_numbers.length; i++) {
          if(this.contact_numbers[i])
            this.contacts.push({one: this.contact_numbers[i]});
        }
        if(this.user.status == 1)
        {
          this.profile_update = true
          this.business_category_disabled = true
        }
        if(this.state != null)
          this.change_state();
        this.city = this.user.city
        if(this.user.user_type == 'b')
        {
          this.business_categories.push('Others')
          this.user_type = this.user.user_type
          //this.other_type =  true
          this.others = this.user.other
        }
      })
      .catch(err => {
          console.log(err)
      })
    },
    mounted() {
      
    }
}
</script>

<style>
  .home h2, .home h5 {
    color: #fff;
  }
  .home-image {
    background-image: url('~@/assets/home.jpg');
    height: 62vh;
  }
  .hero-home-text {
    background-color: #E6727B;
  }
  .top-navigation {
    height: 10vh;
  }
  .top-navigation, .top-navigation-menu {
    color: #fff ! important;
  }
  .home-bg {
    background-color:#D4A58B;
    background-image: linear-gradient(to right,#ECC8A0 , #794C5F); /* Standard syntax (must be last) */
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
