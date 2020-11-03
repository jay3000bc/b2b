<template>
    <v-dialog v-model="showForgetPassword" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="#fff"
                class="primary--text pa-2"
                text
                >
                Forget Password ?
            </v-btn>
        </template>
        <v-card>
            <div class="d-block text-right">
                <v-btn text small @click="showForgetPassword=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
            </div>
            <form novalidate  @submit.prevent="validateForgotPassword">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" class="pb-0 ">
                            <div v-if="$v.form.email.$dirty">
                                <span class="red--text" v-if="!$v.form.email.required"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> The email is required</span>
                                <span class="red--text" v-if="!$v.form.email.email"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid email</span>
                            </div>
                            <v-text-field
                                class="mt-2"
                                label="Email"
                                outlined
                                dense
                                autofocus
                                v-model.trim="$v.form.email.$model"
                                :disabled="sending"
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
                                @click="validateForgetPassword"
                            >Send Reset Password link</v-btn>
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
    email
  } from 'vuelidate/lib/validators';

export default {
    name: 'SignUp',
    props: ['user_type'],
    data () {
        return {
        sending: false,
        showForgetPassword: false,
        form: {
                email: ''
            }
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            }
        }
    },
    methods: {
        validateForgetPassword () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.sendResetPasswordLink()
            }
        },
        sendResetPasswordLink()
        {
            this.sending = true;
            let data = {
                email: this.form.email
            }
            this.$store.dispatch('sendResetPasswordLink', data)
            .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.$swal({
                            icon: 'success',
                            title: 'Congrats',
                            text: 'Password reset email sent successfully',
                        });
                        this.sending = false;
                        this.showForgetPassword = false
                        break;
                    case 3:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.data.email,
                        });
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
    mounted() {
        //console.log(this.user_type)
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