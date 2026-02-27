import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const ADMIN_PASSWORD = "AndikaPratama2024";

// GET - Ambil semua testimoni
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const aktif = searchParams.get("aktif");

    const where: {
      kategori?: string;
      aktif?: boolean;
    } = {};

    if (kategori) {
      where.kategori = kategori;
    }
    if (aktif !== null) {
      where.aktif = aktif === "true";
    }

    const testimoni = await db.testimoni.findMany({
      where,
      orderBy: { urutan: "asc" },
    });

    return NextResponse.json({ success: true, data: testimoni });
  } catch (error) {
    console.error("Error fetching testimoni:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data testimoni" },
      { status: 500 }
    );
  }
}

// POST - Tambah testimoni baru (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, kategori, imageUrl, keterangan, urutan } = body;

    // Verify admin password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Password salah!" },
        { status: 401 }
      );
    }

    if (!kategori || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Kategori dan gambar wajib diisi" },
        { status: 400 }
      );
    }

    if (kategori !== "resmi" && kategori !== "ilegal") {
      return NextResponse.json(
        { success: false, error: "Kategori harus 'resmi' atau 'ilegal'" },
        { status: 400 }
      );
    }

    const testimoni = await db.testimoni.create({
      data: {
        kategori,
        imageUrl,
        keterangan: keterangan || null,
        urutan: urutan || 0,
      },
    });

    return NextResponse.json({ success: true, data: testimoni });
  } catch (error) {
    console.error("Error creating testimoni:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menambah testimoni" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus testimoni (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const password = searchParams.get("password");

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Password salah!" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID testimoni wajib diisi" },
        { status: 400 }
      );
    }

    await db.testimoni.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Testimoni berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting testimoni:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus testimoni" },
      { status: 500 }
    );
  }
}

// PUT - Update testimoni (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, id, kategori, imageUrl, keterangan, urutan, aktif } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Password salah!" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID testimoni wajib diisi" },
        { status: 400 }
      );
    }

    const updateData: {
      kategori?: string;
      imageUrl?: string;
      keterangan?: string | null;
      urutan?: number;
      aktif?: boolean;
    } = {};

    if (kategori) updateData.kategori = kategori;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (keterangan !== undefined) updateData.keterangan = keterangan;
    if (urutan !== undefined) updateData.urutan = urutan;
    if (aktif !== undefined) updateData.aktif = aktif;

    const testimoni = await db.testimoni.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: testimoni });
  } catch (error) {
    console.error("Error updating testimoni:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengupdate testimoni" },
      { status: 500 }
    );
  }
}
