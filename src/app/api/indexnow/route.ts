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

    const res = await axios.post('https://www.bing.com/indexnow', {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    });

    console.log(`IndexNow response:`, res);
    return NextResponse.json({ success: true, submitted: urls.length, res });
  } catch (error: any) {
    console.log(`IndexNow response error:`, error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
