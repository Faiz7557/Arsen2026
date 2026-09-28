import { NextResponse } from "next/server";
import klasterData from "@/data/klaster.json";
import provinsiData from "@/data/provinsi.json";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    spatialModel: klasterData.spatialModel,
    clusters: klasterData.clusters,
    macroStats: klasterData.macroStats,
    provinces: provinsiData,
  });
}
