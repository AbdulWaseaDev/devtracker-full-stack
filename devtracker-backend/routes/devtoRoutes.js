import express from "express";
const router = express.Router();

// Map your short aliases → real Dev.to handles
const ALIAS_MAP = {
  zeeshan: "mzeeshan138",
  nadeem: "nadeem137",
  anus: "anus_javaid30",
};

// GET /api/v1/devto/feed and /api/v1/devto/feed/:alias?
// If alias is present, only that one; otherwise all
router.get("/feed/:alias?", async (req, res, next) => {
  try {
    res.set("Cache-Control", "no-store");
    const alias = req.params.alias;
    let usernames;

    if (alias) {
      const key = alias.toLowerCase();
      if (!ALIAS_MAP[key]) {
        return res.status(404).json({ error: "User not supported" });
      }
      usernames = [ALIAS_MAP[key]];
    } else {
      usernames = Object.values(ALIAS_MAP);
    }

    // Fetch each user’s articles
    const articlesLists = await Promise.all(
      usernames.map(async (username) => {
        const resp = await fetch(
          `https://dev.to/api/articles?username=${username}&per_page=100`,
        );
        if (!resp.ok) {
          console.warn(`No articles for ${username}:`, resp.status);
          return [];
        }
        const articles = await resp.json();
        return articles.map((a) => ({ ...a, source: username }));
      }),
    );

    // Merge & sort newest first
    const combined = articlesLists
      .flat()
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    res.json(combined);
  } catch (err) {
    next(err);
  }
});

export default router;
