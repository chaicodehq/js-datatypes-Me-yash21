/**
 * 🍕 Zomato Order Builder
 *
 * Zomato jaisa order summary banana hai! Cart mein items hain (with quantity
 * aur addons), ek optional coupon code hai, aur tujhe final bill banana hai
 * with itemwise breakdown, taxes, delivery fee, aur discount.
 *
 * Rules:
 *   - cart is array of items:
 *     [{ name: "Butter Chicken", price: 350, qty: 2, addons: ["Extra Butter:50", "Naan:40"] }, ...]
 *   - Each addon string format: "AddonName:Price" (split by ":" to get price)
 *   - Per item total = (price + sum of addon prices) * qty
 *   - Calculate:
 *     - items: array of { name, qty, basePrice, addonTotal, itemTotal }
 *     - subtotal: sum of all itemTotals
 *     - deliveryFee: Rs 30 if subtotal < 500, Rs 15 if 500-999, FREE (0) if >= 1000
 *     - gst: 5% of subtotal, rounded to 2 decimal places parseFloat(val.toFixed(2))
 *     - discount: based on coupon (see below)
 *     - grandTotal: subtotal + deliveryFee + gst - discount (minimum 0, use Math.max)
 *     - Round grandTotal to 2 decimal places
 *
 *   Coupon codes (case-insensitive):
 *     - "FIRST50"  => 50% off subtotal, max Rs 150 (use Math.min)
 *     - "FLAT100"  => flat Rs 100 off
 *     - "FREESHIP" => delivery fee becomes 0 (discount = original delivery fee value)
 *     - null/undefined/invalid string => no discount (0)
 *
 *   - Items with qty <= 0 ko skip karo
 *   - Hint: Use map(), reduce(), filter(), split(), parseFloat(),
 *     toFixed(), Math.max(), Math.min(), toLowerCase()
 *
 * Validation:
 *   - Agar cart array nahi hai ya empty hai, return null
 *
 * @param {Array<{ name: string, price: number, qty: number, addons?: string[] }>} cart
 * @param {string} [coupon] - Optional coupon code
 * @returns {{ items: Array<{ name: string, qty: number, basePrice: number, addonTotal: number, itemTotal: number }>, subtotal: number, deliveryFee: number, gst: number, discount: number, grandTotal: number } | null}
 *
 * @example
 *   buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100")
 *   // subtotal: 330, deliveryFee: 30, gst: 16.5, discount: 100
 *   // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
 *
 *   buildZomatoOrder([{ name: "Pizza", price: 500, qty: 2, addons: [] }], "FIRST50")
 *   // subtotal: 1000, deliveryFee: 0, gst: 50, discount: min(500, 150) = 150
 *   // grandTotal: 1000 + 0 + 50 - 150 = 900
 */
export function buildZomatoOrder(cart, coupon) {
  // Your code here
  if(!Array.isArray(cart) || cart.length === 0){
    return null
  }

  // filter the items form the card , which qty is <=0 and price <=0
  let filterCart = cart.filter((item)=>{
    if(item.qty <= 0 || item.price < 0){
      return false;
    }
    return true;
  })

  let items = filterCart.map((item)=>{
    //if item has no addons property, assign empty array default\
    if(!item["addons"]){
      item.addons = []
    }

    let addonsPricesArray = item.addons.map((addonString)=>{
      let addonArr = addonString.split(":")
      let SingleAddonPrice = Number(addonArr[1]);

      return SingleAddonPrice;
    })

    let sumOfAddonPrices = addonsPricesArray.reduce((acc,curr)=> acc + curr,0);

    let itemTotalPrice = (item.price + sumOfAddonPrices) * item.qty;

    return {
      name:item.name,
      qty: item.qty,
      basePrice: item.price,
      addonTotal: sumOfAddonPrices,
      itemTotal: itemTotalPrice
    }
  })

  let subtotal = items.reduce((total,currItem)=>total + currItem.itemTotal,0);

  let deliveryFee = 0;

  switch(true){
    case (subtotal < 500):
      deliveryFee = 30;
      break;
    case (subtotal <= 999 && subtotal >=500):
      deliveryFee = 15;
      break;
    case (subtotal >=1000 ):
      deliveryFee = 0;
      break;
  }

  let gst = parseFloat((subtotal * 0.05).toFixed(2));
  let discount = 0;

  if(coupon){
    let UpperCaseCoupon = coupon.toUpperCase();
    
    switch(UpperCaseCoupon){
      case "FIRST50":
        let discountOnSubtotal = subtotal * 0.5;
        // Max discount price is Rs.150/-
        discount = Math.min(discountOnSubtotal,150);
        break;
        case "FLAT100":
          discount = 100;
          break;
        case "FREESHIP":
          // DeliveryFee become 0 (And Discount = dileveryFee)
          discount = deliveryFee;
          deliveryFee = 0;
          break;
        default:
          discount = 0;
          break;
    }
  }
      
  let grandTotal = subtotal + deliveryFee + gst - discount;
  grandTotal = parseFloat(grandTotal.toFixed(2));
  if(grandTotal<0){
    grandTotal = 0;
  }

  let finalResult = {
    items,
    subtotal,
    gst,
    deliveryFee,
    discount,
    grandTotal
  }

  return finalResult;

}
