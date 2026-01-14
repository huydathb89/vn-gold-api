import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = "https://tygia.com/json.php?ran=0&rate=0&gold=1";

    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      },
    });

    const data = response.data;

    if (!data || !data.gold || !Array.isArray(data.gold)) {
      throw new Error("Dữ liệu vàng không hợp lệ");
    }

    // Tìm SJC
    const sjc = data.gold.find(
      (item) => item.brand && item.brand.includes("SJC")
    );

    if (!sjc) {
      throw new Error("Không tìm thấy SJC trong dữ liệu");
    }

    res.status(200).json({
      brand: sjc.brand,
      buy: sjc.buy,
      sell: sjc.sell,
      unit: "VND/lượng",
      source: "tygia.com",
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}
