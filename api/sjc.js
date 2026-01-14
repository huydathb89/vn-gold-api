import axios from "axios";

export default async function handler(req, res) {
  try {
    const url =
      "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10";

    const response = await axios.get(url, { timeout: 15000 });

    res.status(200).json({
      raw: response.data,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}
