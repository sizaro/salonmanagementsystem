import db from './database.js';

export const saveSalonSession = async (openTime, closeTime, status) => {
  const query = `
    INSERT INTO salon_sessions (
      open_time,
      close_time,
      status
    ) VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [
    openTime,
    closeTime,       
    status      
  ];

  const { rows } = await db.query(query, values);
  return rows[0]; 
};


export const updateSalonSession = async (closeTime, status) => {
  const query = `
    UPDATE salon_sessions
    SET close_time = $1,
        status = $2,
        updated_at = NOW()
    WHERE status = 'open'
      AND close_time IS NULL
    RETURNING *
  `;

  const values = [closeTime, status,];

  const { rows } = await db.query(query, values);
  return rows[0]; 
};
