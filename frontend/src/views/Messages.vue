<template>
  <div class="my-shop">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-text>
                  <div class="my-shop-content">
                     <v-row dense>
                        <v-col
                         cols="12" sm="4" md="4"
                        >
                            <v-card-title>
                                Buyers
                            </v-card-title>
                        </v-col>
                        <v-col
                         cols="12" sm="8" md="8"
                        >
                            <v-card-title>
                                Messages
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-tabs vertical class="message-tab">
                                <v-tab v-for="message in messages" :key="message.id">
                                    <v-icon left>
                                    mdi-account
                                    </v-icon>
                                    <span v-if="message.status == 1">{{message.user.business_name}}</span>
                                    <span  @click="readMessage(message.id)" v-else>
                                        <span class="font-weight-black">{{message.user.business_name}}</span>
                                    </span>
                                </v-tab>
                                <v-tab-item v-for="message in messages" :key="message.id">
                                    <v-card flat>
                                        <v-card-text>
                                            <p>
                                                {{message.message}}
                                            </p>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
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
    name: 'MyShop',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            messages: []
        }
    }, 
    computed: {
      
    },
    methods: {
        validate() {
            
        },
        readMessage(id) {
            this.$store.dispatch('updateMessageStatus', id)
                .then((res) => {
                //console.log(res)
                this.messages = res.data.data
            
            })
            .catch(err => {
                console.log(err)
                })

            }
    },
    created() {
        if(this.$route.params.id) 
        {
            this.$store.dispatch('getMessageByOrder', this.$route.params.id)
              .then((res) => {
              //console.log(res)
              this.messages = res.data.data
          
              })
              .catch(err => {
                console.log(err)
              })
        }
        else
        {
            this.$store.dispatch('getMessages')
            .then((res) => {
                //console.log(res)
                this.messages = res.data.data
            
            })
            .catch(err => {
                console.log(err)
            })
        }

    },
    mounted() {
        console.log(this.$route.params.id)
        
    }
}
</script>

<style>
  .message-tab .v-tabs-items {
    border-left: 1px solid #000 !important;
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
