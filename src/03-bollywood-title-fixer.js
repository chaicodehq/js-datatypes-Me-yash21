/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  // Your code here
  if(typeof title !== "string" || title.trim().length === 0){
    return "";
  }


  function capitalize(word){
    let modifiedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return modifiedWord;
  }

  function toTitleCase(str){
    let exceptionWord = ["ka","ki","ke","se","aur","ya","the","of","in","a","an"];

    let lowercaseString = str.toLowerCase();
    let strWordArr = lowercaseString.split(" ");

    // agar title ka pahala word , exceptionWords mein se ek hai toh, usko Uppercase mein convert karenge. our baki jagha exceptionWord lowercase hi rahenge.
    let modifiedWordArr = strWordArr.map((word,index)=>{
      // if 0th index par exception word hai toh use capitalize kar do.
      if(index === 0 && exceptionWord.includes(word)){
        return capitalize(word)
      }else{
        if(exceptionWord.includes(word)){
          return word;
        }else{
          return capitalize(word);
        }
      }

    })

    let modifiedTitleStr = modifiedWordArr.join(" ")
    return modifiedTitleStr;
  }

  let cleanTitle = title.trim().replace(/\s+/g," ");
  
  let modifiedMovieTitle = toTitleCase(cleanTitle);
  return modifiedMovieTitle;

}
