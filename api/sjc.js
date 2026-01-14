import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://giavang.net/gia-vang-sjc/";

    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      },
    });

    const $ = cheerio.load(response.data);

    const row = $("table tbody tr").first();

    if (!row.length) {
      throw new Error("Không lấy được dữ liệu SJC");
    }

    const cols = row.find("td");

    const data = {
      brand: "SJC",
      buy: cols.eq(1).text().trim(),
      sell: cols.eq(2).text().trim(),
      unit: "VND/lượng",
      source: "giavang.net",
      updatedAt: new Date().toISOString(),
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}
