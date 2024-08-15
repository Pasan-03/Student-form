import { NextResponse } from 'next/server';
import connection from '../../../db';


export async function POST(req) {
  try {
    const { name, email, age, grade, subjects } = await req.json();

    const query = 'INSERT INTO students (name, email, age, grade, subjects) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.query(query, [name, email, age, grade, subjects], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return reject(new Error('Error inserting data'));
        }
        resolve(NextResponse.json({ message: 'Data inserted successfully' }));
      });
    });
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
