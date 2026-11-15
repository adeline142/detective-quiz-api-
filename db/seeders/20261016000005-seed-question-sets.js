'use strict';

const TITLE = 'Case File 1: The Missing Manuscript';

module.exports = {
    async up(queryInterface) {
        const [rows] = await queryInterface.sequelize.query(
          "SELECT user_id FROM users ORDER BY (role = 'HOST') DESC, user_id LIMIT 1"
        );
        if (rows.length === 0) throw new Error('Seed the users first.');
        const hostId = rows[0].user_id;
        await queryInterface.sequelize.query(
          'INSERT INTO question_sets (host_id, title) SELECT :hostId, :title ' +
            'WHERE NOT EXISTS (SELECT 1 FROM question_sets WHERE host_id = :hostId AND title = :title)',
          { replacements: { hostId, title: TITLE } }
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('question_sets', null, {});
    },
};