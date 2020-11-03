<template>
    <v-dialog v-model="showImageGallery" max-width="800px">
        <template v-slot:activator="{ on, attrs }" class="text-right">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="white" 

                class="float-right blue-text"
                style="float: right; top: -25px"
            >
               Add From Gallery
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Image Gallery <v-spacer></v-spacer><v-btn text small @click="showImageGallery=false"><i class="fa fa-times" aria-hidden="true"></i></v-btn></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                 <v-container fluid>
                    <v-row>
                      <v-col
                        v-for="image in images"
                        :key="image.id"
                        class="d-flex child-flex"
                        cols="3"
                      >
                        <v-card flat tile class="d-flex">
                          <v-img
                            :src="image"
                            :lazy-src="image"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            :id="image.id"
                            @click="selectImage(image)"
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'ImageGallery',
    props: {
        value: Boolean
    },
    data() {
        return {
            images: [],
            showImageGallery: false
        }
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
        selectImage(image) {
            this.$emit('onImageSelected', image)
            //console.log(this.image_selected)
        }
    },
    created() {
      this.$store.dispatch('getImages')
        .then((res) => {
            this.images = res.data.data.originals
            //console.log(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
}
</script>
<style>
.divider-right {
    border-left:1px solid #000;
}
/* If the screen size is 600px wide or less */
  @media screen and (max-width: 600px) {
    .divider-right {
    border-left:none;
}
  }
</style>