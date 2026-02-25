import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const pendaftaran = await prisma.pendaftaran.create({
      data: {
        namaLengkap: body.nama,
        nomorHP: body.hp,
        layanan: body.layanan,
        durasi: body.durasi,
        bank: body.bank,
        rekening: body.rekening,
        fotoUrl: body.fotoUrl || null,
      }
    })

    return NextResponse.json({ success: true, data: pendaftaran })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal menyimpan data' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const data = await prisma.pendaftaran.findMany({
      orderBy: { tanggalDaftar: 'desc' }
    })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}
