<template>
     <footer class="footer">
      <v-container>
        <v-row
        >
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="bottom-navigation"
            align="center"
            justify="center"
          >
           <v-btn text small color="#fff">About</v-btn>|
           <v-btn text small color="#fff">How it works</v-btn>|
            <v-btn text small color="#fff">FAQ</v-btn>|
           <v-btn text small color="#fff">Bussiness</v-btn>|
            <v-btn text small color="#fff">Terms & Conditions</v-btn>|
           <v-btn text small color="#fff">Privacy Ploicy</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
          <hr>
          </v-col>
        </v-row>
        <v-row
         class="footer"
        >
          <v-col
            cols="12"
            sm="6"
            md="8"
            class="footer-text"
          >
           <span><small>Copyright 2021 <b>Disributors</b>. All right reserved.</small></span>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="footer-social-icon"
          >
            <div class="footer-social-icon-list">
              <span class="fa-stack fa-lg"><i class="fab fa-facebook fa-stack-1x"></i></span>
              <span class="fa-stack fa-lg"><i class="fab fa-twitter fa-stack-1x"></i></span>
              <span class="fa-stack fa-lg"><i class="fab fa-linkedin fa-stack-1x"></i></span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>
<style>
.footer, .footer-text span, .footer-social-icon span {
    color: #fff ! important;
}
.footer {
    background-color:#1A1A1A;
}
/* If the screen size is 601px wide or more */
  @media screen and (min-width: 601px) {
    .footer-social-icon-list {
      float: right;
    }
  }

  /* If the screen size is 600px wide or less */
  @media screen and (max-width: 600px) {
    .footer-social-icon-list {
      float: none;
      text-align: center;
    }
    .footer-text {
      text-align: center;
    }
  }
</style>