<template>
  <v-layout>
    <v-flex xs6>
      <v-toolbar flat dense class="light-green" dark>
        <v-toolbar-title>Current Odds</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-select
            v-model="select"
            :hint=$select
            :items="leagues"
            label="Select"
            persistent-hint
            return-object
            single-line
            solo
            flat
            background-color="light-green"
          ></v-select>
        </v-toolbar-items>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="odds"
        class="elevation-1"
      >

        <template slot="items" slot-scope="props">
          <td>{{ props.item.home_team}}</td>
          <td class="text-xs-right">{{ props.item.away_team }}</td>
          <td class="text-xs-right">{{ props.item.home_moneyline }}</td>
          <td>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" fab class="light-green acccent-2" small>
                <v-icon>add</v-icon>
              </v-btn>
              <v-card>
                <v-card-title>
                  <span class="Enter bet"> {{ bet }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <panel title="Enter Wager">
                        <div class="pl-4 pr-4 pb-2 pt-2">
                          <form>
                            <v-text-field
                              label="Wager Amount"
                              v-model="wager"
                            ></v-text-field>
                            <br>
                            <div class="error" v-html="error" />
                            <br>
                            <v-btn dark
                              class = "light-green"
                              @click='placeBet'>
                              Lock Bet
                            </v-btn>
                          </form>
                        </div>
                        </panel>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs6 ml-2>
      <v-toolbar flat dense class="light-green" dark>
        <v-toolbar-title>Welcome to Tuno, {{user}}!</v-toolbar-title>
      </v-toolbar>
      <div class="white elevation-2">
        <div class="pl-4 pr-4 pb-2 pt-2">
          <h2 align="left">My Account</h2>
          <br>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile
              v-for="bits in userinfo"
              :key="bits.info"
            >
              <v-list-tile-action>
                  <v-list-tile-title>{{ bits.info }}</v-list-tile-title>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title> {{ bits.value }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </div>
    </v-flex>
  </v-layout>

</template>

<script>
import OddsService from '@/services/OddsService'
import BetService from '@/services/BetService'
export default {
  data () {
    return {
      show: false,
      headers: [
        {
          text: 'Event',
          align: 'left',
          sortable: false,
          value: 'event'
        },
        { text: 'Outcome', value: 'outcome' },
        { text: 'Moneyline', value: 'moneyline' }
      ],
      select: 'NFL',
      leagues: [
        'NFL',
        'NBA',
        'NHL',
        'MLB',
        'Soccer',
        'Tennis',
        'Golf',
        'Boxing'
      ],
      odds: null,
      wager: null,
      userinfo: [
        { info: 'Balance', value: '$0.00' },
        { info: 'Credit', value: '$350.00' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user.email
    }
  },
  methods: {
    async placeBet () {
      try {
        const response = await BetService.placeBet({
          wager: this.wager
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/stdhomepage')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    // do a request to the backend for odds
    this.odds = (await OddsService.getOdds()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
