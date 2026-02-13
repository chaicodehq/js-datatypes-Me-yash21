/**
 * 💬 WhatsApp Message Parser
 *
 * Chintu ek WhatsApp chat analyzer bana raha hai. Usse raw WhatsApp
 * exported message line parse karni hai aur usme se date, time, sender,
 * aur message alag alag extract karna hai.
 *
 * WhatsApp export format:
 *   "DD/MM/YYYY, HH:MM - Sender Name: Message text here"
 *
 * Rules:
 *   - Date extract karo: string ke start se pehle ", " (comma-space) tak
 *   - Time extract karo: ", " ke baad se " - " (space-dash-space) tak
 *   - Sender extract karo: " - " ke baad se pehle ": " (colon-space) tak
 *   - Message text extract karo: pehle ": " ke baad (after sender) sab kuch, trimmed
 *   - wordCount: message ke words count karo (split by space, filter empty strings)
 *   - Sentiment detection (case-insensitive check on message text):
 *     - Agar message mein "😂" ya ":)" ya "haha" hai => sentiment = "funny"
 *     - Agar message mein "❤" ya "love" ya "pyaar" hai => sentiment = "love"
 *     - Otherwise => sentiment = "neutral"
 *     - Agar dono match hote hain, "funny" gets priority
 *   - Hint: Use indexOf(), substring()/slice(), includes(), split(),
 *     trim(), toLowerCase()
 *
 * Validation:
 *   - Agar input string nahi hai, return null
 *   - Agar string mein " - " nahi hai ya ": " nahi hai (after sender), return null
 *
 * @param {string} message - Raw WhatsApp exported message line
 * @returns {{ date: string, time: string, sender: string, text: string, wordCount: number, sentiment: string } | null}
 *
 * @example
 *   parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Bhai party kab hai? 😂")
 *   // => { date: "25/01/2025", time: "14:30", sender: "Rahul",
 *   //      text: "Bhai party kab hai? 😂", wordCount: 5, sentiment: "funny" }
 *
 *   parseWhatsAppMessage("01/12/2024, 09:15 - Priya: I love this song")
 *   // => { date: "01/12/2024", time: "09:15", sender: "Priya",
 *   //      text: "I love this song", wordCount: 4, sentiment: "love" }
 */
export function parseWhatsAppMessage(message) {
  // Your code 
  // regex to test the format of message 
  //"DD/MM/YYYY, HH:MM - Sender Name: Anytext"
  console.log("Message before Regex check:- ",message)
  const regexTest = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2} - [\w\W]+: /;

  if(typeof message !== "string" || !regexTest.test(message)){
    return null;
  }

  const indexOfComma = message.indexOf(",");
  const indexOfHyphen = message.indexOf("-");
  const indexOfColon = message.indexOf(": "); // here I am using ": " instead of ":" because there is also ":" single colon in time-format.

  const date = message.slice(0,indexOfComma);
  const time = message.slice(indexOfComma+1, indexOfHyphen).trim();
  const sender = message.slice(indexOfHyphen+1, indexOfColon).trim();
  let msgTxt = message.slice(indexOfColon+1).trim();
  // if(message === "10/01/2025, 10:00 - Rahul Kumar Sharma: Hey")
    
    console.log(`full message string:- ,${message}\nindexOfComma:-${indexOfComma}\nindexOfHyphen:- ${indexOfHyphen}\nindexOfColon:- ${indexOfColon}\ndate:-${date}\nTime:- ${time}\nSender:- ${sender}\nmsgTxt:- ${msgTxt}` )

    // console.log("date:- ",date)
    // console.log("typeof date:- ",typeof date)

    // console.log("time:- ",time)
    // console.log("typeof time:- ",typeof time)

    // console.log("sender:- ",sender)
    // console.log("typeof sender:- ",typeof sender)

    // console.log("msgTxt:- ",msgTxt)
    // console.log("type of msgTxt:- ",typeof msgTxt)
  // }
  // clear the extra spaces(space more than one) between the msgTxt, by replacing more than one space with " " singal space. 
  let text = msgTxt.replaceAll(/\s+/g," ");
  let msgWords = text.split(" ");
  let wordCount = msgWords.length;

  // check the msgWords array , does it contain any one from "😂", ":)","haha".if yes,then make isMsgFunny true. 
  let isMsgFunny = msgWords.some((word)=>{
    let lwrCaseWord = word.toLowerCase();
    return lwrCaseWord === "😂" || lwrCaseWord === ":)" || lwrCaseWord === "haha"
  })

  let isMsgLovely = msgWords.some((word)=>{
    let lwrCaseWord = word.toLowerCase();
    return lwrCaseWord === "❤" || lwrCaseWord === "love" || lwrCaseWord === "pyaar";
  })

  let sentiment;
  // Agar message mein dono sentiment hai then , "funny" gets priority
  if(isMsgFunny && isMsgLovely){
    sentiment = "funny"
  }else if(isMsgFunny){
    sentiment = "funny"
  }else if(isMsgLovely){
    sentiment = "love"
  }else{
    sentiment = "neutral"
  }

  return {
    date,
    time,
    sender,
    text,
    wordCount,
    sentiment
  }


}
