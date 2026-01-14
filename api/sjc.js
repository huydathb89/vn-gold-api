import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://giavang.net/gia-vang-sjc/";

    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
        "Accept-Language": "vi-VN,vi;q=0.9",
      },
    });

    const $ = cheerio.load(response.data);

    let buy = null;
    let sell = null;

    $("tr").each((_, el) => {
      const tds = $(el).find("td");
      const text = $(el).text();

      if (text.includes("SJC") && tds.length >= 3) {
        buy = tds.eq(1).text().trim();
        sell = tds.eq(2).text().trim();
      }
    });

    if (!buy || !sell) {
      throw new Error("Không parse được giá SJC từ giavang.net");
    }

    res.status(200).json({
      brand: "SJC",
      buy,
      sell,
      unit: "VND/lượng",
      source: "giavang.net",
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}
