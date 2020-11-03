<template>
    <v-dialog v-model="showResetPassword" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="#fff"
                class="primary--text pa-2"
                text
                >
            </v-btn>
        </template>
        <v-card>
            <div class="d-block text-right">
                <v-btn text small @click="showResetPassword=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
            </div>
            <form novalidate  @submit.prevent="validateForgotPassword">
                <v-card-text>
                    <v-row>
                       <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
                         <div v-if="$v.form.password.$dirty">
                            <span class="red--text" v-if="!$v.form.password.required"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> The password is required</span>
                            <span class="red--text" v-else-if="!$v.form.password.minLength"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid password</span>
                         </div>
                        <v-text-field
                            :disabled="sending"
                            class="mt-2"
                            label="New Password"
                            outlined
                            dense
                            type="password"
                            v-model="form.password"
                            v-on:keyup.13="validateSignIn"
                        ></v-text-field>
                    </v-col> 
                    <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
                         <div v-if="$v.form.confirm_password.$dirty">
                            <span class="red--text" v-if="!$v.form.confirm_password.required"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> The confirm_password is required</span>
                            <span class="red--text" v-else-if="!$v.form.confirm_password.minLength"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid confirm_password</span>
                            <span class="red--text" v-else-if="!$v.form.confirm_password.sameAsPassword"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Passwords must be identical</span>
                         </div>
                        <v-text-field
                            :disabled="sending"
                            class="mt-2"
                            label="Confirm Password"
                            outlined
                            dense
                            type="password"
                            v-model="form.confirm_password"
                            v-on:keyup.13="validateResetPassword"
                        ></v-text-field>
                    </v-col> 
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-btn block 
                                :loading="sending"
                                :disabled="sending" 
                                color="success"
                                class="white--text"
                                @click="validateResetPassword"
                            >Reset password</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </form>
        </v-card>
    </v-dialog>
</template>

<script>
import {
    required,
    minLength,
    sameAs
  } from 'vuelidate/lib/validators';

export default {
    name: 'SignUp',
    props: ['user_type'],
    data () {
    return {
        sending: false,
        showResetPassword: false,
        form: {
                password: '',
                confirm_password: ''
            }
        }
    },
    validations: {
        form: {
            password: {
                required,
                minLength: minLength(6)
            },
            confirm_password: {
                required,
                minLength: minLength(6),
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
        validateResetPassword () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.resetPassword()
            }
        },
        resetPassword()
        {
            this.sending = true;
            let data = {
                password: this.form.password,
                password_confirmation: this.form.confirm_password,
                token: this.$route.params.token
            }
            this.$store.dispatch('resetPassword', data)
            .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.$swal({
                            icon: 'success',
                            title: 'Congrats',
                            text: 'Password reset successfully',
                        });
                        this.sending = false;
                        this.showResetPassword = false
                        this.$router.push('/')
                        break;
                    case 3:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.data.email,
                        });
                        break;
                    case 5:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                        this.form.mobile_number = ''
                        this.form.password = ''
                        break;
                     case 6:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                        this.form.mobile_number = ''
                        this.form.password = ''
                        break;
                    default:
                    break;
                }
            })
            .catch(err => {
                console.log(err)
                this.sending = false;
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            })
        }
    },
    created() {
        if(this.$route.params.token) {
            this.showResetPassword = true
        }
        
    },
    mounted() {
        //console.log(this.$route.params.token)
    }
}
</script>
<style>
    .otp-input {
        width: 40px;
        height: 40px;
        padding: 5px;
        margin: 0 10px;
        font-size: 20px;
        border-radius: 4px;
        border: 1px solid #1976d2;
        text-align: "center";
    }
    .otp-input:focus {
        border-color: #1976d2;
    }
    .error {
        border: 1px solid red !important;
    }
</style>