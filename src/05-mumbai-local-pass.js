/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  // Your code here

  // if passenger object nahi hai ya null hai, retrun "INVALID PASS"  
  if(typeof passenger !== "object" || Array.isArray(passenger) || passenger === null){
    return "INVALID PASS"
  }
  
  let requiredField = ["name","from","to","classType"]
  // if  koi required field missing hai ya empty string hai , retrun "INVALID PASS"
  if(
    !requiredField.every((field)=> passenger.hasOwnProperty(field) && passenger[field].trim().length !== 0 )
  ){
    return "INVALID PASS"
  }

  // if classType "first" ya "second" nahi hai , return "INVALID ID"
  let classType = passenger.classType.toUpperCase();
  if(classType !== "FIRST" && classType !== "SECOND"){
    return "INVALID PASS"
  }

  function toTitleCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function generatePassId(passenger){
    let classType = passenger.classType;
    let departureCity = passenger.from;
    let destinationCity = passenger.to;

    let passId = classType.charAt(0).toUpperCase() + departureCity.slice(0,3).toUpperCase() + destinationCity.slice(0,3).toUpperCase();

    return passId;
  }

  let passengerName = passenger.name.toUpperCase();
  let passengerFrom = toTitleCase(passenger.from);
  let passengerTo = toTitleCase(passenger.to);
  let passengerPassId = generatePassId(passenger);

  let formattedPassString = `MUMBAI LOCAL PASS\n---\nName: ${passengerName}\nFrom: ${passengerFrom}\nTo: ${passengerTo}\nClass: ${classType}\nPass ID: ${passengerPassId}`

  return formattedPassString;
}
