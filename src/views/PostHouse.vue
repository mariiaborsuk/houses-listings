<template>


  <div class="formContent">
    <router-link class="linkPost" :to="{name: 'houses'}"><img class="houseImg2"
                                                              src="/assets/images/ic_back_grey@3x.png"/>
      <span class="hiddenPost">Back to overview</span>
    </router-link>
    <h3>
      Create new listing
    </h3>
    <Form class="postForm" @submit="submit">
      <div>
        <div><label for="street">Street name*</label></div>
        <Field :rules="validateField" id="street" class="doubleForm" name="street" placeholder="Enter the street name"
               type="text"/>
        <ErrorMessage name="street" class="errorM"/>
      </div>
      <div class="address ">

        <div><label for="houseNumber">House number</label></div>
        <div class="double">
          <div>
            <Field :rules="validateField" id="houseNumber" name="houseNumber" placeholder="Enter the house number"
                   type="text"
                   class="input"/>
            <ErrorMessage name="houseNumber" class="errorM"/>
          </div>

          <div>
            <Field class="input right" id="option" name="option" type="text" placeholder="eg. A"/>
          </div>
        </div>
      </div>
      <div>
        <div><label for="code">Postal code*</label></div>
        <Field :rules="validateField" id="code" type="text" name="code" placeholder="eg. 1000AA"/>
        <ErrorMessage name="code" class="errorM"/>
      </div>
      <div>
        <div><label for="city">City*</label></div>
        <Field :rules="validateField" id="city" type="text" name="city" placeholder="eg. Utrecht"/>
        <ErrorMessage name="city" class="errorM"/>
      </div>
      <div>
        <div>Upload picture (PNG or JPG)*</div>


        <div class="imageFile" id="imgLabel">
          <div class="label"><label for="image">
            <div class="imageLabel"></div>

          </label></div>
          <div class="btn"><img
            id="deleteImgBtn"
            src="/assets/images/ic_clear_white@3x.png"
            onclick="document.getElementById('imgLabel').style.backgroundImage = 'url(assets/images/ic_plus_grey@3x.png)';
          document.getElementById('imgLabel').style.backgroundSize='20%'
          event.target.style.display='none'
"
          /></div>
        </div>
        <Field class="inputfile" :rules="validateImage" type="file" id="image" name="image"
               onchange="document.getElementById('imgLabel').style.backgroundImage = `url(${window.URL.createObjectURL(this.files[0])})`;
               document.getElementById('imgLabel').style.backgroundSize='100%';
               document.getElementById('deleteImgBtn').style.display='inline-block'
        "/>
        <ErrorMessage name="image" class="errorM"/>
      </div>
      <div>
        <div><label for="price">Price*</label></div>
        <Field :rules="validateField" id="price" type="price" name="price" placeholder="eg. €500.000"/>
        <ErrorMessage name="price" class="errorM"/>
      </div>

      <div class="double">
        <div>
          <div><label for="size">Size*</label></div>
          <Field :rules="validateField" id="size" class="input" type="text" name="size" placeholder="eg. 60m2"/>
          <ErrorMessage name="size" class="errorM"/>
        </div>
        <div>
          <div><label for="garage" class="right">Garage*</label></div>
          <Field :rules="validateField" as="select" class="input right" name="garage" id="garage">
            <option disabled selected hidden style="{color:gray}" value="">Select</option>
            <option value="yes">yes</option>
            <option value="no">No</option>
          </Field>
          <ErrorMessage name="garage" class="errorM"/>
        </div>
      </div>
      <div class="double">
        <div>
          <div><label for="bedrooms">Bedrooms*</label></div>
          <Field :rules="validateField" class="input" id="bedrooms" name="bedrooms" type="text"
                 placeholder="Enter amount"/>
          <ErrorMessage name="bedrooms" class="errorM"/>
        </div>
        <div>
          <div><label for="bathrooms" class="right">Bathrooms*</label></div>
          <Field :rules="validateField" id="bathrooms" class="input right" name="bathrooms" type="text"
                 placeholder="Enter amount"/>
          <ErrorMessage name="bathrooms" class="errorM"/>
        </div>
      </div>
      <div>
        <div><label for="date">Construction date*</label></div>
        <Field :rules="validateField" id="date" type="text" name="date" placeholder="eg. 1990"/>
        <ErrorMessage name="date" class="errorM"/>
      </div>
      <div>
        <div><label for="description">Description*</label></div>
        <Field :rules="validateField" type="text" class="description" name="description"
               placeholder="Enter description"/>
        <ErrorMessage name="description" class="errorM"/>
      </div>
      <div>
        <button @submit="submit" type="submit" class="post">POST</button>
      </div>
    </Form>
  </div>
</template>
<script>
import {Field, Form} from 'vee-validate'
import {mapActions, mapState,} from 'pinia'
import {useHousesStore} from '../stores/counter'

export default {
  name: 'PostHouse',
  data() {
    return {
      isLoaded: false
    }
  },

  components: {
    Form,
    Field
  },

  computed: {
    ...mapState(useHousesStore, ['linkId']),
  },
  methods: {
    ...mapActions(useHousesStore, ['postHouse']),
    submit(values) {
      var self = this
      this.postHouse(
        values.price,
        values.bedrooms,
        values.bathrooms,
        values.size,
        values.street,
        values.houseNumber,
        values.code,
        values.city,
        values.option,
        values.date,
        values.garage,
        values.description
      ).then(function (imageData) {
        self.$router.push({name: "house", params: {id: self.linkId}})
      });
    },
    validateField(value) {
      if (!value) {
        return 'This field is required';
      }
      return true

    },
    validateImage(value) {
      let allowedTypes = ['image/jpeg', 'image/png'];
      if (!value) {
        return 'image is required';
      } else if (!allowedTypes.includes(value.type)) {
        return 'Only JPG and PNG are allowed'
      }

      return true
    }
  }

}


</script>
<style>

h3 {
  text-align: center;

}

.imageLabel {
  width: 100%;
  height: 100%;
  cursor: pointer;

}

#deleteImgBtn {
  width: 3vw;
  cursor: pointer;
  display: none;
  top: -50vh

}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.errorM {
  color: red;
  margin-top: 1%
}

.imageFile {
  border: 2px dashed gray;
  background-image: url("/assets/images/ic_plus_grey@3x.png");
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: center;
  display: flex;
  flex-direction: row

}

.imageFile > .label {
  flex: 3
}

.imageFile > .btn {
  flex: 1
}

#upload {
  width: 100%;
  height: 100%;
  position: absolute

}

@media only screen and (min-width: 900px) {
  #deleteImgBtn {
    width: 2vw;
    margin-left: 30%
  }

  .formContent {
    background-image: url("/assets/images/img_background@3x.png");
    max-width: 100%;
    height: 150vh;
    background-size: 100%;
    background-origin: border-box;
    background-repeat: no-repeat;
    background-position: 20% 20%;

  }

  .double {
    display: flex;
    flex-direction: row;
  }

  .postForm {
    width: 30vw;
    margin-left: 20%;
  }

  .linkPost {
    margin-left: 20%;
    color: black;
    margin-top: 5%;
  }

  .postForm > div > input {
    height: 7vh;
    border: none;
    width: 30vw;
    border-radius: 5px;
    margin-top: 2%;
    margin-bottom: 2%;
    padding-left: 2%;
  }

  .input {
    height: 7vh;
    border: none;
    width: 13vw;
    border-radius: 5px;
    margin-top: 2%;
    margin-bottom: 2%;
    padding-left: 2%;
  }

  .right {
    margin-left: 4vw;
  }

  .imageFile {
    width: 10vw;
    height: 20vh;

  }

  .description {
    height: 20vh;
    position: relative;
  }

  .post {
    width: 10vw;
    background-color: rgba(255, 127, 80, 0.99);
    color: rgba(128, 128, 128, 0.97);
    padding: 1%;
    margin-top: 1%;
    position: absolute;
    text-align: center;
    right: 48vw;
    border-radius: 10px

  }
}

@media only screen and (max-width: 900px) {
  .imageFile {
    width: 10vw;
    height: 5vh;

  }

  .hiddenPost {
    display: none
  }

  .formContent {
    background-image: url("/assets/images/img_background@3x.png");
    max-width: 100%;

  }

  .double {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: auto
  }

  select {
    width: 94%;
  }

  .double > div {
    width: 94%
  }

  .postForm {
    width: 100%;

  }

  .postForm > div > input {
    height: 4vh;
    border: none;
    width: 100%;
    border-radius: 5px;
    margin-top: 2%;
    margin-bottom: 2%;
    padding-left: 2%;
    width: 96%;
    margin: auto;
  }

  .input {
    height: 4vh;
    border: none;
    border-radius: 5px;
    margin-top: 2%;
    margin-bottom: 2%;
    padding-left: 2%;

  }

  .right {
    margin-left: 2%;
  }

  .upload {
    width: 10vw;
    height: 5vh;
    border: 2px dashed gray;
    margin-top: 2%;
    margin-bottom: 2%;
    background-image: url("/assets/images/ic_upload@3x.png");
    background-size: 20%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .description {
    margin-bottom: 10%;
    height: 20vh;
    max-width: 90%;

  }

  .post {
    width: 90%;
    background-color: rgba(255, 127, 80, 0.99);
    color: rgba(128, 128, 128, 0.97);
    padding: 1%;
    height: 5vh;
    margin-top: 5%;
    margin-left: 3%;
    margin-bottom: 20%;
    text-align: center;
    border-radius: 10px

  }

}
</style>