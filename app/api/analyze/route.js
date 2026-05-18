// This file runs on Vercel's servers (not in the browser)
// It securely holds your API key and forwards requests to Claude

export async function POST(request) {
  try {
    const { imageBase64, mediaType, analysisType } = await request.json();

    if (!imageBase64 || !mediaType || !analysisType) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const PROMPTS = {
      face: `You are a peptide and longevity research advisor for the Mitozen brand. Analyze this facial photo for visible signs that specific research peptides could address. Look for:

- Skin texture, fine lines, wrinkles, laxity
- Under-eye area (dark circles, puffiness, hollowness)
- Skin tone evenness, pigmentation, sun damage
- Acne, scarring, or inflammatory skin conditions
- Hair quality/thinness (if visible)
- Overall signs of aging or vitality

Based on your visual assessment, recommend 3-5 peptides from this list ONLY: BPC-157, GHK-Cu, Retatrutide, NAD+, TB-500, Ipamorelin/CJC-1295, PT-141, Semaglutide, Selank, MOTS-c, SS-31, Epithalon.

Respond in ONLY this JSON format, no other text:
{
  "observations": [
    {"area": "area name", "finding": "what you see", "severity": "mild|moderate|significant"}
  ],
  "recommendations": [
    {"peptide_id": "id from list", "reason": "why this peptide for this person", "priority": 1}
  ],
  "overall_assessment": "2-3 sentence overall take on what this person could benefit from most"
}

Peptide IDs to use: bpc157, ghkcu, retatrutide, nad, tb500, ipacjc, pt141, semaglutide, selank, mots_c, ss31, epithalon`,

      physique: `You are a peptide and longevity research advisor for the Mitozen brand. Analyze this physique/body photo for visible signs that specific research peptides could address. Look for:

- Body composition (estimated body fat, muscle mass distribution)
- Skin quality on body (stretch marks, loose skin, elasticity)
- Muscle development and symmetry
- Signs of inflammation or water retention
- Overall vitality and physical condition

Based on your visual assessment, recommend 3-5 peptides from this list ONLY: BPC-157, GHK-Cu, Retatrutide, NAD+, TB-500, Ipamorelin/CJC-1295, PT-141, Semaglutide, Selank, MOTS-c, SS-31, Epithalon.

Respond in ONLY this JSON format, no other text:
{
  "observations": [
    {"area": "area name", "finding": "what you see", "severity": "mild|moderate|significant"}
  ],
  "recommendations": [
    {"peptide_id": "id from list", "reason": "why this peptide for this person", "priority": 1}
  ],
  "overall_assessment": "2-3 sentence overall take on what this person could benefit from most"
}

Peptide IDs to use: bpc157, ghkcu, retatrutide, nad, tb500, ipacjc, pt141, semaglutide, selank, mots_c, ss31, epithalon`,
    };

    const prompt = PROMPTS[analysisType];
    if (!prompt) {
      return Response.json({ error: "Invalid analysis type" }, { status: 400 });
    }

    // Call Claude's API from the server (API key stays secret here)
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: imageBase64,
                },
              },
              { type: "text", text: prompt },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Claude API error:", errText);
      return Response.json(
        { error: "Analysis service unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return Response.json(parsed);
  } catch (err) {
    console.error("Analysis error:", err);
    return Response.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
