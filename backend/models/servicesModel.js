import db from '../models/database.js'

export const saveService = async ({
  name,
  service_amount,
  salon_amount,
  barber,
  barber_amount,
  barber_assistant,
  barber_assistant_amount,
  scrubber_assistant,
  scrubber_assistant_amount,
  black_shampoo_assistant,
  black_shampoo_assistant_amount,
  black_shampoo_amount,
  super_black_assistant,
  super_black_assistant_amount,
  super_black_amount,
  black_mask_assistant,
  black_mask_assistant_amount,
  black_mask_amount
}) => {
  const query = `
    INSERT INTO services (
      name,
      service_amount,
      salon_amount,
      barber,
      barber_amount,
      barber_assistant,
      barber_assistant_amount,
      scrubber_assistant,
      scrubber_assistant_amount,
      black_shampoo_assistant,
      black_shampoo_assistant_amount,
      black_shampoo_amount,
      super_black_assistant,
      super_black_assistant_amount,
      super_black_amount,
      black_mask_assistant,
      black_mask_assistant_amount,
      black_mask_amount,
      service_timestamp
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12, $13,
      $14, $15, $16, $17, $18, NOW()
    )
  `;

  const values = [
    name,
    service_amount,
    salon_amount,
    barber,
    barber_amount,
    barber_assistant,
    barber_assistant_amount,
    scrubber_assistant,
    scrubber_assistant_amount,
    black_shampoo_assistant,
    black_shampoo_assistant_amount,
    black_shampoo_amount,
    super_black_assistant,
    super_black_assistant_amount,
    super_black_amount,
    black_mask_assistant,
    black_mask_assistant_amount,
    black_mask_amount
  ];

  await db.query(query, values);
};


export const fetchAllServices = async () => {
  const query = `SELECT 
  s.*,
  (s.service_timestamp AT TIME ZONE 'Africa/Kampala') AS "service time"
FROM services s
WHERE (s.service_timestamp AT TIME ZONE 'Africa/Kampala')::date = CURRENT_DATE;
`  
  const result = await db.query(query);
  console.log("this is what the data from the database for all services", result.rows)
  return result.rows
};