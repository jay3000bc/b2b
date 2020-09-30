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
            cols="3"
            sm="3"
            md="3"
            class="top-navigation"
            >

            <v-btn text small v-if="logo"><img :src="logo" width="50" alt=""></v-btn>
            <v-btn text small v-else>logo</v-btn>
            </v-col>
            <v-col
            cols="3"
            sm="6"
            md="6"
            >
            <v-text-field
                flat
                solo-inverted
                hide-details
                append-icon="mdi-magnify"
                label="Search your products"
                class="hidden-sm-and-down"
            ></v-text-field>
            </v-col>
            <v-col
            cols="3"
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
                mobile_number: null,
                logo: null,
                drawer: null,
                user_type: null,
                seller: false,
                business_name: null,
        }
    },
    methods: {
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