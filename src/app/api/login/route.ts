import { NextResponse } from "next/server";
import { getQuery } from "../../../lib/db";
import { User } from "../../../lib/entities/User";

type RequestBody = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({
      success: false,
      error: "Ingrese email o password",
    });
  }
  const query = `SELECT * FROM "usuarios" WHERE email = ?`;
  const user = (await getQuery(query, [email])) as User;
  if (!user) {
    return NextResponse.json({
      success: false,
      error: "Usuario o contraseña incorrectos",
    });
  }
  if (user.password !== password) {
    return NextResponse.json({
      success: false,
      error: "Usuario o contraseña incorrectos",
    });
  }
  return NextResponse.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
