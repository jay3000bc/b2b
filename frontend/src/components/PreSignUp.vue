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
                md="6"
                class="pl-4"
            >
                <v-card-title class="font-weight-black text-center d-block">
                Register As Buyer
                </v-card-title>
                <v-card-text class="text-center divider-right">
                    If you are in the retail bussiness and you buy products from Bussiness Brands, Distributors.
                    wholesalers & Distributor - Register Here
                </v-card-text>
                <v-card-actions class="mb-3 text-center d-block">
                     <SignUp user_type="b"/>
                </v-card-actions>
            </v-col>

            <v-col
                cols="12"
                sm="12"
                md="6"
                class=""
            >
               <v-card-title class="font-weight-black text-center d-block">
                    Register As Seller
                </v-card-title>
                <v-card-text class="text-center">
                    If you are a bussiness brand, Distributor, Wholesaler - Register Here
                </v-card-text>
                <v-card-actions class="mt-5 mb-3 text-center d-block">
                     <SignUp user_type="s"/>
                </v-card-actions>
             </v-col>
        </v-row>
    </v-card>
    
     
</v-dialog>
</template>

<script>

import SignUp from '@/components/SignUp.vue'

export default {
 components: {
     SignUp
 },
  props: {
     value: Boolean
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
      showSignUp() {
        this.$emit('showSignUp')
    }
  }
}
</script>
<style>
.divider-right {
    border-right:1px solid #000;
}
/* If the screen size is 600px wide or less */
  @media screen and (max-width: 600px) {
    .divider-right {
    border-right:none;
}
  }
</style>