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
        <div class="t-cell">Active?</div>
      </div>
      <div class="t-row" v-for="player in activePlayers"
                          v-bind:key="player.id">
        <div v-show="player.edit == false">
          <div class="t-cell">{{player.id}}</div>
          <div class="t-cell">{{player.firstName}}</div>
          <div class="t-cell">{{player.lastName}}</div>
          <div class="t-cell">{{player.rank}}</div>
          <div class="t-cell">{{player.robustness}}</div>
          <div v-show="player.isActive==false" class="t-cell"><i class="material-icons">thumb_down</i></div>
          <div v-show="player.isActive==true" class="t-cell"><i class="material-icons">thumb_up</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="editPlayer(player)">edit</i></div>
        </div>
        <div v-show="player.edit == true">
          <input class="t-cell" v-model="player.id" />
          <input class="t-cell" v-model="player.firstName" />
          <input class="t-cell" v-model="player.lastName" />
          <input class="t-cell" v-model="player.rank" />
          <input class="t-cell" v-model="player.robustness" />
          <div v-show="player.isActive==false" class="t-cell"><i class="material-icons" v-on:click="toggleActive(player)">thumb_down</i></div>
          <div v-show="player.isActive==true" class="t-cell"><i class="material-icons" v-on:click="toggleActive(player)">thumb_up</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="savePlayer(player)">save</i></div>
        </div>
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
        <div class="t-cell">Active?</div>
      </div>
      <div class="t-row" v-for="player in inactivePlayers"
                          v-bind:key="player.id">
        <div v-show="player.edit == false">
          <div class="t-cell">{{player.id}}</div>
          <div class="t-cell">{{player.firstName}}</div>
          <div class="t-cell">{{player.lastName}}</div>
          <div class="t-cell">{{player.rank}}</div>
          <div class="t-cell">{{player.robustness}}</div>
          <div v-show="player.isActive==false" class="t-cell"><i class="material-icons">thumb_down</i></div>
          <div v-show="player.isActive==true" class="t-cell"><i class="material-icons">thumb_up</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="editPlayer(player)">edit</i></div>
        </div>
        <div v-show="player.edit == true">
          <input class="t-cell" v-model="player.id" />
          <input class="t-cell" v-model="player.firstName" />
          <input class="t-cell" v-model="player.lastName" />
          <input class="t-cell" v-model="player.rank" />
          <input class="t-cell" v-model="player.robustness" />
          <div v-show="player.isActive==false" class="t-cell"><i class="material-icons" v-on:click="toggleActive(player)">thumb_down</i></div>
          <div v-show="player.isActive==true" class="t-cell"><i class="material-icons" v-on:click="toggleActive(player)">thumb_up</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell"><i class="material-icons" v-on:click="savePlayer(player)">save</i></div>
        </div>
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
      this.newPlayer.edit = false
    },
    removePlayer: function (player) {
      var allPlayers = firedb.ref('players')

      allPlayers.child(player['.key']).remove()
    },
    editPlayer: function (player) {
      player.edit = true
    },
    savePlayer: function (player) {
      var editPlayer = firedb.ref('players').child(player['.key'])

      editPlayer.set({
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        rank: player.rank,
        robustness: player.robustness,
        isActive: player.isActive,
        edit: false
      })
    },
    toggleActive: function (player) {
      player.isActive = !player.isActive
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
        isActive: true,
        edit: false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>