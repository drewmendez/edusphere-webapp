import pool from "../../config/db.config.js";

export const getClassesForTeacherRole = async (teacher_id) => {
  const [result] = await pool.query(
    `
    SELECT class_id, class_subject, class_code, banner_color, class_section
    FROM classes
    WHERE teacher_id = ?
    `,
    [teacher_id]
  );

  return result;
};

export const getClassesForStudentRole = async (student_id) => {
  const [result] = await pool.query(
    `
    SELECT c.class_id, c.class_subject, c.banner_color, c.class_section, u.firstname, u.lastname
    FROM classes c
    JOIN users u ON c.teacher_id = u.user_id
    JOIN enrollments e ON c.class_id = e.class_id
    WHERE e.student_id = ? 
    `,
    [student_id]
  );

  return result;
};

export const getClass = async (class_id) => {
  const [result] = await pool.query(
    `
    SELECT class_id, class_subject, class_section, class_code, banner_color
    FROM classes
    WHERE class_id = ?
    `,
    [class_id]
  );

  return result[0];
};

export const getPeopleInClass = async (class_id) => {
  const [result] = await pool.query(
    `
    SELECT u.firstname, u.lastname, u.user_id, u.role
    FROM users u
    JOIN classes c ON u.user_id = c.teacher_id
    WHERE c.class_id = ?
    UNION ALL
    SELECT u.firstname, u.lastname, u.user_id, u.role
    FROM users u
    JOIN enrollments e ON u.user_id = e.student_id
    WHERE e.class_id = ?
    ORDER BY lastname
    `,
    [class_id, class_id]
  );

  return result;
};

export const createClass = async (
  class_subject,
  class_code,
  banner_color,
  class_section,
  teacher_id
) => {
  await pool.query(
    `
    INSERT INTO classes (class_subject, class_code, banner_color, class_section, teacher_id)
    VALUES (?,?,?,?,?)
    `,
    [class_subject, class_code, banner_color, class_section, teacher_id]
  );
};

export const deleteClass = async (class_id) => {
  await pool.query(
    `
    DELETE FROM classes
    WHERE class_id = ?
    `,
    [class_id]
  );
};

export const updateClass = async (class_id, class_subject, class_section) => {
  await pool.query(
    `
    UPDATE classes
    SET class_subject = ?, class_section = ?
    WHERE class_id = ?
    `,
    [class_subject, class_section, class_id]
  );
};
