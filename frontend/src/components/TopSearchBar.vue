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
                <v-list-item-title>Hello, {{mobile_number}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
            >
                <v-list-item-content>
                    <v-btn to="/profile" class="text-center"><v-list-item-title >Profile</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title to="/profile">Change Password</v-list-item-title></v-btn>
                    <v-btn to="/preferences" class="text-center"><v-list-item-title>Preferences</v-list-item-title></v-btn>
                    <v-btn to="/add-product" class="text-center"><v-list-item-title>Add Products</v-list-item-title></v-btn>
                    <v-btn to="/list-product" class="text-center"><v-list-item-title>List Products</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title to="/profile">Quick Product Upload</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title to="/profile">Image Gallery</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title to="/profile">Retailers</v-list-item-title></v-btn>
                    <v-btn><v-list-item-title to="/profile">Help &amp; Support</v-list-item-title></v-btn>
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
    props: ['mobile_number','logo'],
        data () {
            return {
            drawer: null,
            items: [
                { title: 'logout', icon: 'gavel' },
            ],
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
    }
  }
</script>