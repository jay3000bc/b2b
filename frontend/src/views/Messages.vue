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
                  <div >
                     <v-card class="my-shop-content">
                        <v-toolbar
                          flat
                          color="primary"
                          dark
                        >
                          <v-toolbar-title>Messages</v-toolbar-title>
                        </v-toolbar>
                        <v-tabs vertical class="message-tab">
                            <v-tab>
                              <v-icon left>
                              mdi-gmail
                              </v-icon>
                              <span :class="[newMessageCount == 0 ? '' : 'font-weight-black']">Inbox <span v-if="newMessageCount">({{newMessageCount}})</span></span>
                            </v-tab>
                              <v-tab>
                              <v-icon left>
                              mdi-email-outline
                              </v-icon>
                              <span>Sent <span v-if="sent_message_count">({{sent_message_count}})</span></span>
                            </v-tab>
                              <v-tab-item>
                                <v-card flat>
                                      <v-list two-line class="pt-0">
                                        <v-list-item-group
                                        >
                                          <template v-for="(inbox_message, index) in inbox_messages">
                                            <v-list-item :key="inbox_message.title">
                                                <v-list-item-content 
                                                  @click="readMessage(inbox_message.id)"
                                                  :class="[inbox_message.status == 0 ? 'font-weight-black' : '']">
                                                  <v-list-item-title >From : {{inbox_message.buyer_name}} </v-list-item-title>
                                                  <v-list-item-title v-text="inbox_message.message"></v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>

                                            <v-divider
                                              v-if="index < inbox_messages.length - 1"
                                              :key="index"
                                            ></v-divider>
                                          </template>
                                        </v-list-item-group>
                                      </v-list>
                                </v-card>
                            </v-tab-item>
                              <v-tab-item>
                                <v-card flat>
                                  <v-list two-line class="pt-0">
                                    <v-list-item-group
                                    >
                                      <template v-for="(sent_message, index) in sent_messages">
                                        <v-list-item :key="sent_message.title">
                                            <v-list-item-content>
                                              <v-list-item-title>To : {{sent_message.buyer_name}} </v-list-item-title>
                                              <v-list-item-subtitle  v-text="sent_message.message"></v-list-item-subtitle >
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider
                                          v-if="index < sent_messages.length - 1"
                                          :key="index"
                                        ></v-divider>
                                      </template>
                                    </v-list-item-group>
                                  </v-list>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                     </v-card>
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
            newMessageCount: 0,
            messages: [],
            sent_message_count: 0,
            inbox_message_count: 0,
            sent_messages: [],
            inbox_messages: [],
        }
    }, 
    computed: {
      
    },
    methods: {
      validate() {
          
      },
      readMessage(id) {
        this.$store.dispatch('updateMessageStatus', id)
            .then(() => {
            //console.log(res)
            this.inboxMessages()
            this.getMessageCount()
            //this.messages = res.data.data
        
        })
        .catch(err => {
            console.log(err)
            })

        },
        inboxMessages() {
          this.$store.dispatch('getInboxMessages', localStorage.getItem('user_account'))
          .then((res) => {
            //console.log(res.data.data.length)
            this.inbox_message_count = res.data.data.length
            this.inbox_messages = res.data.data 
            // for (let i = 0; i < inbox_messages.length; i++) {
            //   if(inbox_message )
            // }
        
          })
          .catch(err => {
              console.log(err)
          })
        },
        getMessageCount()
        {
          this.$store.dispatch('getNewMessagesCount', localStorage.getItem('user_account'))
          .then((res) => {
              //console.log(res.data.data)
              this.newMessageCount = res.data.data
          
          })
          .catch(err => {
              console.log(err)
          })
        },
    },
    created() {
      this.getMessageCount()
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
        this.inboxMessages()
        this.$store.dispatch('getSentMessages', localStorage.getItem('user_account'))
          .then((res) => {
            //console.log(res.data.data.length)
            this.sent_message_count = res.data.data.length
            this.sent_messages = res.data.data 
        
        })
        .catch(err => {
            console.log(err)
        })
        
    },
    mounted() {
        console.log(this.$route.params.id)
        
    }
}
</script>

<style>
  .my-shop-content {
    min-height:  300px;
  }
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
