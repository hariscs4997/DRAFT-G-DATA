// app/api/fetch-consent-data/route.js
import { NextResponse } from 'next/server';
import { connectSocket } from '@/lib/socket';

export async function GET() {
  try {
    const socket = connectSocket('market_place');
    const data = await new Promise((resolve, reject) => {
      socket.emit('consent_averages');

      socket.on('consent_averages', (data) => {
        resolve(data);
        socket.disconnect();
      });

      socket.on('connect_error', (error) => {
        reject(new Error('Connection error: ' + error.message));
        socket.disconnect(); // Disconnect in case of error
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching consent averages:', error);
    return NextResponse.json({ error: 'Error fetching consent averages' }, { status: 500 });
  }
}
