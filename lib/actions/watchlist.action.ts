"use server";

import { Watchlist } from "@/Database/models/watchlist.model";
import { connectToDatabase } from "@/Database/mongoose";

export const getWatchlistSymbolsByEmail = async (email: String) => {
  if (!email) return [];
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose?.connection.db;
    if (!db) throw new Error("Connection Not found WatchList BY Symbol");

    const user = await db.collection("user").findOne<{
      _id?: unknown;
      id?: String;
      email?: String;
    }>({ email });

    if (!user) return [];
    const userId = (user.id as String) || String(user._id || "");
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();

    return items.map((item) => String(item.symbol));
  } catch (error) {
    console.error("getWatchlistBySymbol error:", error);
    return [];
  }
};
