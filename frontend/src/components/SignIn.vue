<template>
    <v-dialog v-model="show" max-width="400px">
        <v-card>
            <div class="d-bloack text-right">
                <v-btn text small @click.stop="show=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
            </div>
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
                            :disabled="sending"
                            class="mt-2"
                            label="Mobile Number"
                            outlined
                            dense
                            autofocus
                            v-model.trim="$v.form.mobile_number.$model"
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
                    <v-col cols="12">
                        <v-btn block 
                            :loading="sending"
                            :disabled="sending"  
                            color="success"
                            class="white--text"
                            @click="validateSignIn"
                            v-on:keyup.13="validateSignIn"
                        >Sign In</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
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
    name: 'SignIn',
    data () {
        return {
            sending: false,
            verify_otp: false,
            form: {
                mobile_number: '',
                password: '' 
            }
        }
    },
    validations: {
        form: {
            mobile_number: {
                required,
                numeric,
                maxLength: maxLength(10),
                minLength: minLength(10)
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    },
    methods: {
        signIn() {
            this.sending = true;
            let mobile_number = this.form.mobile_number 
            let password = this.form.password
            this.$store.dispatch('login', { mobile_number, password })
            .then((res) => {
                //console.log(res)
                switch (res.data.status) {
                    case 2:
                        if(res.data.data.status == 0)
                            this.$router.push('/profile')
                        else
                            this.$router.push('/dashboard')
                        break;
                    case 3:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${res.data.data.mobile_number}<br>${res.data.data.password}`,
                        });
                        break;
                    case 4:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${res.data.message}`,
                        });
                        this.form.mobile_number = '';
                        this.form.password = '';
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
        validateSignIn () {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.signIn()
            }
        }
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
    }
}
</script>
<style>

</style>