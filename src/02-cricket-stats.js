/**
 * 🏏 Cricket Player Stats Dashboard
 *
 * IPL ka stats dashboard bana raha hai tu! Har function ARROW FUNCTION
 * hona chahiye (const fn = () => ...). Regular function declarations
 * mat use karna — arrow functions ki practice karna hai!
 *
 * Functions (sab arrow functions honge):
 *
 *   1. calcStrikeRate(runs, balls)
 *      - Strike rate = (runs / balls) * 100, rounded to 2 decimal places
 *      - Agar balls <= 0 ya runs < 0, return 0
 *
 *   2. calcEconomy(runsConceded, overs)
 *      - Economy = runsConceded / overs, rounded to 2 decimal places
 *      - Agar overs <= 0 ya runsConceded < 0, return 0
 *
 *   3. calcBattingAvg(totalRuns, innings, notOuts = 0)
 *      - Batting avg = totalRuns / (innings - notOuts), rounded to 2 decimal places
 *      - Default notOuts = 0
 *      - Agar innings - notOuts <= 0, return 0
 *
 *   4. isAllRounder(battingAvg, economy)
 *      - Return true agar battingAvg > 30 AND economy < 8
 *
 *   5. getPlayerCard(player)
 *      - player object: { name, runs, balls, totalRuns, innings, notOuts, runsConceded, overs }
 *      - Return: { name, strikeRate, economy, battingAvg, isAllRounder }
 *      - Use the above functions internally
 *      - Agar player null/undefined hai ya name missing, return null
 *
 * Hint: Use const fn = (params) => expression or const fn = (params) => { ... }
 *
 * @example
 *   calcStrikeRate(45, 30)  // => 150
 *   calcEconomy(24, 4)      // => 6
 *   getPlayerCard({ name: "Jadeja", runs: 35, balls: 20, totalRuns: 2000, innings: 80, notOuts: 10, runsConceded: 1500, overs: 200 })
 *   // => { name: "Jadeja", strikeRate: 175, economy: 7.5, battingAvg: 28.57, isAllRounder: false }
 */
export const calcStrikeRate = (runs, balls) => {
  // Your code here
    if (typeof runs !== "number" || typeof balls !== "number") return 0;
  if (!Number.isFinite(runs) || !Number.isFinite(balls)) return 0;
  if( balls <= 0 || runs < 0) return 0;

  const Strike_rate =  Number(((runs / balls) * 100 ).toFixed(2));
 return Strike_rate;

};

export const calcEconomy = (runsConceded, overs) => {
  // Your code here
    if (typeof runsConceded !== "number" || typeof overs !== "number") return 0;
  if (!Number.isFinite(runsConceded) || !Number.isFinite(overs)) return 0;
 if( overs <= 0 || runsConceded < 0  ) return 0;
 return (Number(( runsConceded / overs ).toFixed(2)));
};

export const calcBattingAvg = (totalRuns, innings, notOuts = 0) => {
  // Your code here

  if (typeof totalRuns !== "number" || typeof innings !== "number" || typeof notOuts !== "number") return 0;
  if (!Number.isFinite(totalRuns) || !Number.isFinite(innings)  || !Number.isFinite(notOuts) || notOuts <0) return 0;
       
  if( innings - notOuts <= 0) return 0;
 
   const  Batting_avg = totalRuns / (innings - notOuts) ;
   return Number(Batting_avg.toFixed(2));
};

export const isAllRounder = (battingAvg, economy) => {
  // Your code here
 if (typeof battingAvg !== "number" || typeof economy !== "number") return false;
  if (!Number.isFinite(battingAvg) || !Number.isFinite(economy)) return false;

  const val =  (battingAvg > 30 && economy < 8) ? true: false;

   return val;
};

export const getPlayerCard = (player) => {
  // Your code here
 

if(!player || typeof player != "object" || player == null) return null;
if(!player.name || typeof player.name != "string" ) return null;   
return  { name: player.name, 
          strikeRate: calcStrikeRate( player.runs, player.balls),
          economy: calcEconomy(player.runsConceded, player.overs), 
          battingAvg: calcBattingAvg(player.totalRuns, player.innings, player.notOuts  ), 
          isAllRounder: isAllRounder(player.battingAvg, player.economy) };

 } 
