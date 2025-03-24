import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const response = await fetch('http://193.164.150.93:5000/format-csv-to-txt', {
      method: 'POST',
      body: formData,
    })

    const text = await response.text()
    let data

    try {
      data = JSON.parse(text)
    } catch {
      data = { raw: text }
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) })
  }
}
