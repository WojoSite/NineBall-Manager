<template>
  <div id="app">
    <img src="./assets/logo.jpg">
    <div id="navbar">
      <router-link to="/players" class="btn">Players</router-link>
      <router-link to="/help" class="btn">Help</router-link>
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
  font-size: 18pt;
  line-height: 22pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 20px;
}

#app h1 {
  font-family: 'Lobster', Georgia, Times, serif;
  font-size: 32pt;
  line-height: 40pt;
}

#navbar {
  font-family: 'Cabin', Helvetica, Arial, sans-serif;
  font-size: 16pt;
  line-height: 22pt;
  width: 100%;
  padding: 2px;
  border-top: 2px green solid;
  border-bottom: 2px green solid;
}

.btn {
  font-family: 'Cabin', Helvetica, Arial, sans-serif;
  font-size: 16pt;
  background: none;
	background-image: none;
	border: 2px green solid;
	color: green;
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
	color: green;
}
</style>
