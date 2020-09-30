<template>
  <div class="image-gallery">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Image Gallary<v-spacer></v-spacer><v-btn @click="saveImages">Upload</v-btn></v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container fluid>
                     <v-row>
                       <v-col>
                        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                       </v-col>
                     </v-row>
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
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    name: 'ImageGallery',
    components: {
        Footer,
        TopSearchBar,
        vueDropzone
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            images: [],
            dropzoneOptions: {
              url: 'https://httpbin.org/post',
              maxFiles: 5,
              maxFilesize: 5,
              addRemoveLinks: true,
              acceptedFiles: ".jpeg,.jpg,.png,.gif,.bmp",
              uploadMultiple: false
          },
          uploadImages: [],
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        },
        afterComplete(file) {
          this.uploadImages.push(file.dataURL)
          console.log(this.uploadImages);
        },
        saveImages() {
          let data = {
            images: this.uploadImages
          }
          this.$store.dispatch('saveImages', data)
          .then((res) => {
            this.valid = false;
            console.log(res)
            let status = res.data.status
            switch (status) {
              case 1:
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: res.data.message,
              });
              break;
              case 2:
                this.$swal({
                  icon: 'success',
                  title: 'Congrats',
                  text: 'Images(s) saved successfully',
              });
              break;
              case 3:
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
            // console.log(err)
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
          })
        },
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
    mounted() {
        //console.log(this.logo)
        
    }
}
</script>

<style>
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
