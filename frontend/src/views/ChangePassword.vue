<template>
  <div class="change-password">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="6" lg="6">
              <v-card>
                <v-card-title>Change Password</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="change-password-content">
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pb-0 ">
                        <div v-if="$v.form.currentPassword.$dirty">
                            <span class="red--text" v-if="!$v.form.currentPassword.required"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> The current password is required</span>
                            <span class="red--text" v-else-if="!$v.form.currentPassword.minLength"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid password</span>
                        </div>
                        <v-text-field
                            :disabled="sending"
                            class="mt-2"
                            label="Enter current password"
                            outlined
                            type="password"
                            v-model.trim="$v.form.currentPassword.$model"
                            autofocus
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
                        <div v-if="$v.form.newPassword.$dirty">
                            <span class="red--text" v-if="!$v.form.newPassword.required"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> The new password is required</span>
                            <span class="red--text" v-else-if="!$v.form.newPassword.minLength"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid password</span>
                        </div>
                        <v-text-field
                            :disabled="sending"
                            class="mt-2"
                            label="Enter new password"
                            outlined
                            type="password"
                            v-model.trim="$v.form.newPassword.$model"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
                        <div>
                            <span class="red--text" v-if="!$v.form.confirmPassword.sameAsPassword"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Passwords must be identical.</span>
                        </div>
                        <v-text-field
                            :disabled="sending"
                            class="mt-2"
                            label="Confirm new password"
                            outlined
                            type="password"
                            v-model="form.confirmPassword"
                        ></v-text-field>
                    </v-col> 
                    <v-col cols="12">
                        <v-btn block 
                            :loading="sending"
                            :disabled="sending"  
                            color="success"
                            class="white--text"
                            @click="validateChangePassword"
                        >Save</v-btn>
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
import {
    required,
    minLength,
    sameAs
  } from 'vuelidate/lib/validators';

export default {
    name: 'ChangePassword',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            form: {
              currentPassword: null,
              newPassword: null,
              confirmPassword: null,
            },
            sending: false,
        }
    }, 
     validations: {
        form: {
            currentPassword: {
              required,
              minLength: minLength(6)
          },
          newPassword: {
              required,
              minLength: minLength(6)
          },
          confirmPassword: {
            sameAsPassword: sameAs('newPassword')
          }
        }
    },
    computed: {
        
    },
    methods: {
      saveChangePassword() {
        this.sending = true;
        let data = {
            currentPassword: this.form.currentPassword,
            newPassword: this.form.newPassword,
            newPassword_confirmation: this.form.confirmPassword
        }
        this.$store.dispatch('saveChangePassword', data)
          .then((res) => {
            //console.log(res)
            switch (res.data.status) {
                case 2:
                  this.sending = false;
                  this.form.currentPassword = ''
                  this.form.newPassword = ''
                  this.$swal({
                      icon: 'success',
                      title: 'Congrats',
                      text: 'Password changed successfully',
                  });
                  break;
                case 3:
                  var error = ''
                  for (const prop in res.data.data) {
                    error += `${res.data.data[prop]}<br />`;
                  }
                  this.$swal({
                      html:error,
                      icon: 'error',
                      title: 'Oops...'
                  });
                   this.sending = false;
                  break;
                default:
                break;
            }
        })
        .catch(err => {
            this.sending = false;
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
            console.log(err)
        })
      },
      validateChangePassword () {
        this.saveChangePassword()
      }
    },
    created() {
      
    },
    mounted() {
        //console.log(this.logo)
        
    }
}
</script>

<style>
  .change-password-content {
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
