import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "db");
console.log(`RUTA DB: ${dbPath}`);

export const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Error al conectar:", err.message);
      return;
    }
    console.log("¡Conectado a la base de datos!");
    seed(); // Arranca el seeding justo después de conectar
  }
);

function seed() {
  db.serialize(() => {
    // 1. Crear tablas si no existen
    db.run(
      `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        rut TEXT
      )
    `,
      (err) => {
        if (err) console.error("Error creando tabla usuarios:", err);
        else console.log("Tabla usuarios creada o ya existía.");
      }
    );

    db.run(
      `
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL,
        stock INTEGER,
        image TEXT,
        description TEXT,
        category TEXT
      )
    `,
      (err) => {
        if (err) console.error("Error creando tabla productos:", err);
        else console.log("Tabla productos creada o ya existía.");
      }
    );

    // 2. Insertar usuarios de prueba
    const stmtUsuarios = db.prepare(`
      INSERT INTO usuarios
        (name, email, password, rut)
      VALUES (?, ?, ?, ?)
    `);

    const usuarios = [
      ["Álvaro González", "alvaro@example.com", "1234", "12345678-9"],
      ["María Silva", "maria.silva@email.com", "password123", "23456789-0"],
      ["Carlos Rodríguez", "carlos.rodriguez@email.com", "carlos2024", "34567890-1"],
      ["Ana López", "ana.lopez@email.com", "anapass", "45678901-2"],
      ["Pedro Martínez", "pedro.martinez@email.com", "pedro123", "56789012-3"],
      ["Laura Torres", "laura.torres@email.com", "laura456", "67890123-4"]
    ];

    for (const u of usuarios) {
      stmtUsuarios.run(u, (err) => {
        if (err) console.error("Error insertando usuario:", err);
      });
    }

    stmtUsuarios.finalize((err) => {
      if (err) console.error("Error finalizando statement de usuarios:", err);
      else console.log("Inserción de usuarios completada.");
    });

    // 3. Preparar e insertar datos de productos
    const stmt = db.prepare(`
      INSERT INTO productos
        (nombre, precio, stock, image, description, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const productos = [
      [
        "Taladro Inalámbrico 20V",
        69990,
        25,
        "/images/taladro1.jpg",
        "Taladro potente con batería de larga duración para todo tipo de trabajos.",
        "Herramientas eléctricas",
      ],

      [
        "Martillo de Carpintero",
        12990,
        30,
        "/images/martillocarp.jpg",
        "Martillo de acero con mango ergonómico para trabajos de precisión.",
        "Herramientas manuales",
      ],

      [
        "Set de Llaves Allen",
        8990,
        20,
        "/images/allen.webp",
        "Juego completo de llaves en medidas métricas y estándar.",
        "Herramientas manuales",
      ],

      [
        "Sierra Circular 7 1/4''",
        84990,
        15,
        "/images/sierra.webp",
        "Corta madera y materiales compuestos con precisión.",
        "Herramientas eléctricas",
      ],

      [
        "Juego de Brocas para Metal",
        15990,
        35,
        "/images/brocas.jpg",
        "Brocas de alta resistencia para perforaciones en acero.",
        "Accesorios",
      ],

      [
        "Caja de Herramientas 50 piezas",
        49990,
        18,
        "/images/set.webp",
        "Incluye martillo, llaves, destornilladores y más.",
        "Herramientas manuales",
      ],

      [
        "Amoladora Angular 4 1/2''",
        42990,
        22,
        "/images/amoladora.jpg",
        "Para corte y desbaste de metal y piedra.",
        "Herramientas eléctricas",
      ],

      [
        "Cinta Métrica 5m",
        3990,
        50,
        "/images/cintametrica.jpeg",
        "Cuerpo reforzado, cinta de acero de alta resistencia.",
        "Medición",
      ],

      [
        "Nivel de Burbuja Profesional",
        8990,
        28,
        "/images/nivel.webp",
        "Para mediciones precisas en obra y carpintería.",
        "Medición",
      ],

      [
        "Cortadora de Baldosas Manual",
        64990,
        10,
        "/images/cortacera.webp",
        "Ideal para cortes limpios y precisos en cerámica.",
        "Herramientas manuales",
      ],
    ];

    for (const p of productos) {
      stmt.run(p, (err) => {
        if (err) console.error("Error insertando producto:", err);
      });
    }

    stmt.finalize((err) => {
      if (err) console.error("Error finalizando statement:", err);
      else console.log("Inserción de productos completada.");
    });
  });
}
