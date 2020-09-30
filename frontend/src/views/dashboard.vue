<template>
  <div class="dashboard">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Dashboard</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="dashboard-content" v-if="buyer">
                    <v-btn color="purple" dark>Pages views: 22</v-btn>
                    <v-btn color="primary ml-3" dark>Order Pending: 1</v-btn>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left text-uppercase font-weight-bold">Customer</th>
                            <th class="text-left text-uppercase font-weight-bold">Order date</th>
                            <th class="text-left text-uppercase font-weight-bold">Dispatch Date</th>
                            <th class="text-left text-uppercase font-weight-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.orderDate }}</td>
                            <td>{{ item.dispatchDate }}</td>
                            <td><span v-if="item.status == 1" class="fa-stack fa-lg"><i class="fa fa-check fa-stack-1x" color="green"></i></span>
                                <span v-else class="fa-stack fa-lg"><i class="fa fa-times fa-stack-1x" color="red"></i></span>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                   <div class="dashboard-content" v-else>
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
    name: 'AddProduct',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            buyer: true,
            desserts: [
            {
              name: 'Sunil Traders',
              orderDate: '21/01/2020',
              dispatchDate: '25/01/2020',
              status: '1',
            },
            {
              name: 'National Traders',
              orderDate: '21/01/2020',
              dispatchDate: '25/01/2020',
              status: '0',
            }
          ],
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        }
    },
    created() {
      this.$store.dispatch('getProfile')
            .then((res) => {
            //console.log(res.data.data)
            let user = res.data.data
            if(user.user_type == 's')
                this.buyer = false
            //console.log(this.user_type)
        
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
