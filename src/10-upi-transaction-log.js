/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
  if(!Array.isArray(transactions) || transactions.length === 0){
    return null
  }

  const filterTransactions = transactions.filter((transactionObj)=>{
    // if transaction amount is negative then skip it. 
    if(transactionObj.amount < 0 ){
      return false;
    }
    //  if transaction is not debit or  not a credit , then skip it. 
    if(transactionObj.type !== "debit" && transactionObj.type !== "credit"){
      return false;
    }

    return true;
  })

  if(filterTransactions.length === 0){
    return null;
  }

  let {totalCredit, totalDebit} = filterTransactions.reduce((totalAmounts,curr)=>{
    if(!totalAmounts["totalCredit"]){
      totalAmounts.totalCredit = 0;
    }
    if(!totalAmounts["totalDebit"]){
      totalAmounts.totalDebit = 0
    }

    if(curr.type === "credit"){
      totalAmounts.totalCredit += curr.amount;
    }if (curr.type === "debit") {
      totalAmounts.totalDebit += curr.amount;
    } 

    return totalAmounts
  },{})

  let netBalance = totalCredit - totalDebit;

  let transactionCount = filterTransactions.length;

  let avgTransaction = Math.round((totalCredit + totalDebit)/transactionCount);

  function getHighestTransaction(transactions){
    let highestTransactionAmount = transactions[0].amount;
    let indexOfHighestTransaction = 0;

    transactions.forEach((transactionObj,index) => {
      if(transactionObj.amount > highestTransactionAmount){
        highestTransactionAmount = transactionObj.amount;
        indexOfHighestTransaction = index
      }
    });

    let highestTransactionFullObj = transactions[indexOfHighestTransaction];
    return highestTransactionFullObj;
  }

  let highestTransaction = getHighestTransaction(filterTransactions);

  // categoryBrakdown: object with category as key and total amount as value
  let categoryBreakdown = filterTransactions.reduce((categoryObj,{category,amount})=>{    
    if(!categoryObj[category]){
      categoryObj[category] = 0;
    }
    categoryObj[category] += amount;

    return categoryObj
  },{})

  let allContactFrequency = filterTransactions.reduce((contactFrequencies,{to})=>{
    if(!contactFrequencies[to]){
      contactFrequencies[to] = 0;
    }
    contactFrequencies[to] += 1;

    return contactFrequencies;
  },{})


  function getHighestFrequentContact(allContactFrequency){
    // allContactFrequency must be an Object;
    let contactFrequenciesArr = Object.entries(allContactFrequency);
    // contactFrequenciesArr = [["swiggy",2],["rahul",3]]
    
    // sort the array in decending order;
    let sortedContactFrqArr = [...contactFrequenciesArr].sort(([a_contact,a_frq],[b_contact,b_frq])=>{
      return b_frq - a_frq;
    })

    let highestFrequentContact = sortedContactFrqArr[0][0]
    return highestFrequentContact;
  }

  let frequentContact = getHighestFrequentContact(allContactFrequency);

  let allAbove100 = filterTransactions.every(({amount})=> amount > 100);
  let hasLargeTransaction = filterTransactions.some(({amount})=> amount >=5000);

  let finalObject = {
    totalCredit,
    totalDebit,
    netBalance,
    transactionCount,
    avgTransaction,
    highestTransaction,
    categoryBreakdown,
    frequentContact,
    allAbove100,
    hasLargeTransaction
  }

  return finalObject;
}
