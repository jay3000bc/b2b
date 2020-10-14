<template>
    <div class="top-search-bar">
        <v-navigation-drawer
        v-model="drawer"
        absolute
        right
        temporary
        >
            <template v-slot:prepend>
            <v-list-item two-line>
                <v-list-item-content>
                <v-list-item-title>Hello, {{business_name}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list dense>
            <v-list-item>
                <v-list-item-content v-if="seller">
                    <v-btn to="/dashboard" class="text-center"><v-list-item-title >Dashboard</v-list-item-title></v-btn>
                    <v-btn to="/profile" class="text-center"><v-list-item-title >Profile</v-list-item-title></v-btn>
                    <v-btn to="/change-password" class="text-center"><v-list-item-title to="/profile">Change Password</v-list-item-title></v-btn>
                    <v-btn to="/preferences" class="text-center"><v-list-item-title>Preferences</v-list-item-title></v-btn>
                    <v-btn to="/list-product" class="text-center"><v-list-item-title>Products</v-list-item-title></v-btn>
                    <v-btn to="/image-gallery" class="text-center"><v-list-item-title>Image Gallery</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title>Buyers</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title>Orders</v-list-item-title></v-btn>
                    <v-btn to="/my-shop" class="text-center"><v-list-item-title>My Shop</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title>Became a Buyer</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title>Help &amp; Support</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title @click="logout" >Logout</v-list-item-title></v-btn>
                </v-list-item-content>
                <v-list-item-content v-else>
                    <v-btn to="/dashboard" class="text-center"><v-list-item-title >Dashboard</v-list-item-title></v-btn>
                    <v-btn to="/profile" class="text-center"><v-list-item-title >Profile</v-list-item-title></v-btn>
                    <v-btn to="/change-password" class="text-center"><v-list-item-title>Change Password</v-list-item-title></v-btn>
                    <v-btn class="text-center"><v-list-item-title>Suppliers</v-list-item-title></v-btn>
                    <v-btn class="text-center"><v-list-item-title>Order History</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title>Became a Seller</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title>Help &amp; Support</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title @click="logout" >Logout</v-list-item-title></v-btn>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-row
        >
            <v-col
            cols="12"
            sm="2"
            md="2"
            class="top-navigation"
            >

            <v-btn text small v-if="logo"><img :src="logo" width="50" alt=""></v-btn>
            <v-btn text small v-else>logo</v-btn>
            </v-col>
            <v-col
            cols="12"
            sm="5"
            md="5"
            >
                <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    flat
                    label="Enter the keywords what you want to search"
                    solo-inverted
                    no-filter
                    clearable
                    v-on:change='onChange'
                    v-on:keyup.13="onChange"
                    ></v-autocomplete>
            </v-col>
            <v-col
                cols="12"
                sm="2"
                md="2"
            >
                <v-autocomplete
                    flat
                    solo-inverted
                    ref="state"
                    v-model="state"
                    :items="states"
                    v-on:change='onChangeState'
                    placeholder="in All states"
                ></v-autocomplete>
            </v-col>
            <v-col
            cols="12"
            sm="3"
            md="3"
            >
            <div class="float-right top-navigation-menu">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </div>
            </v-col>
        </v-row>
    <v-divider></v-divider>
    </div>
</template>
<script>
  export default {
    name: 'TopSearchBar',
    data () {
        return {
                loading: false,
                items: [],
                search: null,
                select: null,
            
                suggestions: null,
                search_keyword: null,
                state: null,
                mobile_number: null,
                logo: null,
                drawer: null,
                user_type: null,
                seller: false,
                business_name: null,
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
        }
    },
    computed: {
         
    },
     watch: {
      search (val) {
        if (val.length < 3) return;
        val && val !== this.select && this.querySelections(val)

      },
    },
    methods: {
        onChange(e) {
            //console.log(e)
            this.state = null
            this.select = this.$route.params.search_key
            this.$router.push(`/search-results/${e}`)
            this.$emit('onChangeSearchKeyword', e)

        },
        onChangeState(e) {
            this.$emit('onChangeState', e)
        },
        querySelections (v) {
            this.loading = true
            this.$store.dispatch('search', v)
                .then((res) => {
                this.select = this.$route.params.search_key
                this.items =  res.data.data
                this.loading = false
            
            })
            .catch(err => {
                console.log(err)
            })
           
        },
        logout() {
            this.$store.dispatch('logout')
                .then(() => {
                this.$router.push('/')    
                })
                .catch(err => {
                    console.log(err)
            })
        },
    },
    created() {
        if(this.$route.params.search_key){
            console.log(this.$route.params.search_key)
            this.select = this.$route.params.search_key
        }
        this.$store.dispatch('getProfile')
            .then((res) => {
            //console.log(res)
            let user = res.data.data
            this.business_name = user.business_name
            this.mobile_number = user.mobile_number
            this.logo = user.logo_url
            this.user_type = user.user_type
            if(this.user_type == 's')
                this.seller = true
            //console.log(this.user_type)
        
        })
        .catch(err => {
          console.log(err)
        })

    },
  }
</script>