import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://giavangonline.com/";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 10000
    });

    const $ = cheerio.load(data);

    // Lấy dòng SJC
    const row = $("tr")
      .filter((i, el) => $(el).text().includes("SJC"))
      .first();

    const tds = row.find("td");

    const buy = $(tds[1]).text().trim();
    const sell = $(tds[2]).text().trim();

    res.status(200).json({
      brand: "SJC",
      buy,
      sell,
      updatedAt: new Date().toLocaleString("vi-VN")
    });

  } catch (err) {
    res.status(500).json({
      error: "Không lấy được giá vàng",
      detail: err.message
    });
  }
}
