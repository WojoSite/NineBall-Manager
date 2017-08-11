<template>
  <div class="players">
    <h1>Players</h1>
    <h5>(Click column header to sort.)</h5>
    <div class="t-body">
      <div class="t-head">
        <div class="t-cell-1" v-on:click="setSort('id')">Player #</div>
        <div class="t-cell-2" v-on:click="setSort('firstName')">First Name</div>
        <div class="t-cell-3" v-on:click="setSort('lastName')">Last Name</div>
        <div class="t-cell-4" v-on:click="setSort('rank')">Rank</div>
        <div class="t-cell-5" v-on:click="setSort('robustness')">Robustness</div>
        <div class="t-cell-6" v-on:click="setSort('isActive')">Active?</div>
        <div class="t-cell-7" v-show="this.editing == true">Save</div>
        <div class="t-cell-7" v-show="this.editing == false">Edit</div>
        <div class="t-cell-8" v-show="this.editing == true">Delete</div>
        <div class="t-cell-8" v-show="this.editing == true">Cancel</div>
      </div>
      <div class="t-row" v-for="player in allPlayers"
                          v-bind:key="player.id">
          <div class="t-cell-1" v-show="player.edit == false">{{player.id}}</div>
          <div class="t-cell-2" v-show="player.edit == false">{{player.firstName}}</div>
          <div class="t-cell-3" v-show="player.edit == false">{{player.lastName}}</div>
          <div class="t-cell-4" v-show="player.edit == false">{{player.rank}}</div>
          <div class="t-cell-5" v-show="player.edit == false">{{player.robustness}}</div>
          <div class="t-cell-6" v-show="player.isActive==false && player.edit == false"><i class="material-icons">thumb_down</i></div>
          <div class="t-cell-6" v-show="player.isActive==true && player.edit == false"><i class="material-icons">thumb_up</i></div>
          <div class="t-cell-7" v-show="player.edit == false"><i class="material-icons" v-on:click="editPlayer(player)">edit</i></div>
          <div class="t-cell-1" v-show="player.edit == true"><input v-model="player.id" /></div>
          <div class="t-cell-2" v-show="player.edit == true"><input v-model="player.firstName" /></div>
          <div class="t-cell-3" v-show="player.edit == true"><input v-model="player.lastName" /></div>
          <div class="t-cell-4" v-show="player.edit == true"><input v-model="player.rank" /></div>
          <div class="t-cell-5" v-show="player.edit == true"><input v-model="player.robustness" /></div>
          <div class="t-cell-6" v-show="player.isActive==false && player.edit ==  true"><i class="material-icons" v-on:click="toggleActive(player)">thumb_down</i></div>
          <div class="t-cell-6" v-show="player.isActive==true && player.edit == true"><i class="material-icons" v-on:click="toggleActive(player)">thumb_up</i></div>
          <div class="t-cell-7" v-show="player.edit == true"><i class="material-icons" v-on:click="savePlayer(player)">save</i></div>
          <div class="t-cell-8" v-show="player.edit == true"><i class="material-icons" v-on:click="removePlayer(player)">delete</i></div>
          <div class="t-cell-8" v-show="player.edit == true"><i class="material-icons" v-on:click="cancelEdit(player)">cancel</i></div>
      </div>
    </div>
    <h1>Add a Player</h1>
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
          <div class="t-cell-6" v-show="newPlayer.isActive==false" ><i class="material-icons" v-on:click="toggleActive(newPlayer)">thumb_down</i></div>
          <div class="t-cell-6" v-show="newPlayer.isActive==true" ><i class="material-icons" v-on:click="toggleActive(newPlayer)">thumb_up</i></div>
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
    // TODO: Delete the activePlayers and inactivePlayers references, probably.
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
    },
    allPlayers: {
      source: firedb.ref('players').orderByKey(),

      cancelCallback (err) {
        console.error(err)
      }
    }
  },

  methods: {
    addPlayer: function () {
      var refNewPlayer = firedb.ref('players').child(this.newPlayer.id)

      refNewPlayer.set({
        id: this.newPlayer.id,
        firstName: this.newPlayer.firstName,
        lastName: this.newPlayer.lastName,
        rank: this.newPlayer.rank,
        robustness: this.newPlayer.robustness,
        isActive: this.newPlayer.isActive,
        edit: false
      }, function (error) {
        if (error) {
          toastr.error(error, 'Add Player Failed')
        } else {
          toastr.success('New player saved.')
        }
      })

      this.newPlayer.id = this.getNewPlayerID()
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

      player.edit = false
      this.editing = false
    },
    editPlayer: function (player) {
      Object.assign(this.cachedPlayer, player)

      player.edit = true
      this.editing = true
    },
    cancelEdit: function (player) {
      Object.assign(player, this.cachedPlayer)

      player.edit = false
      this.editing = false
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
      this.editing = false
      this.cachedPlayer = {}

      toastr.success('Player data updated.')
    },
    toggleActive: function (player) {
      player.isActive = !player.isActive
    },
    getNewPlayerID: function () {
      var maxPlayer = firedb.ref('players')
      var newID
      maxPlayer.orderByKey().limitToLast(1).on('child_added', function (snapshot) {
        newID = String(Number(snapshot.key) + 1)
        console.log('Key: ', snapshot.key, 'Last Name:', snapshot.val().lastName, 'New ID:', newID)
      })

      return newID
    },
    setSort: function (sortSelection) {
      switch (sortSelection) {
        case 'firstName':
          this.sortBy = 'firstName'
          this.allPlayers.sort(function (a, b) {
            if (a.firstName < b.firstName) { return -1 }
            if (a.firstName > b.firstName) { return 1 }
            return 0
          })
          break
        case 'lastName':
          this.sortBy = 'lastName'
          this.allPlayers.sort(function (a, b) {
            if (a.lastName < b.lastName) { return -1 }
            if (a.lastName > b.lastName) { return 1 }
            return 0
          })
          break
        case 'rank':
          this.sortBy = 'rank'
          this.allPlayers.sort(function (a, b) {
            if (a.rank < b.rank) { return -1 }
            if (a.rank > b.rank) { return 1 }
            return 0
          })
          break
        case 'robustness':
          this.sortBy = 'robustness'
          this.allPlayers.sort(function (a, b) {
            if (a.robustness < b.robustness) { return -1 }
            if (a.robustness > b.robustness) { return 1 }
            return 0
          })
          break
        case 'isActive':
          this.sortBy = 'isActive'
          this.allPlayers.sort(function (a, b) {
            if (a.isActive) { return -1 }
            return 1
          })
          break
        case 'id':
        default:
          this.sortBy = 'id'
          this.allPlayers.sort(function (a, b) {
            if (a.id < b.id) { return -1 }
            if (a.id > b.id) { return 1 }
            return 0
          })
      }
    }
  },

  mounted () {
    this.newPlayer.id = this.getNewPlayerID()
  },

  data () {
    return {
      newPlayer: {
        id: 990000,
        firstName: 'Robin',
        lastName: 'Slate',
        rank: 350,
        robustness: 0,
        isActive: true,
        edit: false
      },
      // TODO: This variable isn't actually used for anything at the moment. It gets updated by the setSort function, but is otherwise never read. For now, leaving it because it might be useful.
      sortBy: 'id',
      editing: false,
      cachedPlayer: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>