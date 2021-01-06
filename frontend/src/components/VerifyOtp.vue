<template>
    <v-dialog v-model="show" max-width="400px">
        <v-card>
            <div class="d-block text-right">
                <v-btn text small @click="show=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
            </div>
            <form novalidate  @submit.prevent="validateLogin">
                <v-card-text>
                    <v-row > 
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
                        <v-col cols="12">
                            <v-btn block 
                                :loading="verifyOTPStatus"
                                :disabled="verifyOTPStatus" 
                                color="success"
                                class="white--text"
                                @click="verifyOTP"
                            >Verify</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </form>
        </v-card>
    </v-dialog>
</template>
<script>

export default {
    name: 'VerifyOtp',
    data () {
        return {
            verifyOTPStatus: false,
            sending: false,
            otp: null,
        }
    },
    props: {
        value: Boolean,
        mobile_number: Number,
        mobile_number_type: String
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
       resendOTP() {
           let data = {
                mobile_number: this.mobile_number
            }
            this.$store.dispatch('resendOTP', data)
            .then(() => {
                //this.$router.push('/')
            })
            .catch(err => console.log(err))
       },
       verifyOTP () {
           let data = {
                mobile_number: this.mobile_number,
                otp: this.otp

            }
            console.log(data)
            if(this.mobile_number_type == 'new')
            {
                this.$store.dispatch('addNewMobileNumber', data)
                .then((res) => {
                    console.log(res)
                    switch (res.data.status) {
                        case 2:
                            this.$swal({
                                icon: 'success',
                                title: 'Congrats',
                                text: 'Mobile number added successfully.',
                            });
                            this.show = false
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
            }
            else
            {
                this.$store.dispatch('verifyOTP', data)
                .then((res) => {
                    console.log(res)
                    switch (res.data.status) {
                        case 2:
                            this.$swal({
                                icon: 'success',
                                title: 'Congrats',
                                text: 'OTP verified successfully.',
                            });
                            this.show = false
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
            }
       },
        handleOnComplete(value) {
            this.otp = value
        }
    },
    mounted() {
        console.log(this.mobile_number_type)
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