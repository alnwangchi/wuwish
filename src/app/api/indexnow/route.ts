// app/api/indexnow/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const INDEXNOW_KEY = '0dc2016945504e26b52b07d6afd7678f';
const HOST = 'www.wuwish.com.tw';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { urls } = body;

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid urls' }, { status: 400 });
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    };

    const res = await axios.post('https://www.bing.com/indexnow', payload);

    console.log('✅ IndexNow submitted successfully:', res.status);

    return NextResponse.json({
      success: true,
      submitted: urls.length,
      status: res.status,
      data: res.data // ✅ 這裡只回傳純資料，安全
    });
  } catch (error: any) {
    console.error('❌ IndexNow error:', error?.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        message: error?.response?.data || error.message
      },
      { status: 500 }
    );
  }
}
