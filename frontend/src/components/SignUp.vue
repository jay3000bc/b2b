<template>
    <v-dialog v-model="showSignUp" max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="success"
                class="white--text pa-2"
                user_type = "user_type"
            >
                Register now
            </v-btn>
        </template>
        <v-card>
            <div class="d-block text-right">
                <v-btn text small @click="showSignUp=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
            </div>
            <form novalidate  @submit.prevent="validateLogin">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" class="pb-0 ">
                            <div v-if="$v.form.mobile_number.$dirty">
                                <span class="red--text" v-if="!$v.form.mobile_number.required"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> The mobile number is required</span>
                                <span class="red--text" v-else-if="!$v.form.mobile_number.numeric"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Only numeric value allowed</span>
                                <span class="red--text" v-else-if="!$v.form.mobile_number.minLength"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid mobile number</span>
                                <span class="red--text" v-else-if="!$v.form.mobile_number.maxLength"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid mobile number</span>
                            </div>
                            <v-text-field
                                class="mt-2"
                                label="Mobile Number"
                                outlined
                                dense
                                autofocus
                                v-model.trim="$v.form.mobile_number.$model"
                                :disabled="sending"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
                            <div v-if="$v.form.password.$dirty">
                                <span class="red--text" v-if="!$v.form.password.required"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> The password is required</span>
                                <span class="red--text" v-else-if="!$v.form.password.minLength"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Invalid password</span>
                            </div>
                            <v-text-field
                                :disabled="sending"
                                class="mt-2"
                                label="Password"
                                outlined
                                dense
                                type="password"
                                v-model="form.password"
                            ></v-text-field>
                        </v-col> 
                    </v-row>
                    <v-row v-if="verify_otp"> 
                        <v-col cols="12" sm="6" md="12">
                            Please enter 4 digit OTP <v-btn text small color="primary" @click="resendOTP">Resend OTP</v-btn>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <template>
                                <div align="center" justify="center">
                                    <v-otp-input
                                    inputClasses="otp-input"
                                    :numInputs="4"
                                    separator=""
                                    :shouldAutoFocus="true"
                                    @on-complete="handleOnComplete"
                                    />
                                </div>
                            </template>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" v-if="verify_otp">
                            <v-btn block 
                                :loading="verifyOTPStatus"
                                :disabled="verifyOTPStatus" 
                                color="success"
                                class="white--text"
                                @click="verifyOTP"
                            >{{button_signup}}</v-btn>
                        </v-col>
                        <v-col cols="12" v-else>
                            <v-btn block 
                                :loading="sending"
                                :disabled="sending" 
                                color="success"
                                class="white--text"
                                @click="validateSignUp(user_type)"
                            >{{button_signup}}</v-btn>
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
    maxLength,
    numeric
  } from 'vuelidate/lib/validators';

export default {
    name: 'SignUp',
    props: ['user_type'],
    data () {
        return {
        verifyOTPStatus: false,
        sending: false,
        otp: '',
        showSignUp: false,
        verify_otp: false,
        button_signup : 'Sign Up',
        form: {
                mobile_number: '',
                password: '' ,
                user_type: ''
            }
        }
    },
    validations: {
        form: {
            mobile_number: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10)
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    },
    methods: {
        signUp() {
            this.sending = true;
            let data = {
                mobile_number: this.form.mobile_number,
                password: this.form.password,
                user_type: this.form.user_type
            }
            this.$store.dispatch('register', data)
            .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.verify_otp = true
                        this.button_signup = 'Confirm'
                        break;
                    case 3:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.data.mobile_number,
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

                //this.$router.push('/')
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
        },
        validateSignUp (user_type) {
            this.$v.$touch()
            this.form.user_type = user_type
            if (!this.$v.$invalid) {
                this.signUp()
            }
        },
        verifyOTP() {
            this.verifyOTPStatus = true;
            let data = {
                mobile_number: this.form.mobile_number,
                password: this.form.password,
                otp: this.otp

            }
            this.$store.dispatch('verifyOTP', data)
            .then((res) => {
                //console.log(res)
                 switch (res.data.status) {
                    case 2:
                        this.$router.push('/profile')
                        break;
                    case 3:
                        this.verifyOTPStatus = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.data.otp,
                        });
                        break
                    case 4:
                        this.verifyOTPStatus = false;
                        this.otp = '';
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                        break;
                    default:
                    break;
                }
                    
            })
            .catch(err => {
                console.log(err)
                
            })
        },

        resendOTP () {
            let data = {
                mobile_number: this.form.mobile_number
            }
            this.$store.dispatch('resendOTP', data)
            .then(() => {
                //this.$router.push('/')
            })
            .catch(err => console.log(err))
        },

        handleOnComplete(value) {
            this.otp = value
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