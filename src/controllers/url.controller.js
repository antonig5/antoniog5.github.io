import { nanoid } from "nanoid";
import Url from "../model/url.model.js";

export const Getall = async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetOne = async (req, res) => {
  try {
    const shortUrl = await Url.findOne({
      shortUrl: `https://api-link-pwcl.onrender.com/api/${req.params.id}`,
    });
    if (shortUrl) {
      res.redirect(shortUrl.url);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CreatedShotLink = async (req, res) => {
  const { url, custom } = req.body;
  try {
    const id = custom || nanoid(6);
    const shortUrl = `https://api-link-pwcl.onrender.com/api/${id}`;

    const newUrl = new Url({
      url: url,
      shortUrl: shortUrl,
    });

    await newUrl.save();

    res.status(200).json({ shortUrl: newUrl.shortUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const DeleteAll = async (req, res) => {
  try {
    const urls = await Url.deleteMany();
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const VerifyUrl = async (req, res) => {
  const apiKey = "AIzaSyDScdBM8h_qfkSqxsNU2fWhSRbjWYDgpe4";
  const safeBrowsingURL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  try {
    const { url } = req.body;
    const response = await fetch(safeBrowsingURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: {
          clientId: "api-link",
          clientVersion: "1.5.2",
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
          platformTypes: ["WINDOWS"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url: url }],
        },
      }),
    });
    const data = await response.json();
    if (Object.keys(data).length === 0) {
      res.json({
        message: "No se encontraron amenazas para la URL proporcionada",
      });
    } else {
      res.json({ message: data });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
