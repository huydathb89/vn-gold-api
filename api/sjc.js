import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://sjc.com.vn/giavang/textContent.php";

    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      },
    });

    const $ = cheerio.load(response.data);

    const rows = $("table tbody tr");

    if (rows.length === 0) {
      throw new Error("Không parse được bảng giá");
    }

    const firstRow = rows.first().find("td");

    const data = {
      brand: "SJC",
      buy: firstRow.eq(1).text().trim(),
      sell: firstRow.eq(2).text().trim(),
      unit: "VND/lượng",
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
