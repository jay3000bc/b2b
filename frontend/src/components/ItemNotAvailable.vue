<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
            <div class="float-right">
                <v-btn text small @click.stop="show=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn>
            </div>
            <v-row no-gutters>
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    class=""
                >
                    <v-card-text class="text-center">
                        We have informed the Buyer that this Product is not available
                    </v-card-text>
                    <v-card-actions class="mb-3 text-center d-block">
                        <v-btn small @click.stop="show=false">Close</v-btn>
                    </v-card-actions>
                
                </v-col>
            </v-row>
        </v-card>
        
        
    </v-dialog>
</template>

<script>


export default {
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
        showItemNotAvailable() {
            this.$emit('showItemNotAvailable')
        }
  }
}
</script>
<style>
</style>