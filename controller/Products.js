import { Product } from '../models/productModel.js'
import { db } from "../config/database.js"
import { Sequelize } from 'sequelize';

const getActionListByChainId = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT action_id, action_name, action_url, action_type, action_weight
            FROM action_list
            WHERE chain_id = ${req.params.id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}
const getChainList = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT chain_id, chain_name
            FROM chain_list;
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getBridgeList = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT bridge_id, bridge_name, bridge_url
            FROM bridge_list;
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getScriptList = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT script_id, script_name
            FROM script_list;
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getActionById = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT action_id, action_name, action_url, action_type, action_weight
            FROM action_list
            WHERE action_id = ${req.params.id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
}
const addActionItem = async (req, res) => {
    try {
        const result = await db.query(`
            INSERT INTO action_list (action_name, action_url, action_type, chain_id, action_weight)
            VALUES ('${req.body.action_name}', '${req.body.action_url}', ${req.body.action_type}, ${req.body.chain_id}, ${req.body.action_weight});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Create success" });
    }
}
const updateActionItem = async (req, res) => {
    try {
        const result = await db.query(`
        UPDATE action_list
        SET action_name = '${req.body.action_name}', action_url = '${req.body.action_url}', action_weight = ${req.body.action_weight}
        WHERE action_id = ${req.params.id};
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Update success" });
    }
}
const deleteSelectedItem = async (req, res) => {
    try {
        const data = req.params.id.split(',')
        const ids = data.map(Number)
        console.log(ids);
        const result = await db.query(`
            DELETE FROM action_list
            WHERE action_id IN (${ids});
        `, { type: Sequelize.QueryTypes.SELECT });
        res.json(result);
    } catch (error) {
        res.json({ message: "Delete success" })
    }
}
export { addActionItem, getActionById, getBridgeList, updateActionItem, deleteSelectedItem, getActionListByChainId, getChainList, getScriptList }