<template>
  <div class="about">
    <h1>Hi!</h1>
    <h2>What's this?</h2>
    
    <h2>Who runs it?</h2>
      Kerry Benton : <a href="http://kerrybenton.com">http://kerrybenton.com</a>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'YEP!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
