<template>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="10" md="8" lg="12">
            <v-dialog v-model="show" max-width="400px" persistent>
              <v-card class="justify-center" style="height: 100px">
                <v-card-actions class="justify-center pt-7">
                   <v-btn
                      outlined
                      rounded
                      @click="viewAsSeller"
                    >
                      View as Seller
                    </v-btn>
                    <v-btn
                      outlined
                      rounded
                      @click="viewAsBuyer" 
                    >
                      View as Buyer
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>


export default {
    name: 'ViewAsSellerBuyer',
    data () {
        return {
            show: true
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        },
        viewAsBuyer() {
            localStorage.setItem('user_account', 'b')
            this.$router.push('/dashboard')
        },
        viewAsSeller() {
            localStorage.setItem('user_account', 's')
            this.$router.push('/dashboard')
        },
    },
    created() {
      
    },
    mounted() {
        //console.log(this.logo)
        
    }
}
</script>

<style>
  
</style>
