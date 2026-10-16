'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('questions', [
      {
        question_id: 1,
        prompt: 'Where was the missing wallet last seen?',
        answer: 'In the library reading room.',
        created_at: new Date('2026-01-01T00:00:00Z'),
        updated_at: new Date('2026-01-01T00:00:00Z'),
      },
      {
        question_id: 2,
        prompt: 'Who had access to the locker keys?',
        answer: 'The librarian on duty.',
        created_at: new Date('2026-01-01T00:00:00Z'),
        updated_at: new Date('2026-01-01T00:00:00Z'),
      },
      {
        question_id: 3,
        prompt: 'Which clue unlocks the final accusation?',
        answer: 'The torn map fragment.',
        created_at: new Date('2026-01-01T00:00:00Z'),
        updated_at: new Date('2026-01-01T00:00:00Z'),
      },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('questions', 'question_id'), (SELECT MAX(question_id) FROM questions))"
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('questions', null, {});
  },
};
