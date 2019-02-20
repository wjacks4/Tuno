<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex md1>
        <panel title="Odds">
          <div v-for="game in odds" :key="game.id">
            {{game.away_team}}
            {{game.home_team}}
            {{game.away_moneyline}}
            {{game.home_moneyline}}
            {{game.away_spread}}
            {{game.away_spread_odds}}
            {{game.home_spread}}
            {{game.home_spread_odds}}
            {{game.line}}
            {{game.line_over_odds}}
            {{game.line_under_odds}}
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OddsService from '@/services/OddsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      odds: null
    }
  },
  async mounted () {
    // do a request to the backend for odds
    this.odds = (await OddsService.getOdds()).data
  }
}
</script>

<style scoped>
.error {
  color: red
}
</style>
