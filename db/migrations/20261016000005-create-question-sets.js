'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('question_sets', {
           set_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
           host_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'user_id' },
            onDelete: 'CASCADE',
           },
        title: { type: Sequelize.STRING(100), allowNull: false},
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    })
    await queryInterface.addConstraint('question_sets', {
        fields: ['host_id', 'title'],
        type: 'unique',
        name: 'uq_question_sets_host_title',
    });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('question_sets', { cascade: true });
    },
};