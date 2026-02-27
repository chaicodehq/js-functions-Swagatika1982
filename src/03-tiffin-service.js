/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if(!name || name === "") return null;
  if(!mealType || typeof mealType !="string" ) return null;
  const dailyRate = {veg: 80, nonveg: 120, jain: 90};
  if(!Object.hasOwn(dailyRate,mealType)) return null;    
  const totalCost = dailyRate[mealType] * days ;
  return { name, mealType, days, dailyRate: dailyRate[mealType], totalCost };
}

export function combinePlans(...plans) {
  // Your code here

if (plans.length === 0) return null;

  let totalCustomers = 0;
  let totalRevenue = 0;
  const mealBreakdown = {};

  for (let i=0; i <plans.length; i++) {
    const plan = plans[i];
    if (!plan || typeof plan !== "object") continue;

    const  mealType =plan.mealType;
    const totalCost   = plan.totalCost;    
    totalCustomers += 1;
     
    if (typeof totalCost === "number" && Number.isFinite(totalCost)) {
      totalRevenue += totalCost;
    }
    
    if (typeof mealType === "string" && mealType.trim() !== "") {
      const mt = mealType.trim().toLowerCase(); 
      mealBreakdown[mt] = (mealBreakdown[mt] ?? 0) + 1;
    }
  } 
  if (totalCustomers === 0) return null;

  return { totalCustomers, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  // Your code here
//  plan: { name, mealType, days, dailyRate, totalCost }
//  *      - Each addon: { name: "raita", price: 15 }
//  *      - Add each addon price to dailyRate
//  *      - Recalculate totalCost = new dailyRate * days
//  *      - Return NEW plan object (don't modify original)
//  *      - addonNames: array of addon names added
//  *      - Agar plan null hai, return null
if (  !plan || typeof plan !== "object") return null;

 const addonsList = addons.length === 1 && Array.isArray(addons[0]) ? addons[0] : addons;
 const baseDailyRate =    typeof plan.dailyRate === "number" && Number.isFinite(plan.dailyRate)  ? plan.dailyRate  : 0;
 const days = typeof plan.days === "number" && Number.isFinite(plan.days) ? plan.days:0;

let addonTotal = 0;
  const addonNames = [];

for(const addon of addonsList)
{  if (!addon || typeof addon !== "object") continue;

   const { name, price } = addon;

if (typeof name === "string" && name.trim() !== "") {
      addonNames.push(name);
    }

    if (typeof price === "number" && Number.isFinite(price)) {
      addonTotal += price;
    }
  }

  const newDailyRate = baseDailyRate + addonTotal;
  const newTotalCost = newDailyRate * days;

 
  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames}
}
