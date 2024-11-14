import * as db from 'rethinkdb';

// Veritabanına bağlanma
export const conn = async () => {
    try {
        const connection = await db.connect({ host: 'localhost', port: 28015, db: "battleship_db" });
        console.log("Bağlandı");
        return connection; // Bağlantıyı döndür
    } catch (error) {
        console.error("Bağlantı hatası:", error);
        throw error; // Hata durumunda hatayı fırlat
    }
};
