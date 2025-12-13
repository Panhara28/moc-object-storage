import { NextResponse } from "next/server";
import { getSwaggerSpec } from "@/swagger.config";

export async function GET() {
  return NextResponse.json(getSwaggerSpec());
}
