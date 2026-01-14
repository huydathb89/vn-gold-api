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

    // 🔥 DEBUG: trả toàn bộ dữ liệu
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}
