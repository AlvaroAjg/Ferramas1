import { NextResponse } from 'next/server';
import { runQuery } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, rut } = body;

    if (!email || !password || !name || !rut) {
      return NextResponse.json({ success: false, message: 'Faltan campos requeridos' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }

    // Insert user into the database
    // Assumes your table is named 'Usuarios' and has columns 'nombre', 'email', 'password'
    const insertQuery = 'INSERT INTO Usuarios (name, email, password, rut) VALUES (?, ?, ?, ?)';
    const result = await runQuery(insertQuery, [name, email, password, rut]);

    // `result.lastID` should give the ID of the newly inserted row for SQLite
    const newUser = {
      id: result.lastID, // This depends on how runQuery resolves and what the db driver returns
      name,
      email,
      rut,
    };

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error('Error de registro:', error);
    // Handle potential duplicate email error (SQLite specific error code SQLITE_CONSTRAINT)
    // You might need to adjust the error checking based on your exact SQLite setup and error messages
    if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE constraint failed: Usuarios.email')) {
      return NextResponse.json({ success: false, message: 'El correo electrónico ya está registrado' }, { status: 409 }); // 409 Conflict
    }
    return NextResponse.json({ success: false, message: 'Error interno del servidor' }, { status: 500 });
  }
} 