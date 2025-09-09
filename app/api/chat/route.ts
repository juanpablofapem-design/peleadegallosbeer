import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();
  const q = String(question || "").toLowerCase();
  let answer = "Te sugiero nuestra IPA Chiltepina (ABV 6.2%, IBU 55). Marida con tacos al pastor, aguachile y wings.";
  if (/sushi|marisco|ceviche/.test(q)) answer = "Vanilla Cream Ale (ABV 4.9%, IBU 18). Va increíble con mariscos y sushi.";
  else if (/carne|pastor|bbq|alitas|picante|chil(e|tep)/.test(q)) answer = "IPA Chiltepina (ABV 6.2%, IBU 55). Ideal con carne, alitas y comida picante.";
  else if (/postre|chocolate|invierno|noche/.test(q)) answer = "Harry Porter (ABV 5.6%, IBU 28). Perfecta con brownies, BBQ y café.";
  else if (/queso|ensalada|brunch|calor|verano/.test(q)) answer = "Grape Saison (ABV 6.5%, IBU 25). Quesos, ensaladas y pollo a la parrilla.";
  else if (/suave|ligera|principiante/.test(q)) answer = "Vanilla Cream Ale (ABV 4.9%, IBU 18). Equilibrada y fácil de beber.";
  return NextResponse.json({ answer });
}
