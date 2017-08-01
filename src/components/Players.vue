<template>
  <div class="players">
    <h1>Players</h1>
    <h2>Active</h2>
    <div class="t-body">
      <div class="t-head">
        <div class="t-cell">Player #</div>
        <div class="t-cell">First Name</div>
        <div class="t-cell">Last Name</div>
        <div class="t-cell">Rank</div>
        <div class="t-cell">Robustness</div>
      </div>
      <div class="t-row" v-for="player in activePlayers"
                          v-bind:key="player.id">
        <div class="t-cell">{{player.id}}</div>
        <div class="t-cell">{{player.firstName}}</div>
        <div class="t-cell">{{player.lastName}}</div>
        <div class="t-cell">{{player.rank}}</div>
        <div class="t-cell">{{player.robustness}}</div>
        <div class="t-cell"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
        <div class="t-cell"><i class="material-icons" v-on:click="editPlayer(player)">edit</i></div>
      </div>
    </div>
    <h2>Inactive</h2>
    <div class="t-body">
      <div class="t-head">
        <div class="t-cell">Player #</div>
        <div class="t-cell">First Name</div>
        <div class="t-cell">Last Name</div>
        <div class="t-cell">Rank</div>
        <div class="t-cell">Robustness</div>
      </div>
      <div class="t-row" v-for="player in inactivePlayers"
                          v-bind:key="player.id">
        <div class="t-cell">{{player.id}}</div>
        <div class="t-cell">{{player.firstName}}</div>
        <div class="t-cell">{{player.lastName}}</div>
        <div class="t-cell">{{player.rank}}</div>
        <div class="t-cell">{{player.robustness}}</div>
        <div class="t-cell"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
        <div class="t-cell"><i class="material-icons" v-on:click="editPlayer(player)">edit</i></div>
      </div>
    </div>
    <h2>Add a Player</h2>
    <form id="newPlayer" class="form-inline" v-on:submit.prevent="addPlayer">
      <span class="label">Player # </span><input type="text" id="newPlayerNumber" v-model="newPlayer.id" /><br />
      <span class="label">First Name </span> <input type="text" id="newPlayerFirst" v-model="newPlayer.firstName" /><br />
      <span class="label">Last Name </span> <input type="text" id="newPlayerLast" v-model="newPlayer.lastName" /><br />
      <span class="label">Rank </span> <input type="text" id="newPlayerRank" v-model="newPlayer.rank" /><br />
      <span class="label">Robustness </span> <input type="text" id="newPlayerRobustness" v-model="newPlayer.robustness" /><br />
      <input type="submit" value="Add Player">
    </form>
  </div>
</template>

<script>
import {firedb} from '../vuefire'

export default {
  name: 'players',

  firebase: {
    activePlayers: {
      source: firedb.ref('players').orderByChild('isActive').equalTo(true),

      cancelCallback (err) {
        console.error(err)
      }
    },
    inactivePlayers: {
      source: firedb.ref('players').orderByChild('isActive').equalTo(false),

      cancelCallback (err) {
        console.error(err)
      }
    }
  },

  methods: {
    addPlayer: function () {
      var allPlayers = firedb.ref('players')

      allPlayers.push(this.newPlayer)
      this.newPlayer.id = ''
      this.newPlayer.firstName = ''
      this.newPlayer.lastName = ''
      this.newPlayer.rank = 350
      this.newPlayer.robustness = 0
      this.newPlayer.isActive = true
    },
    removePlayer: function (player) {
      var allPlayers = firedb.ref('players')

      allPlayers.child(player['.key']).remove()
    },
    editPlayer: function (player) {
      console.log('Should probably implement editing. :|')
    }
  },

  data () {
    return {
      newPlayer: {
        id: '',
        firstName: '',
        lastName: '',
        rank: 350,
        robustness: 0,
        isActive: true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.t-body {
  width: 80%;
  display: table;
  vertical-align: middle;
}

.t-head {
  display: table-row;
  font-weight: bold; 
}

.t-row {
  display: table-row;
}

.t-cell {
  display: table-cell;
  border: 1px solid gray;
}

.fw {
  width: 200px;
}

.label {
  width: 30%;
  float: left;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  vertical-align: middle;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

.material-icons:hover {
  color: darkolivegreen;
}
</style>
