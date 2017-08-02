<template>
  <div class="players">
    <h1>Players</h1>
    <h2>Active</h2>
    <div class="t-body">
      <div class="t-head">
        <div class="t-cell-1">Player #</div>
        <div class="t-cell-2">First Name</div>
        <div class="t-cell-3">Last Name</div>
        <div class="t-cell-4">Rank</div>
        <div class="t-cell-5">Robustness</div>
        <div class="t-cell-6">Active?</div>
        <div class="t-cell-7">Delete</div>
        <div class="t-cell-8">Edit</div>
      </div>
      <div class="t-row" v-for="player in activePlayers"
                          v-bind:key="player.id">
          <div class="t-cell-1" v-show="player.edit == false">{{player.id}}</div>
          <div class="t-cell-2" v-show="player.edit == false">{{player.firstName}}</div>
          <div class="t-cell-3" v-show="player.edit == false">{{player.lastName}}</div>
          <div class="t-cell-4" v-show="player.edit == false">{{player.rank}}</div>
          <div class="t-cell-5" v-show="player.edit == false">{{player.robustness}}</div>
          <div class="t-cell-6" v-show="player.isActive==false && player.edit == false"><i class="material-icons">thumb_down</i></div>
          <div class="t-cell-6" v-show="player.isActive==true && player.edit == false"><i class="material-icons">thumb_up</i></div>
          <div class="t-cell-7" v-show="player.edit == false"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell-8" v-show="player.edit == false"><i class="material-icons" v-on:click="editPlayer(player)">edit</i></div>
          <div class="t-cell-1" v-show="player.edit == true"><input v-model="player.id" /></div>
          <div class="t-cell-2" v-show="player.edit == true"><input v-model="player.firstName" /></div>
          <div class="t-cell-3" v-show="player.edit == true"><input v-model="player.lastName" /></div>
          <div class="t-cell-4" v-show="player.edit == true"><input v-model="player.rank" /></div>
          <div class="t-cell-5" v-show="player.edit == true"><input v-model="player.robustness" /></div>
          <div class="t-cell-6" v-show="player.isActive==false && player.edit ==  true"><i class="material-icons" v-on:click="toggleActive(player)">thumb_down</i></div>
          <div class="t-cell-6" v-show="player.isActive==true && player.edit == true"><i class="material-icons" v-on:click="toggleActive(player)">thumb_up</i></div>
          <div class="t-cell-7" v-show="player.edit == true"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell-8" v-show="player.edit == true"><i class="material-icons" v-on:click="savePlayer(player)">save</i></div>
      </div>
    </div>
    <h2>Inactive</h2>
    <div class="t-body">
      <div class="t-head">
        <div class="t-cell-1">Player #</div>
        <div class="t-cell-2">First Name</div>
        <div class="t-cell-3">Last Name</div>
        <div class="t-cell-4">Rank</div>
        <div class="t-cell-5">Robustness</div>
        <div class="t-cell-6">Active?</div>
        <div class="t-cell-7">Delete</div>
        <div class="t-cell-8">Edit</div>
      </div>
      <div class="t-row" v-for="player in inactivePlayers"
                          v-bind:key="player.id">
        <div class="t-cell-1" v-show="player.edit == false">{{player.id}}</div>
          <div class="t-cell-2" v-show="player.edit == false">{{player.firstName}}</div>
          <div class="t-cell-3" v-show="player.edit == false">{{player.lastName}}</div>
          <div class="t-cell-4" v-show="player.edit == false">{{player.rank}}</div>
          <div class="t-cell-5" v-show="player.edit == false">{{player.robustness}}</div>
          <div class="t-cell-6" v-show="player.isActive==false && player.edit == false"><i class="material-icons">thumb_down</i></div>
          <div class="t-cell-6" v-show="player.isActive==true && player.edit == false"><i class="material-icons">thumb_up</i></div>
          <div class="t-cell-7" v-show="player.edit == false"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell-8" v-show="player.edit == false"><i class="material-icons" v-on:click="editPlayer(player)">edit</i></div>
          <div class="t-cell-1" v-show="player.edit == true"><input v-model="player.id" /></div>
          <div class="t-cell-2" v-show="player.edit == true"><input v-model="player.firstName" /></div>
          <div class="t-cell-3" v-show="player.edit == true"><input v-model="player.lastName" /></div>
          <div class="t-cell-4" v-show="player.edit == true"><input v-model="player.rank" /></div>
          <div class="t-cell-5" v-show="player.edit == true"><input v-model="player.robustness" /></div>
          <div class="t-cell-6" v-show="player.isActive==false && player.edit ==  true"><i class="material-icons" v-on:click="toggleActive(player)">thumb_down</i></div>
          <div class="t-cell-6" v-show="player.isActive==true && player.edit == true"><i class="material-icons" v-on:click="toggleActive(player)">thumb_up</i></div>
          <div class="t-cell-7" v-show="player.edit == true"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell-8" v-show="player.edit == true"><i class="material-icons" v-on:click="savePlayer(player)">save</i></div>
      </div>
    </div>
    <h2>Add a Player</h2>
    <div class="t-body">
      <div class="t-head">
        <div class="t-cell-1">Player #</div>
        <div class="t-cell-2">First Name</div>
        <div class="t-cell-3">Last Name</div>
        <div class="t-cell-4">Rank</div>
        <div class="t-cell-5">Robustness</div>
        <div class="t-cell-6">Active?</div>
        <div class="t-cell-8">Save</div>
      </div>
      <div class="t-row">
          <div class="t-cell-1"><input v-model="newPlayer.id" /></div>
          <div class="t-cell-2"><input v-model="newPlayer.firstName" /></div>
          <div class="t-cell-3"><input v-model="newPlayer.lastName" /></div>
          <div class="t-cell-4"><input v-model="newPlayer.rank" /></div>
          <div class="t-cell-5"><input v-model="newPlayer.robustness" /></div>
          <div class="t-cell-6"><i class="material-icons" v-on:click="toggleActive(newPlayer)">thumb_up</i></div>
          <div class="t-cell-8"><i class="material-icons" v-on:click="addPlayer">save</i></div>
      </div>
    </div>
  </div>
</template>

<script>
import {firedb} from '../vuefire'
import toastr from 'toastr'

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

      toastr.success('New player saved.')
      this.newPlayer.id = '990000'
      this.newPlayer.firstName = 'Robin'
      this.newPlayer.lastName = 'Slate'
      this.newPlayer.rank = 350
      this.newPlayer.robustness = 0
      this.newPlayer.isActive = true
      this.newPlayer.edit = false
    },
    removePlayer: function (player) {
      var allPlayers = firedb.ref('players')

      allPlayers.child(player['.key']).remove()

      toastr.success('Player removed.')
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

      player.edit = false

      toastr.success('Player data updated.')
    },
    toggleActive: function (player) {
      player.isActive = !player.isActive
    }
  },

  data () {
    return {
      newPlayer: {
        id: '990000',
        firstName: 'Robin',
        lastName: 'Slate',
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