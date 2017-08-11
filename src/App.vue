<template>
  <div id="app">
    <img src="./assets/img/logo.jpg">
    <div id="navbar">
      <router-link to="/players" class="btn">Players</router-link>
      <router-link to="/about" class="btn">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Cabin', Helvetica, Arial, sans-serif;
  font-size: 14pt;
  line-height: 18pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 20px;
}

#app h1 {
  font-family: 'Lobster', Georgia, Times, serif;
  font-size: 24pt;
  line-height: 28pt;
}

#navbar {
  font-family: 'Cabin', Helvetica, Arial, sans-serif;
  font-size: 12pt;
  line-height: 16pt;
  width: 100%;
  padding: 2px;
  border-top: 2px #698F3F solid;
  border-bottom: 2px #698F3F solid;
}

.btn {
  font-family: 'Cabin', Helvetica, Arial, sans-serif;
  font-size: 12pt;
  background: none;
	background-image: none;
	border: 2px #698F3F solid;
	color: #698F3F;
  padding: 2px;
	letter-spacing: 1px;
	text-decoration: none ! important;
	text-shadow: none;
	text-transform: uppercase;
	transition: all 0.3s ease-in-out 0s;		
	-webkit-transition: all 0.3s ease-in-out 0s;	
}

.btn:hover {
	background: lightgray;
	color: #698F3F;
}
</style>
