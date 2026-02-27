import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Generate contract number
function generateNomorKontrak(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `AP-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const namaLengkap = formData.get("namaLengkap") as string;
    const nomorHP = formData.get("nomorHP") as string;
    const durasiKontrak = formData.get("durasiKontrak") as string;
    const nomorRekening = formData.get("nomorRekening") as string;
    const namaBank = formData.get("namaBank") as string;
    const jenisLayanan = formData.get("jenisLayanan") as string;

    // Handle photo upload - store as base64 for simplicity
    let fotoUrl: string | null = null;
    const foto = formData.get("foto") as File | null;
    if (foto && foto.size > 0) {
      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fotoUrl = `data:${foto.type};base64,${buffer.toString("base64")}`;
    }

    // Validate required fields
    if (!namaLengkap || !nomorHP || !durasiKontrak || !nomorRekening || !namaBank || !jenisLayanan) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Generate contract number
    const nomorKontrak = generateNomorKontrak();

    // Save to database
    const pendaftaran = await db.pendaftaran.create({
      data: {
        namaLengkap,
        nomorHP,
        durasiKontrak,
        fotoUrl,
        nomorRekening,
        namaBank,
        jenisLayanan,
        status: "pending",
        nomorKontrak,
        tanggalKontrak: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil",
      data: pendaftaran,
    });
  } catch (error) {
    console.error("Error saving pendaftaran:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan data" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const pendaftaran = await db.pendaftaran.findUnique({
        where: { id },
      });

      if (!pendaftaran) {
        return NextResponse.json(
          { error: "Data tidak ditemukan" },
          { status: 404 }
        );
      }

      return NextResponse.json({ data: pendaftaran });
    }

    const pendaftarans = await db.pendaftaran.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: pendaftarans });
  } catch (error) {
    console.error("Error fetching pendaftaran:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data" },
      { status: 500 }
    );
  }
}
